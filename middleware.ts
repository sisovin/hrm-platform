import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const panelRole: Record<string, string[]> = {
  "/admin": ["admin"],
  "/hr": ["admin", "hr"],
  "/employee": ["admin", "hr", "employee"],
};

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname;

  // Find matching panel route
  const match = Object.keys(panelRole).find((p) => path.startsWith(p));

  if (!match) {
    return NextResponse.next();
  }

  // Get the user's token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token or role not allowed, redirect to login
  if (!token || !panelRole[match].includes((token as any).role)) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/hr/:path*", "/employee/:path*"],
};
