import { NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("Access_token")?.value || cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value || cookieStore.get("refreshToken")?.value;

  if (!token && !refreshToken) {
    return NextResponse.json({ success: false, data: null, message: "Unauthenticated" }, { status: 200 });
  }

  if (token) {
    try {
      const { data } = await serverClient.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return NextResponse.json({ success: true, data: data.data });
    } catch (error) {
      if (!refreshToken || (axios.isAxiosError(error) && error.response?.status !== 401)) {
        return NextResponse.json({ success: false, data: null, message: "Unauthenticated" }, { status: 200 });
      }
    }
  }

  if (refreshToken) {
    try {
      const response = await serverClient.post(
        "/api/auth/refresh",
        {},
        {
          headers: { Cookie: `refresh_token=${refreshToken}` },
        }
      );
      const accessToken =
        response.data?.data?.Access_token ||
        response.data?.data?.accessToken ||
        response.data?.data?.token;

      if (!accessToken) {
        return NextResponse.json({ success: false, data: null, message: "Unauthenticated" }, { status: 200 });
      }

      const setCookieHeader = response.headers["set-cookie"];
      let newRefreshToken: string | null = null;
      if (setCookieHeader) {
        const cookieList = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
        for (const cookie of cookieList) {
          const match = cookie.match(/refresh_token=([^;]+)/);
          if (match) {
            newRefreshToken = match[1];
            break;
          }
        }
      }

      const meRes = await serverClient.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const res = NextResponse.json({ success: true, data: meRes.data.data });

      res.cookies.set("Access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 15,
      });

      const finalRefreshToken = newRefreshToken || refreshToken;
      if (finalRefreshToken) {
        res.cookies.set("refresh_token", finalRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      return res;
    } catch {
      const res = NextResponse.json({ success: false, data: null, message: "Session expired" }, { status: 200 });
      res.cookies.delete("Access_token");
      res.cookies.delete("refresh_token");
      res.cookies.delete("token");
      res.cookies.delete("refreshToken");
      return res;
    }
  }

  return NextResponse.json({ success: false, data: null, message: "Unauthenticated" }, { status: 200 });
}