import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function GET() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.BOOKING_TO_EMAIL || user;

  if (!user || !pass) {
    return NextResponse.json({
      status: "missing_config",
      error: "GMAIL_USER or GMAIL_APP_PASSWORD not set",
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  try {
    await transporter.verify();
  } catch (err) {
    return NextResponse.json({
      status: "smtp_connect_failed",
      error: err instanceof Error ? err.message : String(err),
    });
  }

  try {
    const info = await transporter.sendMail({
      from: `Re-Self <${user}>`,
      to: to!,
      subject: "Re-Self Email Test",
      text: "This is a test email from the Re-Self website. If you received this, email delivery is working.",
    });
    return NextResponse.json({ status: "sent", messageId: info.messageId, to });
  } catch (err) {
    return NextResponse.json({
      status: "send_failed",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
