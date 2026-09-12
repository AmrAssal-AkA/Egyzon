import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

export async function PATCH(req: NextRequest) {
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
    let discount: number | undefined;

    try {
      const body = await req.json();
      if (!productId) {
        productId = body.productId || body.id || body._id;
      }
      if (body.discount !== undefined) {
        discount = Number(body.discount);
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

    if (discount === undefined || isNaN(discount)) {
      return NextResponse.json(
        { success: false, message: "Discount value is required and must be a number." },
        { status: 400 }
      );
    }

    const backendRes = await serverClient.patch(
      `/api/product/seller/product/${productId}`,
      { discount: Number(discount) },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    const data = backendRes.data;

    return NextResponse.json(
      data || { success: true, message: "Product updated / discount applied successfully" },
      { status: backendRes.status || 200 }
    );
  } catch (error: unknown) {

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message: error.response.statusText || "Failed to apply discount",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}