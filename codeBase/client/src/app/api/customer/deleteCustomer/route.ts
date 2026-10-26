import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function DELETE(req: NextRequest) {
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
    const email = body?.email?.trim();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required to confirm account deletion",
          data: null,
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

    const res = await serverClient.delete("/api/customer/delete-customer", {
      data: { email },
      headers,
      withCredentials: true,
    });

    const responseData = res.data;

    const response = NextResponse.json(
      {
        success: responseData?.success ?? true,
        message:
          responseData?.message || "Customer account deleted successfully",
        data: responseData?.data ?? null,
      },
      { status: res.status || 200 }
    );

    response.cookies.delete("Access_token");
    response.cookies.delete("refresh_token");
    response.cookies.delete("token");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message:
            error.response.data?.message ||
            error.response.statusText ||
            "Failed to delete customer account",
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