import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const {email, password} = await req.json();

    const {data} = await serverClient.post("/api/auth/login", { email, password }, {withCredentials: true});
    const token = data.data?.Access_token || data.data?.token;
    const refreshToken = data.data?.refresh_token || data.data?.refreshToken;

    const meRes = await serverClient.get("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const res = NextResponse.json({ success: true, message: "Login successful", data: meRes.data.data });
    res.cookies.set("Access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 15,
    });
    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }catch(error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { success: false, message: error.response.data?.message || "Login failed" },
        { status: error.response.status }
      );
    }
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Login failed" }, { status: 500 });
  }
}