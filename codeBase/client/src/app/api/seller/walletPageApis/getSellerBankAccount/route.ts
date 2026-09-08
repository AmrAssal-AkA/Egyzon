import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function GET(request: Request | NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("token")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in and try again." },
        { status: 401 }
      );
    }

    // Call backend endpoint: GET /api/seller/get-bank-account
    const { data, status } = await serverClient.get("/api/seller/get-bank-account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(
      {
        success: data?.success ?? true,
        message: data?.message || "Bank account fetched successfully",
        data: data?.data ?? null,
      },
      { status: status || 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "[getSellerBankAccount] Backend error response:",
        error.response.status,
        error.response.data
      );

      return NextResponse.json(
        {
          success: false,
          message:
            error.response.data?.message || "Failed to fetch seller bank account",
          details: error.response.data,
        },
        { status: error.response.status }
      );
    }

    console.error("[getSellerBankAccount] API route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}