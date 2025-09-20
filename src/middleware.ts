// https://github.com/vercel/examples/blob/main/edge-middleware/basic-auth-password/middleware.ts

import { type NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (
      user === process.env.BASIC_AUTH_USER &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }
  }
  url.pathname = "/api/auth";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/portfolio/:path*"],
};
