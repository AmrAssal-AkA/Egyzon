import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("Access_token")?.value ||
      cookieStore.get("token")?.value ||
      cookieStore.get("jwt")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized", data: null },
        { status: 401 }
      );
    }

    const body = await req.json();
    const finalFirstName = (body.FirstName || body.firstName || "").trim();
    const finalLastName = (body.LastName || body.lastName || "").trim();

    if (!finalFirstName || !finalLastName) {
      return NextResponse.json(
        {
          success: false,
          message: "First name and last name are required",
          data: null,
        },
        { status: 400 }
      );
    }

    const outgoingPayload = {
      FirstName: finalFirstName,
      LastName: finalLastName,
    };

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const rawCookie = req.headers.get("cookie");
    if (rawCookie) {
      headers.Cookie = rawCookie;
    } else {
      headers.Cookie = `Access_token=${token}`;
    }

    const res = await serverClient.patch(
      "/api/customer/change-customer-name",
      outgoingPayload,
      {
        headers,
        withCredentials: true,
      }
    );

    const responseData = res.data;

    return NextResponse.json(
      {
        success: responseData?.success ?? true,
        message:
          responseData?.message || "Customer name changed successfully",
        data: responseData?.data ?? null,
      },
      { status: res.status || 200 }
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message:
            error.response.data?.message ||
            error.response.statusText ||
            "Failed to change customer name",
          data: null,
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: (error as Error)?.message || "Internal Server Error",
        data: null,
      },
      { status: 500 }
    );
  }
}
