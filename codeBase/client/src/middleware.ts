import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Define routes that require authentication
  const protectedPaths = ["/dashboard", "/profile", "/settings"]; 

  const isProtectedPath = protectedPaths.some((p) => 
    request.nextUrl.pathname.startsWith(p)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("token")?.value;

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    // Optional: store the path the user was trying to access
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring standard Next.js paths and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
