import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isProtectedPage(pathname: string) {
  return (
    pathname.startsWith("/experience") || pathname.startsWith("/portfolio")
  );
}

function isLoginPage(pathname: string) {
  return pathname === "/login";
}

export function middleware(request: NextRequest) {
  const authencated = request.cookies.get("auth")?.value === "true";

  if (!authencated && isProtectedPage(request.nextUrl.pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "redirectUrl",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(loginUrl);
  }

  if (authencated && isLoginPage(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/experience", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/experience", "/portfolio/:path*"],
};
