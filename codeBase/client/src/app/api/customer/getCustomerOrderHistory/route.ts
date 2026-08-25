import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("token")?.value ||
      cookieStore.get("jwt")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
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

    const userId = req.headers.get("userId");
    if (userId) {
      headers.userId = userId;
    }

    const res = await serverClient.get("/api/customer/order-history", {
      headers,
    });

    const responseData = res.data;
    return NextResponse.json(
      {
        success: responseData?.success ?? true,
        message:
          responseData?.message ||
          "Customer order history retrieved successfully",
        data: responseData?.data ?? responseData,
      },
      { status: res.status || 200 }
    );
  } catch (error) {
    console.error("Get customer order history route error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message:
            error.response.statusText ||
            "Failed to fetch customer order history",
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

