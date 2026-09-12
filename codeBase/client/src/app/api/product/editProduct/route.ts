import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

async function handleEdit(req: NextRequest) {
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

    const contentType = req.headers.get("content-type") || "";
    const outgoing = new FormData();

    if (contentType.includes("multipart/form-data")) {
      const incoming = await req.formData();

      for (const [key, value] of incoming.entries()) {
        if (key === "productId" || key === "id" || key === "_id") {
          if (!productId && typeof value === "string") {
            productId = value;
          }
        }
        if (value instanceof File) {
          outgoing.append(key, value, value.name);
        } else {
          outgoing.append(key, value);
        }
      }

      // Aliases handling
      if (!outgoing.has("productName") && incoming.has("name")) {
        outgoing.append("productName", incoming.get("name") as string);
      }
      if (!outgoing.has("productDescription") && incoming.has("description")) {
        outgoing.append("productDescription", incoming.get("description") as string);
      }
    } else {
      // JSON payload
      try {
        const body = await req.json();
        if (!productId) {
          productId = body.productId || body.id || body._id;
        }

        const name = body.productName || body.name;
        const description = body.productDescription || body.description;

        if (name !== undefined) outgoing.append("productName", String(name));
        if (description !== undefined) outgoing.append("productDescription", String(description));
        if (body.price !== undefined) outgoing.append("price", String(body.price));
        if (body.discount !== undefined) outgoing.append("discount", String(body.discount));
        if (body.category !== undefined) outgoing.append("category", String(body.category));
        if (body.stock !== undefined) outgoing.append("stock", String(body.stock));

        if (Array.isArray(body.image)) {
          body.image.forEach((img: string) => outgoing.append("image", img));
        } else if (typeof body.image === "string") {
          outgoing.append("image", body.image);
        }
      } catch {
        // Body was empty or not JSON
      }
    }

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required for editing." },
        { status: 400 }
      );
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const backendRes = await serverClient.put(`/api/product/seller/${productId}`, outgoing, {
      headers,
      withCredentials: true,
    });

    const data = backendRes.data;

    return NextResponse.json(
      data || { success: true, message: "Product updated successfully" },
      { status: backendRes.status || 200 }
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message: error.response.statusText || "Failed to update product",
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

export async function PUT(req: NextRequest) {
  return handleEdit(req);
}

export async function PATCH(req: NextRequest) {
  return handleEdit(req);
}

export async function POST(req: NextRequest) {
  return handleEdit(req);
}