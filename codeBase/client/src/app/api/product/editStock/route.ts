import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

async function handleEditStock(req: NextRequest) {
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
    let newStock: number | undefined;

    try {
      const body = await req.json();
      if (!productId) {
        productId = body.productId || body.id || body._id;
      }
      if (body.newStock !== undefined) {
        newStock = Number(body.newStock);
      } else if (body.stock !== undefined) {
        newStock = Number(body.stock);
      }
    } catch {
      // Body was empty or not JSON
    }

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required." },
        { status: 400 }
      );
    }

    if (newStock === undefined || isNaN(newStock) || newStock < 0) {
      return NextResponse.json(
        { success: false, message: "New stock value is required and must be a non-negative number." },
        { status: 400 }
      );
    }

    const backendRes = await serverClient.patch(
      `/api/product/seller/product/${productId}/stock`,
      { newStock: Number(newStock) },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    const data = backendRes.data;

    return NextResponse.json(
      data || { success: true, message: "Product stock updated successfully" },
      { status: backendRes.status || 200 }
    );
  } catch (error: any) {
    console.error("Edit stock route error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message: error.response.statusText || "Failed to update product stock",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  return handleEditStock(req);
}

export async function PUT(req: NextRequest) {
  return handleEditStock(req);
}

export async function POST(req: NextRequest) {
  return handleEditStock(req);
}