import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import axios from "axios";

export async function PATCH(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Invalid, missing, or expired token" },
        { status: 400 }
      );
    }

    const { newPassword, confirmNewPassword } = await req.json();

    const { data } = await serverClient.patch(
      "/api/auth/reset-password",
      { newPassword, confirmNewPassword },
      { params: { token } }
    );

    return NextResponse.json({
      success: true,
      message: data?.message || "Password reset successfully",
      data: data?.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          success: false,
          message: error.response.data?.message || "Password reset failed",
        },
        { status: error.response.status }
      );
    }
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: "Password reset failed" },
      { status: 500 }
    );
  }
}