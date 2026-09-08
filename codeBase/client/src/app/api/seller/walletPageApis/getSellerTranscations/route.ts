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
        { success: false, message: "Unauthorized. Please sign in and try again." },
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const rawCookie = req.headers.get("cookie");
    if (rawCookie) {
      headers.Cookie = rawCookie;
    } else {
      headers.Cookie = `token=${token}`;
    }

    const { data, status } = await serverClient.get(
      "/api/wallet/transactions",
      {
        params: {
          page: Number(page),
          limit: Number(limit),
        },
        headers,
      }
    );

    return NextResponse.json(
      {
        success: data?.success ?? true,
        message: data?.message || "Transaction history retrieved successfully",
        data: data?.data ?? data,
      },
      { status: status || 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "[getSellerTransactions] Backend error response:",
        error.response.status,
        error.response.data
      );

      return NextResponse.json(
        {
          success: false,
          message:
            error.response.data?.message || "Failed to fetch transaction history",
          details: error.response.data,
        },
        { status: error.response.status }
      );
    }

    console.error("[getSellerTransactions] API route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}