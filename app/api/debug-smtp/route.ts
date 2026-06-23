import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function GET() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const from = process.env.SMTP_FROM || `Re-Self <${user}>`;
  const to = process.env.BOOKING_TO_EMAIL || "info@re-self.org";

  const config = {
    SMTP_HOST: host || "(not set)",
    SMTP_PORT: port,
    SMTP_USER: user ? `${user.slice(0, 4)}...` : "(not set)",
    SMTP_PASS: pass ? "(set)" : "(not set)",
    SMTP_FROM: from,
    BOOKING_TO_EMAIL: to,
    BOOKING_BCC_EMAILS: process.env.BOOKING_BCC_EMAILS || "(not set)",
  };

  if (!host || !user || !pass) {
    return NextResponse.json({ status: "missing_config", config });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });

  try {
    await transporter.verify();
  } catch (err) {
    return NextResponse.json({
      status: "smtp_connect_failed",
      error: err instanceof Error ? err.message : String(err),
      config,
    });
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject: "Re-Self SMTP Test",
      text: "This is a test email from the Re-Self website. If you received this, SMTP is working correctly.",
    });
    return NextResponse.json({
      status: "sent",
      messageId: info.messageId,
      response: info.response,
      config,
    });
  } catch (err) {
    return NextResponse.json({
      status: "send_failed",
      error: err instanceof Error ? err.message : String(err),
      config,
    });
  }
}
