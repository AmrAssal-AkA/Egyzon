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
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in and try again." },
        { status: 401 }
      );
    }

    const { data, status } = await serverClient.delete(
      "/api/seller/remove-bank-account",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(
      {
        success: data?.success ?? true,
        message: data?.message || "Bank account removed successfully",
        data: data?.data ?? null,
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
            "Failed to remove bank account",
          error: error.response.data?.error,
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

export async function POST(req: NextRequest) {
  return DELETE(req);
}