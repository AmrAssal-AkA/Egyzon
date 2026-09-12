import { NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("Access_token")?.value || cookieStore.get("token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value || cookieStore.get("refreshToken")?.value;

    await serverClient.post("/api/auth/logout", {}, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(refreshToken ? { Cookie: `refresh_token=${refreshToken}` } : {}),
      },
    });

    const res = NextResponse.json({ success: true, message: "Logged out successfully" });
    res.cookies.delete("Access_token");
    res.cookies.delete("refresh_token");
    res.cookies.delete("token");
    res.cookies.delete("refreshToken");
    return res;
  } catch (error) {
    // Still clear cookies on the client even if the server request fails
    const res = NextResponse.json(
      { success: true, message: "Logged out" },
      { status: 200 },
    );
    res.cookies.delete("Access_token");
    res.cookies.delete("refresh_token");
    res.cookies.delete("token");
    res.cookies.delete("refreshToken");
    return res;
  }
}
