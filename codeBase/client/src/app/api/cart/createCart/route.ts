import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    
    const cookieStore = await cookies();
    const token = cookieStore.get("Access_token")?.value || cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    try {
      await serverClient.delete("/api/cart/remove", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Ignore if cart was already empty
    }

    const { data } = await serverClient.post("/api/cart/", body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(
      { success: true, message: "Cart created successfully", data },
      { status: 201 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          success: false,
          message: error.response.data?.message || "Failed to create cart",
        },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create cart" },
      { status: 500 }
    );
  }
}
