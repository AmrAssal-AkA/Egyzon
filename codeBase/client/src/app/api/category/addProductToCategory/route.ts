import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const { categoryId, productId } = body;

    if (!categoryId || !productId) {
      return NextResponse.json(
        { success: false, message: "categoryId and productId are required." },
        { status: 400 }
      );
    }

    const { data, status } = await serverClient.post(
      "/api/category/addProductToCategory",
      { categoryId, productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      {
        success: data?.success ?? true,
        message: data?.message || "Product added to category successfully",
        data: data?.data ?? data,
      },
      { status: status || 200 }
    );
  } catch (error: any) {
    console.error("[addProductToCategory] API route error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          success: false,
          message: error.response.data?.message || error.response.data?.error || "Failed to add product to category",
          details: error.response.data,
        },
        { status: error.response.status || 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
