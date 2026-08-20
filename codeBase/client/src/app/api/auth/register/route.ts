import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient";
import axios from "axios";


export async function POST(req: NextRequest) {
    try{
        const {FirstName, LastName, email, password} = await req.json();
        console.log("Received registration data:", { FirstName, LastName, email, password });
        const {data} = await serverClient.post("/api/auth/register", { FirstName, LastName, email, password }, {withCredentials: true});
        const {token, refreshToken} = data.data;
        const meRes = await serverClient.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User data fetched successfully:", meRes.data.data);
        const res = NextResponse.json({ success: true, message: "Registration successful", data: meRes.data.data });
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 15,
        });
        res.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        return res;
    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { success: false, message: error.response.data?.message || "Registration failed" },
                { status: error.response.status }
            );
        }
        console.error("Registration error:", error);
        return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 });
    }
}