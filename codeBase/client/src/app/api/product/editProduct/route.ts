import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

import { serverClient } from "@/lib/serverClient";

async function handleEdit(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
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
    let payload: {
      discount: number;
      productName: string;
      productDescription: string;
      price: number;
      category: string;
      stock: number;
    } = {
      discount: 0,
      productName: "",
      productDescription: "",
      price: 0,
      category: "",
      stock: 0,
    };

    if (contentType.includes("application/json")) {
      const body = await req.json();
      if (!productId) {
        productId = body.productId || body.id || body._id;
      }
      payload = {
        discount: body.discount !== undefined ? Number(body.discount) : 0,
        productName: body.productName || body.name || "",
        productDescription: body.productDescription || body.description || "",
        price: body.price !== undefined ? Number(body.price) : 0,
        category: body.category || "",
        stock: body.stock !== undefined ? Number(body.stock) : 0,
      };
    } else if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const incoming = await req.formData();
      if (!productId) {
        productId = (incoming.get("productId") ||
          incoming.get("id") ||
          incoming.get("_id")) as string;
      }
      payload = {
        discount: incoming.has("discount") ? Number(incoming.get("discount")) : 0,
        productName: (incoming.get("productName") || incoming.get("name") || "") as string,
        productDescription: (incoming.get("productDescription") || incoming.get("description") || "") as string,
        price: incoming.has("price") ? Number(incoming.get("price")) : 0,
        category: (incoming.get("category") || "") as string,
        stock: incoming.has("stock") ? Number(incoming.get("stock")) : 0,
      };
    } else {
      try {
        const body = await req.json();
        if (!productId) {
          productId = body.productId || body.id || body._id;
        }
        payload = {
          discount: body.discount !== undefined ? Number(body.discount) : 0,
          productName: body.productName || body.name || "",
          productDescription: body.productDescription || body.description || "",
          price: body.price !== undefined ? Number(body.price) : 0,
          category: body.category || "",
          stock: body.stock !== undefined ? Number(body.stock) : 0,
        };
      } catch {
        // Empty or non-JSON body
      }
    }

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required." },
        { status: 400 }
      );
    }

    const backendRes = await serverClient.patch(
      `/api/product/seller/product/${productId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const data = backendRes.data;

    return NextResponse.json(
      data || { success: true, message: "Product updated successfully" },
      { status: backendRes.status || 200 }
    );
  } catch (error: any) {
    console.error("Edit product route error:", error);

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
      { success: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  return handleEdit(req);
}

export async function PUT(req: NextRequest) {
  return handleEdit(req);
}

export async function POST(req: NextRequest) {
  return handleEdit(req);
}