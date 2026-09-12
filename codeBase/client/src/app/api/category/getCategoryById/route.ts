import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || searchParams.get("id");

    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: "Category ID is required", data: [] },
        { status: 400 }
      );
    }

    const res = await serverClient.get(
      `/api/category/getProductsByCategory/${categoryId}`
    );
    const backendData = res.data;

    if (
      backendData &&
      typeof backendData === "object" &&
      "success" in backendData &&
      "data" in backendData
    ) {
      return NextResponse.json(backendData, { status: res.status || 200 });
    }

    const products = Array.isArray(backendData)
      ? backendData
      : backendData?.data || backendData?.products || [];

    return NextResponse.json(
      {
        success: true,
        message: "Products fetched successfully",
        data: products,
      },
      { status: 200 }
    );
  } catch (error: any) {

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message: error.response.statusText || "Failed to fetch products by category",
          data: [],
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error", data: [] },
      { status: 500 }
    );
  }
}
