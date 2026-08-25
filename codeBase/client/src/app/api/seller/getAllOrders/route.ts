import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please sign in and try again.",
        },
        { status: 401 }
      );
    }

    try {
      const { data, status } = await serverClient.get("/api/seller/getAllOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const ordersList = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.orders)
          ? data.orders
          : Array.isArray(data?.allOrders)
            ? data.allOrders
            : Array.isArray(data)
              ? data
              : [];

      return NextResponse.json(
        {
          success: data?.success ?? true,
          message: data?.message || "All orders fetched successfully",
          data: ordersList,
        },
        { status: status || 200 }
      );
    } catch (backendError) {
      if (axios.isAxiosError(backendError) && backendError.response) {
        console.error(
          "[getAllOrders] Backend error response:",
          backendError.response.status,
          backendError.response.data
        );

        if (backendError.response.status === 404 || backendError.response.status === 500) {
          return NextResponse.json(
            {
              success: true,
              message: backendError.response.data?.message || "No orders found",
              data: [],
            },
            { status: 200 }
          );
        }

        return NextResponse.json(
          {
            success: false,
            message: backendError.response.data?.message || "Failed to fetch all orders",
            details: backendError.response.data,
            data: [],
          },
          { status: backendError.response.status }
        );
      }
      throw backendError;
    }
  } catch (error) {
    console.error("[getAllOrders] API route error:", error);
    return NextResponse.json(
      { success: true, message: "No orders found", data: [] },
      { status: 200 }
    );
  }
}