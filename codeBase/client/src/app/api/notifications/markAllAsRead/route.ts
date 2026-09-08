import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("token")?.value ||
      cookieStore.get("jwt")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const rawCookie = req.headers.get("cookie");
    if (rawCookie) {
      headers.Cookie = rawCookie;
    } else {
      headers.Cookie = `token=${token}`;
    }

    const response = await serverClient.patch(
      "/api/notifications/markAllAsRead",
      {},
      { headers }
    );

    return NextResponse.json(
      {
        success: response.data?.success ?? true,
        message:
          response.data?.message || "All notifications marked as read successfully",
        data: response.data?.data ?? response.data,
      },
      { status: response.status || 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.response.data?.message ||
            "Failed to mark all notifications as read",
          error: error.response.data?.error || error.response.data,
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}