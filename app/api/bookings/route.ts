import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
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

function buildPlainSummary(booking: Booking): string {
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

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildNotificationHtml(booking: Booking): string {
  const rows = [
    ["Full Name", booking.fullName],
    ["Email", booking.email],
    ["Phone", booking.phone],
    ["Organization", booking.organization || "—"],
    ["Event Type", booking.eventType || "—"],
    ["Event Date", booking.eventDate || "—"],
    ["Location", booking.eventLocation || "—"],
    ["Audience Size", booking.audienceSize || "—"],
    ["Budget Range", booking.budgetRange || "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;white-space:nowrap;vertical-align:top">${esc(label)}</td><td style="padding:10px 14px;font-size:14px;color:#1f2937;border-bottom:1px solid #f3f4f6">${esc(value)}</td></tr>`
    )
    .join("");

  const details = booking.details
    ? `<div style="margin-top:24px;padding:16px 18px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb"><p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af">Additional Details</p><p style="margin:0;font-size:14px;line-height:1.6;color:#374151">${esc(booking.details)}</p></div>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:560px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
  <div style="background:#1b5e5e;padding:28px 32px">
    <h1 style="margin:0;font-size:18px;font-weight:600;color:#ffffff;letter-spacing:-0.01em">New Booking Request</h1>
    <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.7)">from ${esc(booking.fullName)}</p>
  </div>
  <div style="padding:24px 28px">
    <table style="width:100%;border-collapse:collapse">${tableRows}</table>
    ${details}
    <div style="margin-top:28px;text-align:center">
      <a href="mailto:${esc(booking.email)}" style="display:inline-block;padding:10px 28px;background:#1b5e5e;color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;border-radius:6px">Reply to ${esc(booking.fullName)}</a>
    </div>
  </div>
  <div style="padding:16px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center">
    <p style="margin:0;font-size:11px;color:#9ca3af">This message was sent from the Re-Self website booking form.</p>
  </div>
</div>
</body></html>`;
}

function buildConfirmationHtml(booking: Booking): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:560px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
  <div style="background:#1b5e5e;padding:28px 32px;text-align:center">
    <h1 style="margin:0;font-size:20px;font-weight:600;color:#ffffff">Re-Self</h1>
  </div>
  <div style="padding:32px 28px">
    <h2 style="margin:0 0 16px;font-size:18px;font-weight:600;color:#1f2937">Thank you, ${esc(booking.fullName)}!</h2>
    <p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:#4b5563">Your booking request has been received. Sonya will review your details and follow up with next steps shortly.</p>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:#4b5563">If you have any questions in the meantime, feel free to reply to this email.</p>
    <div style="padding:16px 18px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
      <p style="margin:0;font-size:13px;color:#166534"><strong>What you submitted:</strong></p>
      <p style="margin:8px 0 0;font-size:13px;line-height:1.6;color:#166534">
        Event: ${esc(booking.eventType || "Not specified")}<br>
        Date: ${esc(booking.eventDate || "Not specified")}<br>
        Location: ${esc(booking.eventLocation || "Not specified")}
      </p>
    </div>
  </div>
  <div style="padding:16px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center">
    <p style="margin:0;font-size:11px;color:#9ca3af">Re-Self &middot; Reimagine Self Care &middot; <a href="https://re-self.org" style="color:#1b5e5e;text-decoration:none">re-self.org</a></p>
  </div>
</div>
</body></html>`;
}

async function sendEmails(booking: Booking) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("Gmail not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
    return;
  }

  const notifyTo = process.env.BOOKING_TO_EMAIL || user;
  const bcc = (process.env.BOOKING_BCC_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  await Promise.all([
    transporter.sendMail({
      from: `Re-Self <${user}>`,
      to: notifyTo,
      bcc,
      replyTo: booking.email,
      subject: `New booking request from ${booking.fullName}`,
      text: buildPlainSummary(booking),
      html: buildNotificationHtml(booking),
    }),
    transporter.sendMail({
      from: `Re-Self <${user}>`,
      to: booking.email,
      replyTo: notifyTo,
      subject: "Your Re-Self booking request was received",
      text: `Hi ${booking.fullName},\n\nThank you for contacting Re-Self. Your booking request has been received and Sonya will follow up with next steps.\n\n${buildPlainSummary(booking)}`,
      html: buildConfirmationHtml(booking),
    }),
  ]);
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

  console.log("Booking received:", JSON.stringify({ ...parsed.data, createdAt: new Date().toISOString() }));

  let emailError: string | null = null;
  try {
    await sendEmails(parsed.data);
  } catch (err) {
    emailError = err instanceof Error ? err.message : String(err);
    console.error("sendEmails failed (non-fatal):", err);
  }

  return NextResponse.json({ ok: true, emailError });
}
