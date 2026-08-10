import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  return NextResponse.redirect(`${backendUrl}/api/auth/continue-with-google`);
}
