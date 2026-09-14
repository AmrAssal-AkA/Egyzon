import { NextRequest, NextResponse } from "next/server";

import { productListResponse } from "@/types/product.type";
import { serverClient } from "@/lib/serverClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    try {
        const res = await serverClient.get(`/api/product?page=${page}&limit=${limit}`);
        const data: productListResponse = res.data;
        return NextResponse.json(data);
    } catch(error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}