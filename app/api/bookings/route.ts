import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
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

async function sendEmails(booking: Booking) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY not set. Skipping email delivery.");
    return;
  }

  const resend = new Resend(apiKey);
  const to = process.env.BOOKING_TO_EMAIL || "info@re-self.org";
  const bcc = (process.env.BOOKING_BCC_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const summary = buildSummary(booking);

  await Promise.all([
    resend.emails.send({
      from: "Re-Self <onboarding@resend.dev>",
      to: [to],
      bcc,
      replyTo: booking.email,
      subject: `New booking request from ${booking.fullName}`,
      text: summary,
    }),
    resend.emails.send({
      from: "Re-Self <onboarding@resend.dev>",
      to: [booking.email],
      replyTo: to,
      subject: "Your Re-Self booking request was received",
      text: `Hi ${booking.fullName},\n\nThank you for contacting Re-Self. Your booking request has been received and Sonya will follow up with next steps.\n\n${summary}`,
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
