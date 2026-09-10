import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

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
        { status: 401 },
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

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
    
    const backendRes = await fetch(`${backendUrl}/api/seller/apply`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`
      },
      body: outgoing,
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Seller apply proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
