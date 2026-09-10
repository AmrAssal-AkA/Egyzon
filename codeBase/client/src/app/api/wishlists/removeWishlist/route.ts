import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

import { serverClient } from "@/lib/serverClient";

export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("Access_token")?.value || cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { productId } = await req.json();

    const { data } = await serverClient.delete(
      "/api/wishlist/remove",
      {
        data: { productId },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return NextResponse.json(
      { success: true, message: "Product removed from wishlist", data },
      { status: 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          success: false,
          message: error.response.data?.message || "Failed to remove wishlist",
        },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to remove wishlist" },
      { status: 500 }
    );
  }
}