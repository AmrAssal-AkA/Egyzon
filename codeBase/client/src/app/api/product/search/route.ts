import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get("q");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  if (!q || !q.trim()) {
    return NextResponse.json(
      {
        success: false,
        message: "Query parameter is required and must be a string",
        error: "Query parameter is required",
      },
      { status: 400 }
    );
  }

  try {
    const params: Record<string, string> = { q: q.trim() };
    if (category) params.category = category;
    if (sort) params.sort = sort;
    if (page) params.page = page;
    if (limit) params.limit = limit;

    const response = await serverClient.get("/api/product/search", { params });
    const data = response.data;

    return NextResponse.json(
      {
        success: data?.success ?? true,
        message: data?.message || "Products retrieved successfully",
        data: data?.data ?? data,
      },
      { status: response.status || 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "[Product Search] Backend error response:",
        error.response.status,
        error.response.data
      );

      return NextResponse.json(
        {
          success: false,
          message: error.response.data?.message || "Failed to search products",
          error: error.response.data?.error || error.response.data?.message,
          details: error.response.data,
        },
        { status: error.response.status }
      );
    }

    console.error("[Product Search] API route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}