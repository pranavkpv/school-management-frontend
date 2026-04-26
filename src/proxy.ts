"use server"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getPayload(token: string): Record<string, unknown> | null {
  try {
    const base64 = token
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    return JSON.parse(
      Buffer.from(base64, "base64").toString("utf8")
    );
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("access_token")?.value;

  // Public routes
  if (pathname === "/" || pathname === "/login") {
    if (token) {
      const payload = getPayload(token);

      const role = (payload?.role as string)?.toLowerCase();

      const dest =
        role === "admin"
          ? "/dashboard"
          : role === "teacher"
            ? "/teacher/dashboard"
            : role === "student"
              ? "/student/dashboard"
              : null;

      if (dest) {
        return NextResponse.redirect(
          new URL(dest, request.url)
        );
      }
    }

    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const payload = getPayload(token);

  const role =
    (payload?.role as string)?.toLowerCase();

  if (
    pathname.startsWith("/admin") &&
    role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    pathname.startsWith("/teacher") &&
    role !== "teacher"
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    pathname.startsWith("/student") &&
    role !== "student"
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};