import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("Access_token") || url.searchParams.get("token");
  const refreshToken = url.searchParams.get("refresh_token") || url.searchParams.get("refreshToken");

  if (!token) {
    // If there is no token, redirect to login page
    return NextResponse.redirect(new URL("/login?error=GoogleAuthFailed", req.url));
  }

  const res = NextResponse.redirect(new URL("/dashboard", req.url));

  // Set cookies similarly to the login route
  res.cookies.set("Access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 15, // 15 minutes
  });

  if (refreshToken) {
    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  return res;
}
