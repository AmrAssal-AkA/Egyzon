import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

import { serverClient } from "@/lib/serverClient";
import { AddSellerBankAccountPayload } from "@/types/seller";

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

    const body = (await req.json()) as Partial<AddSellerBankAccountPayload>;
    const { fullName, bankCardNumber, bankCode, issuer = "bank_card" } = body;

    // Basic UX input verification
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, message: "Account holder full name is required." },
        { status: 400 }
      );
    }

    if (!bankCardNumber || !bankCardNumber.trim()) {
      return NextResponse.json(
        { success: false, message: "Bank card or account number is required." },
        { status: 400 }
      );
    }

    if (!bankCode || !bankCode.trim()) {
      return NextResponse.json(
        { success: false, message: "Bank code is required." },
        { status: 400 }
      );
    }

    // Call backend endpoint: POST /api/seller/add-bank-account
    // Note: NEVER log bankCardNumber to logs or console
    const { data, status } = await serverClient.post(
      "/api/seller/add-bank-account",
      {
        issuer,
        fullName: fullName.trim(),
        bankCardNumber: bankCardNumber.replace(/\s+/g, ""),
        bankCode: bankCode.trim().toUpperCase(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(
      {
        success: data?.success ?? true,
        message: data?.message || "Bank account added successfully",
        data: data?.data ?? null,
      },
      { status: status || 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "[addSellerBankAccount] Backend error status:",
        error.response.status
      );

      return NextResponse.json(
        {
          success: false,
          message:
            error.response.data?.message ||
            error.response.data?.error ||
            "Failed to add bank account",
          error: error.response.data?.error,
        },
        { status: error.response.status }
      );
    }

    console.error("[addSellerBankAccount] Server error occurred");
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
