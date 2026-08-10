import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverClient } from "@/lib/serverClient";
import axios from "axios";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ success: false, message: "Token is missing" }, { status: 400 });
        }

        const cookieStore = await cookies();
        let accessToken = cookieStore.get("token")?.value;

        if (!accessToken) {
            const refreshToken = cookieStore.get("refreshToken")?.value;
            if (refreshToken) {
                try {
                    const refreshRes = await serverClient.post("/api/auth/refresh", {}, {
                        headers: { Cookie: `refresh_token=${refreshToken}` },
                    });
                    accessToken = refreshRes.data?.data?.accessToken;
                } catch {
                    // Refresh failed — proceed without access token
                }
            }
        }

        const { data } = await serverClient.get(`/api/auth/verify-email?token=${token}`, {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        });

        return NextResponse.json({ success: true, message: data.message || "Email verified successfully" });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { success: false, message: error.response.data?.message || "Invalid or expired token" },
                { status: error.response.status }
            );
        }
        console.error("Verification error:", error);
        return NextResponse.json({ success: false, message: "Verification failed" }, { status: 500 });
    }
}
