import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("Access_token")?.value ||
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

    let notificationId: string | null = null;

    try {
      const body = await req.json();
      notificationId = body?.id || body?._id || body?.notificationId || null;
    } catch {
      // Body might be empty or invalid JSON, will fallback to search params
    }

    if (!notificationId) {
      const searchParams = req.nextUrl.searchParams;
      notificationId =
        searchParams.get("id") ||
        searchParams.get("_id") ||
        searchParams.get("notificationId");
    }

    if (!notificationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification ID is required",
        },
        { status: 400 }
      );
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const rawCookie = req.headers.get("cookie");
    if (rawCookie) {
      headers.Cookie = rawCookie;
    } else {
      headers.Cookie = `Access_token=${token}`;
    }

    const response = await serverClient.patch(
      `/api/notifications/${notificationId}/markAsRead`,
      {},
      { headers }
    );

    return NextResponse.json(
      {
        success: response.data?.success ?? true,
        message:
          response.data?.message || "Notification marked as read successfully",
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
            "Failed to mark notification as read",
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