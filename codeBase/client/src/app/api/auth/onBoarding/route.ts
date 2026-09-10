import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import axios from "axios";

export async function PATCH(req: NextRequest) {
  try {
    const payload = await req.json();

    const token = req.cookies.get("Access_token")?.value || req.cookies.get("token")?.value;
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const { data } = await serverClient.patch("/api/auth/onBoarding", payload, {
      headers,
      withCredentials: true,
    });

    return NextResponse.json({ 
      success: true, 
      message: data.message || "Onboarding successful", 
      data: data.data || data 
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { success: false, message: error.response.data?.message || "Onboarding failed" },
        { status: error.response.status }
      );
    }
    console.error("Onboarding error:", error);
    return NextResponse.json({ success: false, message: "Onboarding failed" }, { status: 500 });
  }
}


