import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "axios";

import { serverClient } from "@/lib/serverClient";
import type { Notification } from "@/types/notification.types";

export async function GET(req: NextRequest) {
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

    const response = await serverClient.get("/api/notifications", {
      headers,
    });

    const rawData = response.data?.data ?? response.data;
    const notifications: Notification[] = Array.isArray(rawData)
      ? rawData.map((item: Record<string, unknown>) => ({
          id: String(item.id || item._id || ""),
          _id: item._id ? String(item._id) : undefined,
          user: item.user ? String(item.user) : undefined,
          type: (item.type as Notification["type"]) || "info",
          title: item.title
            ? String(item.title)
            : typeof item.type === "string"
            ? item.type
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())
            : "Notification",
          message: String(item.message || ""),
          data: (item.data as Record<string, unknown>) || undefined,
          isRead: Boolean(item.isRead),
          createdAt: String(item.createdAt || new Date().toISOString()),
        }))
      : [];

    return NextResponse.json(
      {
        success: response.data?.success ?? true,
        message: response.data?.message || "Notifications retrieved successfully",
        data: notifications,
      },
      { status: response.status || 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "[getNotifications] Backend error response:",
        error.response.status,
        error.response.data
      );

      if (error.response.status === 404) {
        return NextResponse.json(
          {
            success: true,
            message: "No notifications found",
            data: [],
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            error.response.data?.message || "Failed to fetch notifications",
          error: error.response.data?.error || error.response.data,
        },
        { status: error.response.status }
      );
    }

    console.error("[getNotifications] API route error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}