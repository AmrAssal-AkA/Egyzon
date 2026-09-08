import { AxiosError } from "axios";

import { serverClient } from "../lib/serverClient";
import type { ApiResponse } from "../types/auth";
import type {
  ApiOrder,
  ApiOrdersResponseData,
  Order,
  OrdersPagination,
  orderStatus,
} from "../types/order.type";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ??
      error.response?.data?.error ??
      fallback
    );
  }

  return fallback;
}

function normalizeOrderStatus(status: string): orderStatus {
  const normalized = status.toLowerCase().trim();

  if (
    normalized === "pending" ||
    normalized === "processing" ||
    normalized === "shipped" ||
    normalized === "delivered" ||
    normalized === "cancelled"
  ) {
    return normalized;
  }

  return "pending";
}

export function mapApiOrderToOrder(apiOrder: ApiOrder): Order {
  const firstItem = apiOrder.orderItems?.[0];
  const product = firstItem?.product;
  const seller = firstItem?.seller;

  const productName =
    product?.productName ??
    (apiOrder.orderItems?.length > 0 ? "Order Items" : "—");
  const rawImage = product?.imageUrl ?? product?.imageUrl ?? "";
  const imageUrl = Array.isArray(rawImage) ? rawImage[0] : String(rawImage).split(',')[0].trim();
  const category = product?.category ?? "General";

  const firstName = apiOrder.customer?.firstName ?? "";
  const lastName = apiOrder.customer?.lastName ?? "";
  const email = apiOrder.customer?.email ?? "—";

  const sellerStore = seller?.storeName ?? "—";
  const sellerEmail = seller?.email ?? seller?.storeName ?? "—";

  return {
    id: apiOrder._id,
    orderNumber: apiOrder.orderNumber,
    productName,
    FirstName: firstName,
    LastName: lastName,
    email,
    orderStatus: normalizeOrderStatus(apiOrder.orderStatus),
    totalAmount: apiOrder.totalAmount ?? 0,
    seller: sellerStore,
    storeName: sellerEmail,
    imageUrl,
    category,
    orderDate: apiOrder.orderDate,
    raw: apiOrder,
  };
}

export interface GetTotalOrdersInPlatformParams {
  page?: number;
  limit?: number;
}

export interface TotalOrdersResult {
  orders: Order[];
  pagination: OrdersPagination;
}

export async function getTotalOrdersInPlatform(
  params: GetTotalOrdersInPlatformParams = {}
): Promise<ApiResponse<TotalOrdersResult>> {
  const { page = 1, limit = 10 } = params;
  const emptyResult: TotalOrdersResult = {
    orders: [],
    pagination: { page, limit, total: 0, totalPages: 1 },
  };

  try {
    const { data } = await serverClient.get<ApiResponse<ApiOrdersResponseData>>(
      "/getTotalOrdersInPlatform",
      { params: { page, limit } }
    );

    if (data.success && data.data) {
      const orders = (data.data.orders ?? []).map(mapApiOrderToOrder);
      const total =
        data.data.pagination?.total ??
        data.data.totalOrders ??
        data.data.total ??
        orders.length;
      const totalPages = data.data.totalPages ??
        Math.max(1, Math.ceil(total / limit));

      const pagination: OrdersPagination = data.data.pagination ?? {
        page,
        limit,
        total,
        totalPages,
      };

      return {
        ...data,
        data: {
          orders,
          pagination,
        },
      };
    }

    return {
      success: data.success,
      message: data.message,
      data: emptyResult,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to fetch orders"),
      data: emptyResult,
    };
  }
}
