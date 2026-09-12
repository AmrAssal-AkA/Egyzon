import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

async function handleDelete(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("Access_token")?.value ||
      cookieStore.get("token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Seller authentication required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    let productId = searchParams.get("productId") || searchParams.get("id");

    if (!productId) {
      try {
        const body = await req.json();
        productId = body.productId || body.id;
      } catch {
        // Body was empty or not JSON, productId remains null
      }
    }

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required." },
        { status: 400 }
      );
    }

    const backendRes = await serverClient.delete(`/api/product/seller/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    const data = backendRes.data;

    return NextResponse.json(
      data || { success: true, message: "Product deleted successfully" },
      { status: backendRes.status || 200 }
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message: error.response.statusText || "Failed to delete product",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  return handleDelete(req);
}

export async function POST(req: NextRequest) {
  return handleDelete(req);
}
