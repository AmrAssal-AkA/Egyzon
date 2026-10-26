import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("Access_token")?.value ||
      cookieStore.get("token")?.value ||
      cookieStore.get("jwt")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized", data: null },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword, confirmPassword} = body;

    const resolvedConfirm = confirmPassword || newPassword;

    const outgoingPayload = {
      currentPassword,
      newPassword,
      confirmPassword: confirmPassword || resolvedConfirm,
    };

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const rawCookie = req.headers.get("cookie");
    if (rawCookie) {
      headers.Cookie = rawCookie;
    } else {
      headers.Cookie = `Access_token=${token}`;
    }

    const res = await serverClient.put(
      "/api/customer/change-password",
      outgoingPayload,
      {
        headers,
        withCredentials: true,
      }
    );

    const responseData = res.data;

    return NextResponse.json(
      {
        success: responseData?.success ?? true,
        message: responseData?.message || "Password changed successfully",
        data: responseData?.data ?? null,
      },
      { status: res.status || 200 }
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message:
            error.response.data?.message ||
            error.response.statusText ||
            "Failed to change password",
          data: null,
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: (error as Error)?.message || "Internal Server Error",
        data: null,
      },
      { status: 500 }
    );
  }
}
