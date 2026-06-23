import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL || "info@re-self.org";

  if (!apiKey) {
    return NextResponse.json({
      status: "missing_config",
      error: "RESEND_API_KEY is not set",
    });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: "Re-Self <onboarding@resend.dev>",
      to: [to],
      subject: "Re-Self Email Test",
      text: "This is a test email from the Re-Self website. If you received this, email delivery is working.",
    });

    if (error) {
      return NextResponse.json({ status: "send_failed", error });
    }

    return NextResponse.json({ status: "sent", messageId: data?.id, to });
  } catch (err) {
    return NextResponse.json({
      status: "send_failed",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
