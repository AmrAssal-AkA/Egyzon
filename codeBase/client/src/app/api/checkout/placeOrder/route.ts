import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const response = await serverClient.post("/api/order/placeOrder", body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const responseData = response.data;

    return NextResponse.json(
      {
        success: true,
        message: responseData?.message || "Order placed successfully",
        data: responseData?.data ?? responseData,
      },
      { status: 201 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.response.data?.message ||
            error.response.data?.error ||
            "Failed to place order",
        },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to place order" },
      { status: 500 }
    );
  }
}