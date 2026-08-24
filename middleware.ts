import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { hashPassword } from "@/lib/adminAuth";

function secret() {
  const s = process.env.ADMIN_SECRET ?? "re-self-admin-secret-change-me";
  return new TextEncoder().encode(s);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  // Public exceptions: login page and auth endpoint
  if (pathname === "/admin/login" || pathname === "/api/admin/auth") {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret());
    const currentPwHash = await hashPassword(process.env.ADMIN_PASSWORD ?? "");
    if (payload.pwHash !== currentPwHash) {
      throw new Error("Session was issued under a since-changed password");
    }
    return NextResponse.next();
  } catch {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res = NextResponse.redirect(new URL("/admin/login", request.url));
    res.cookies.delete("admin_token");
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
