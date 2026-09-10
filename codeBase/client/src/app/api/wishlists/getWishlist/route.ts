import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("Access_token")?.value || cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data } = await serverClient.get("/api/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Wishlist retrieved successfully",
        data: data?.data ?? data,
      },
      { status: 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "[getWishlist] Backend error response:",
        JSON.stringify(error.response.data, null, 2)
      );
    }
    console.error("[getWishlist] API route error:", error);
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404 || error.response.status >= 500) {
        return NextResponse.json(
          { success: true, message: "Wishlist not found", data: { items: [] } },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.response.data?.message || "Failed to get wishlist",
          details: error.response.data,
        },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to get wishlist", error: String(error) },
      { status: 500 }
    );
  }
}
