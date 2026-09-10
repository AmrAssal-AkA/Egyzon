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
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in and try again." },
        { status: 401 }
      );
    }

    const { data, status } = await serverClient.get("/api/wallet/balance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(
      {
        success: data?.success ?? true,
        message: data?.message || "Wallet balance fetched successfully",
        data: data?.data ?? data,
      },
      { status: status || 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "[getWalletBalance] Backend error response:",
        error.response.status,
        error.response.data
      );

      return NextResponse.json(
        {
          success: false,
          message: error.response.data?.message || "Failed to fetch wallet balance",
          details: error.response.data,
        },
        { status: error.response.status }
      );
    }

    console.error("[getWalletBalance] API route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}