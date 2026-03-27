import { NextResponse } from "next/server";

const MAX_AGE_HOUR = 1;

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.AUTH_PASSWORD) {
    const res = NextResponse.json({ ok: true });

    res.cookies.set("auth", "true", {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * MAX_AGE_HOUR,
    });

    return res;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
