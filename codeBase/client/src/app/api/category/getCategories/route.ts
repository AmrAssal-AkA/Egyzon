import { NextResponse } from "next/server";
import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function GET() {
  try {
    const res = await serverClient.get("/api/category/getAllCategories");
    const backendData = res.data;

    if (backendData && typeof backendData === "object" && "success" in backendData && "data" in backendData) {
      return NextResponse.json(backendData, { status: res.status || 200 });
    }

    const categories = Array.isArray(backendData)
      ? backendData
      : backendData?.data || backendData?.categories || [];

    return NextResponse.json(
      { success: true, message: "Categories fetched successfully", data: categories },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get categories route error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message: error.response.statusText || "Failed to fetch categories",
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

