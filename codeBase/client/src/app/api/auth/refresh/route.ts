import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {serverClient} from "@/lib/serverClient";

export async function POST(){
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value || cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.json({ success: false, message: "No refresh token found" }, { status: 401 });
  }
  try {
    const response = await serverClient.post("/api/auth/refresh", {}, {
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });
    const accessToken = response.data?.data?.Access_token || response.data?.data?.accessToken || response.data?.data?.token;

    // Extract the new refresh token from Express's Set-Cookie header
    const setCookieHeader = response.headers["set-cookie"];
    let newRefreshToken: string | null = null;
    if (setCookieHeader) {
      const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
      for (const cookie of cookies) {
        const match = cookie.match(/refresh_token=([^;]+)/);
        if (match) {
          newRefreshToken = match[1];
          break;
        }
      }
    }

    const res = NextResponse.json({ success: true, message: "Token refreshed successfully" });

    res.cookies.set("Access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 15,
    });

    // Forward the new refresh token (or retain current) to the browser
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
  }catch(error) {
    console.error("Token refresh error:", error);
    return NextResponse.json({ success: false, message: "Token refresh failed" }, { status: 500 });
  }
}
