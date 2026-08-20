import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Seller authentication required." },
        { status: 401 }
      );
    }

    const incoming = await req.formData();
    const outgoing = new FormData();

    for (const [key, value] of incoming.entries()) {
      if (value instanceof File) {
        outgoing.append(key, value, value.name);
      } else {
        outgoing.append(key, value);
      }
    }

    // Ensure productName & productDescription alias mappings
    if (!outgoing.has("productName") && incoming.has("name")) {
      outgoing.append("productName", incoming.get("name") as string);
    }
    if (!outgoing.has("productDescription") && incoming.has("description")) {
      outgoing.append("productDescription", incoming.get("description") as string);
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const backendRes = await serverClient.post("/api/product/addProduct", outgoing, {
      headers,
      withCredentials: true,
    });

    const data = backendRes.data;

    return NextResponse.json(
      data || { success: true, message: "Product created successfully" },
      { status: backendRes.status || 201 }
    );
  } catch (error: any) {
    console.error("Add product route error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message: error.response.statusText || "Failed to add product",
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