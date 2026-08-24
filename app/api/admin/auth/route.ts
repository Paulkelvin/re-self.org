import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { hashPassword } from "@/lib/adminAuth";

const SESSION_SECONDS = 60 * 60 * 24; // 24h

function secret() {
  const s = process.env.ADMIN_SECRET ?? "re-self-admin-secret-change-me";
  return new TextEncoder().encode(s);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Binding the session to a hash of the current password means changing
  // ADMIN_PASSWORD immediately invalidates every session signed under the
  // old one, instead of leaving already-logged-in sessions valid for the
  // rest of their (previously 7-day) lifetime.
  const pwHash = await hashPassword(process.env.ADMIN_PASSWORD);

  const token = await new SignJWT({ role: "admin", pwHash })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(secret());

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_SECONDS,
    path: "/",
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_token");
  return res;
}
