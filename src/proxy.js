import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("firebaseAuthToken")?.value;

  if (pathname === "/" && !authCookie) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (pathname === "/auth" && authCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth"],
};
