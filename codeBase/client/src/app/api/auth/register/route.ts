import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { FirstName, LastName, email, password } = await req.json();
    const { data } = await serverClient.post(
      "/api/auth/register",
      { FirstName, LastName, email, password },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    const { token, refreshToken } = data.data;
    const meRes = await serverClient.get("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const res = NextResponse.json({
      success: true,
      message: "Registration successful",
      data: meRes.data.data,
    });
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
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Registration backend error:",
        error.response.status,
        error.response.data,
      );
      return NextResponse.json(
        {
          success: false,
          message: error.response.data?.message || "Registration failed",
        },
        { status: error.response.status },
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Registration failed" },
      { status: 500 },
    );
  }
}
