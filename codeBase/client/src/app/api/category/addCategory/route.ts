import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { serverClient } from "@/lib/serverClient";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("Access_token")?.value ||
      cookieStore.get("token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in and try again." },
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

    const nameVal = incoming.get("categoryName") || incoming.get("name");
    if (nameVal && typeof nameVal === "string") {
      if (!outgoing.has("categoryName")) outgoing.append("categoryName", nameVal);
      if (!outgoing.has("name")) outgoing.append("name", nameVal);
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const backendRes = await serverClient.post("/api/category/addCategory", outgoing, {
      headers,
      withCredentials: true,
    });

    const data = backendRes.data;

    return NextResponse.json(
      data || { success: true, message: "Category created successfully" },
      { status: backendRes.status || 201 }
    );
  } catch (error: any) {
    console.error("Add category route error:", error);

    if (axios.isAxiosError(error) && error.response) {
      console.error("[addCategory] Backend error details:", error.response.status, error.response.data);
      return NextResponse.json(
        error.response.data || {
          success: false,
          message: error.response.statusText || "Failed to add category",
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
