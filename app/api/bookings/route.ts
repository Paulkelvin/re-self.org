import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Pool } from "pg";
import { z } from "zod";

export const runtime = "nodejs";

const bookingSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().min(1).max(60),
  organization: z.string().max(160).optional().default(""),
  eventType: z.string().max(80).optional().default(""),
  eventDate: z.string().max(40).optional().default(""),
  eventLocation: z.string().max(180).optional().default(""),
  audienceSize: z.string().max(80).optional().default(""),
  budgetRange: z.string().max(80).optional().default(""),
  details: z.string().max(3000).optional().default(""),
  website: z.string().max(0).optional().or(z.literal(""))
});

type Booking = z.infer<typeof bookingSchema>;

const requests = new Map<string, { count: number; resetAt: number }>();
let pool: Pool | undefined;

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = requests.get(ip);

  if (!existing || existing.resetAt < now) {
    requests.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  existing.count += 1;
  return existing.count > 5;
}

async function storeBooking(booking: Booking) {
  if (process.env.DATABASE_URL) {
    pool ??= new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false } });
    await pool.query(`
      create table if not exists booking_requests (
        id bigserial primary key,
        full_name text not null,
        email text not null,
        phone text not null,
        organization text not null,
        event_type text not null,
        event_date text not null,
        event_location text not null,
        audience_size text not null,
        budget_range text not null,
        details text not null,
        created_at timestamptz not null default now()
      )
    `);
    await pool.query(
      `insert into booking_requests
        (full_name, email, phone, organization, event_type, event_date, event_location, audience_size, budget_range, details)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        booking.fullName,
        booking.email,
        booking.phone,
        booking.organization,
        booking.eventType,
        booking.eventDate,
        booking.eventLocation,
        booking.audienceSize,
        booking.budgetRange,
        booking.details
      ]
    );
    return;
  }

  const backupPath = path.join(process.cwd(), "bookings.jsonl");
  await fs.appendFile(backupPath, `${JSON.stringify({ ...booking, createdAt: new Date().toISOString() })}\n`);
}

function buildSummary(booking: Booking): string {
  return [
    `Full Name: ${booking.fullName}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Organization: ${booking.organization || "—"}`,
    `Event Type: ${booking.eventType || "—"}`,
    `Event Date: ${booking.eventDate || "—"}`,
    `Event Location: ${booking.eventLocation || "—"}`,
    `Estimated Audience Size: ${booking.audienceSize || "—"}`,
    `Budget Range: ${booking.budgetRange || "—"}`,
    "",
    booking.details || "(no additional details)",
  ].join("\n");
}

async function sendViaBrevo(booking: Booking) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return false;

  const to = process.env.BOOKING_TO_EMAIL || "sharris@re-self.org";
  const bcc = (process.env.BOOKING_BCC_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean)
    .map((email) => ({ email }));

  const senderName = process.env.BREVO_SENDER_NAME || "Re-Self";
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@re-self.org";
  const summary = buildSummary(booking);

  const notificationPayload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: to }],
    ...(bcc.length > 0 ? { bcc } : {}),
    replyTo: { email: booking.email, name: booking.fullName },
    subject: `New booking request from ${booking.fullName}`,
    textContent: summary,
    htmlContent: `<pre style="font-family:sans-serif;font-size:14px;line-height:1.6">${summary.replace(/</g, "&lt;")}</pre>`,
  };

  const confirmationPayload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: booking.email, name: booking.fullName }],
    subject: "Your Re-Self booking request was received",
    textContent: `Hi ${booking.fullName},\n\nThank you for contacting Re-Self. Your booking request has been received and Sonya will follow up with next steps.\n\n${summary}`,
    htmlContent: `<div style="font-family:sans-serif;font-size:14px;line-height:1.6"><p>Hi ${booking.fullName},</p><p>Thank you for contacting Re-Self. Your booking request has been received and Sonya will follow up with next steps.</p><hr style="border:none;border-top:1px solid #ddd;margin:16px 0"><pre style="font-family:sans-serif;font-size:13px;color:#555">${summary.replace(/</g, "&lt;")}</pre></div>`,
  };

  const headers = {
    "api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const [notifRes, confirmRes] = await Promise.all([
    fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers,
      body: JSON.stringify(notificationPayload),
    }),
    fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers,
      body: JSON.stringify(confirmationPayload),
    }),
  ]);

  if (!notifRes.ok) {
    const err = await notifRes.text();
    console.error("Brevo notification email failed:", notifRes.status, err);
    throw new Error(`Brevo notification email failed: ${notifRes.status}`);
  }
  if (!confirmRes.ok) {
    const err = await confirmRes.text();
    console.error("Brevo confirmation email failed:", confirmRes.status, err);
  }

  return true;
}

async function sendViaSmtp(booking: Booking) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("No email provider configured. Set BREVO_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS.");
    return;
  }

  const to = process.env.BOOKING_TO_EMAIL || "sharris@re-self.org";
  const bcc = (process.env.BOOKING_BCC_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const from = process.env.SMTP_FROM || `Re-Self Bookings <${user}>`;
  const summary = buildSummary(booking);

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass }
  });

  await Promise.all([
    transporter.sendMail({
      from,
      to,
      bcc,
      replyTo: booking.email,
      subject: `New booking request from ${booking.fullName}`,
      text: summary
    }),
    transporter.sendMail({
      from,
      to: booking.email,
      subject: "Your Re-Self booking request was received",
      text: `Hi ${booking.fullName},\n\nThank you for contacting Re-Self. Your booking request has been received and Sonya will follow up with next steps.\n\n${summary}`
    })
  ]);
}

async function sendEmails(booking: Booking) {
  const sentViaBrevo = await sendViaBrevo(booking);
  if (!sentViaBrevo) {
    await sendViaSmtp(booking);
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const parsed = bookingSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ error: "Please review the form and try again." }, { status: 400 });
  }

  try {
    await storeBooking(parsed.data);
    await sendEmails(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking submission failed", error);
    return NextResponse.json({ error: "We could not submit the request. Please email sharris@re-self.org." }, { status: 500 });
  }
}
