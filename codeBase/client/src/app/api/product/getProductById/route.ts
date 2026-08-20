import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const productId = searchParams.get("productId") || searchParams.get("id");

  if (!productId) {
    return NextResponse.json(
      { success: false, message: "Product ID is required", data: null },
      { status: 400 }
    );
  }

  try {
    // Attempt 1: Fetch from primary backend route /api/product/:id
    try {
      const res = await serverClient.get(`/api/product/${productId}`);
      const backendData = res.data;

      if (backendData) {
        return NextResponse.json(
          backendData.success !== undefined
            ? backendData
            : { success: true, message: "Product fetched successfully", data: backendData },
          { status: 200 }
        );
      }
    } catch (err1: any) {
      // If direct route failed, try query route /api/product?id= or /api/product/getProductById
      if (axios.isAxiosError(err1) && err1.response?.status !== 404) {
        console.warn(`[getProductById] /api/product/${productId} returned status ${err1.response?.status}`);
      }
    }

    // Attempt 2: Fetch via /api/product/getProductById?productId=
    try {
      const res2 = await serverClient.get(`/api/product/getProductById?productId=${productId}`);
      if (res2.data) {
        return NextResponse.json(
          res2.data.success !== undefined
            ? res2.data
            : { success: true, message: "Product fetched successfully", data: res2.data },
          { status: 200 }
        );
      }
    } catch {
      // Fallback below
    }

    // Attempt 3: If numeric ID, fallback to dummyjson
    if (/^\d+$/.test(productId)) {
      try {
        const dummyRes = await fetch(`https://dummyjson.com/products/${productId}`);
        if (dummyRes.ok) {
          const dummyData = await dummyRes.json();
          return NextResponse.json(
            { success: true, message: "Product fetched successfully", data: dummyData },
            { status: 200 }
          );
        }
      } catch {
        // Fallthrough
      }
    }

    return NextResponse.json(
      { success: false, message: "Product not found", data: null },
      { status: 404 }
    );
  } catch (error: any) {
    console.error("Get product by ID route error:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Product not found", data: null },
      { status: 404 }
    );
  }
}