import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import axios from "axios";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  try {
    console.log("API /api/cart/emptyCart hit.");
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("Extracted token from cookies:", token ? "Token exists" : "No token");

    if (!token) {
      console.log("Request unauthorized. Returning 401.");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("Sending request to Express backend: DELETE /api/cart/remove");
    const { data } = await serverClient.delete("/api/cart/remove", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Response from Express backend:", data);

    return NextResponse.json(
      { success: true, message: "Cart emptied successfully", data },
      { status: 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        return NextResponse.json(
          { success: true, message: "Cart is already empty" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.response.data?.message || "Failed to empty cart",
        },
        { status: error.response.status }
      );
    }
    console.error("Empty cart error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to empty cart" },
      { status: 500 }
    );
  }
}
