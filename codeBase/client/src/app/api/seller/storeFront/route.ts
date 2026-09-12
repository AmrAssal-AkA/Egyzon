import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sellerId =
      searchParams.get("sellerId") ||
      searchParams.get("id") ||
      searchParams.get("Id");

    if (
      !sellerId ||
      sellerId.trim() === "" ||
      sellerId === "undefined" ||
      sellerId === "null"
    ) {
      return NextResponse.json(
        { success: false, message: "Seller ID is required", data: null },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token =
      cookieStore.get("Access_token")?.value ||
      cookieStore.get("token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await serverClient.get(
      `/api/seller/getStoreDetails/${encodeURIComponent(sellerId)}`,
      { headers }
    );

    return NextResponse.json(
      {
        success: response.data?.success ?? true,
        message:
          response.data?.message || "Store details retrieved successfully",
        data: response.data?.data ?? response.data,
      },
      { status: response.status || 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        return NextResponse.json(
          { success: false, message: "Store not found", data: null },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            error.response.data?.message || "Failed to fetch store details",
          details: error.response.data,
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error", data: null },
      { status: 500 }
    );
  }
}