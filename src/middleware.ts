import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Decode JWT payload (no verification — server does that)
function getPayload(token: string): Record<string, unknown> | null {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;

  // Public routes — always allow
  if (pathname === "/" || pathname === "/login") {
    // If already logged in, redirect to dashboard
    if (token) {
      const payload = getPayload(token);
      const role = (payload?.role as string)?.toLowerCase();
      const dest =
        role === "admin"
          ? "/admin/dashboard"
          : role === "teacher"
          ? "/teacher/dashboard"
          : role === "student"
          ? "/student/dashboard"
          : null;
      if (dest) return NextResponse.redirect(new URL(dest, request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = getPayload(token);
  const role = (payload?.role as string)?.toLowerCase();

  // Role-based route guard
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/teacher") && role !== "teacher") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/student") && role !== "student") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};