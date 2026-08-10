import {NextResponse} from "next/server";
import {serverClient} from "@/lib/serverClient";
import {cookies} from "next/headers";


export async function GET() {
   const cookieStore = await cookies();
   const token = cookieStore.get("token")?.value;

   if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
   }
   try {
      const { data } = await serverClient.get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } });
      return NextResponse.json({ success: true, data: data.data });
   } catch (error) {
    console.error("Fetch user data error:", error);
      return NextResponse.json({ success: false, message: "Failed to fetch user data" }, { status: 500 });
   }
}