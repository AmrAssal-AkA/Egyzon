import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "axios";

import { serverClient } from "@/lib/serverClient";
import type { WithdrawBalancePayload } from "@/types/seller";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("Access_token")?.value ||
      cookieStore.get("token")?.value ||
      cookieStore.get("jwt")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in and try again." },
        { status: 401 }
      );
    }

    const body = (await req.json()) as Partial<WithdrawBalancePayload>;
    const amount = Number(body?.amount);

    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "A valid positive withdrawal amount is required." },
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
      headers.Cookie = `token=${token}`;
    }

    const { data, status } = await serverClient.post(
      "/api/wallet/withdraw",
      { amount },
      { headers }
    );

    return NextResponse.json(
      {
        success: data?.success ?? true,
        message: data?.message || "Withdrawal request submitted successfully",
        data: data?.data ?? data,
      },
      { status: status || 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.response.data?.message ||
            error.response.data?.error ||
            "Failed to submit withdrawal request",
          error: error.response.data?.error,
          details: error.response.data,
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}