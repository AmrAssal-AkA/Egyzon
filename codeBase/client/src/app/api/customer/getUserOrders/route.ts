import { NextRequest } from "next/server";
import { GET as getCustomerOrderHistoryHandler } from "../getCustomerOrderHistory/route";

export async function GET(req: NextRequest) {
  return getCustomerOrderHistoryHandler(req);
}
