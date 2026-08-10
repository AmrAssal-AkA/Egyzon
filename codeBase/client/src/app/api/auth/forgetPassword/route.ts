import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { emailAddress } = await req.json();

    const { data } = await serverClient.post(
      "/api/auth/forget-password",
      { emailAddress },
      { withCredentials: true }
    );

    return NextResponse.json({
      success: true,
      message: data?.message || "Reset password email sent successfully",
      data: data?.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          success: false,
          message: error.response.data?.message || "Email address or user not found",
        },
        { status: error.response.status }
      );
    }
    console.error("Forget password error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send reset email" },
      { status: 500 }
    );
  }
}