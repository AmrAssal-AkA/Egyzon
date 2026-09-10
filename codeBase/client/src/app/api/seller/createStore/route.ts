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
        {
          success: false,
          message: "Unauthorized. Please sign in and try again.",
        },
        { status: 401 },
      );
    }

    const incoming = await req.formData();
    const outgoing = new FormData();

    for (const [key, value] of incoming.entries()) {
      if (key === "storeName") continue;
      if (value instanceof File) {
        outgoing.append(key, value, value.name);
      } else {
        outgoing.append(key, value);
      }
    }

    // Ensure backend field names matching Swagger /api/seller/setup
    if (!outgoing.has("storeDescription") && incoming.has("description")) {
      outgoing.append(
        "storeDescription",
        incoming.get("description") as string,
      );
    }
    if (!outgoing.has("storeLogo") && incoming.has("logo")) {
      const logo = incoming.get("logo");
      if (logo instanceof File) {
        outgoing.append("storeLogo", logo, logo.name);
      }
    }
    if (!outgoing.has("storeBanner") && incoming.has("banner")) {
      const banner = incoming.get("banner");
      if (banner instanceof File) {
        outgoing.append("storeBanner", banner, banner.name);
      }
    }
    if (!outgoing.has("storephysicalAddress")) {
      if (incoming.has("storePhysicalAddress")) {
        outgoing.append(
          "storephysicalAddress",
          incoming.get("storePhysicalAddress") as string,
        );
      } else if (
        incoming.has("address") &&
        incoming.get("storeType") !== "online"
      ) {
        outgoing.append(
          "storephysicalAddress",
          incoming.get("address") as string,
        );
      }
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const backendRes = await serverClient.post("/api/seller/setup", outgoing, {
      headers,
      withCredentials: true,
    });

    const data = backendRes.data;

    return NextResponse.json(
      data || { success: true, message: "Store setup successful" },
      { status: backendRes.status || 200 },
    );
  } catch (error: unknown) {
    console.error("Create store proxy error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || {
          success: false,
          message: error.response.statusText || "Failed to setup store",
        },
        { status: error.response.status },
      );
    }

    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
