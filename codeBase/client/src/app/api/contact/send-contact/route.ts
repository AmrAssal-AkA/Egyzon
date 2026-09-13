import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { serverClient } from "@/lib/serverClient";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { fullName, email, topic, message } = await req.json();

    if (!fullName || !email || !topic || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    const reponse = await serverClient.post("/api/contact/send", {
      fullName,
      email,
      topic,
      message,
    }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

    return NextResponse.json(reponse.data, {
      status: reponse.status || 201,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data.message || "Internal Server Error" },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
