import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function GET(req: NextRequest) {
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

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const rawCookie = req.headers.get("cookie");
    if (rawCookie) {
      headers.Cookie = rawCookie;
    } else {
      headers.Cookie = `Access_token=${token}`;
    }

    const res = await serverClient.get("/api/customer/total-spend", {
      headers,
      withCredentials: true,
    });

    const responseData = res.data;
    return NextResponse.json(
      {
        success: responseData?.success ?? true,
        message:
          responseData?.message ||
          "Total amount spent retrieved successfully",
        data: responseData?.data ?? { totalAmountSpent: 0 },
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
            "Failed to fetch total amount spent",
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

