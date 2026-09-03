import useSWR from "swr";

import { getTotalOrdersInPlatform } from "../services/order.services";
import type { Order, OrdersPagination } from "../types/order.type";

interface UseOrdersParams {
  page?: number;
  limit?: number;
}

interface UseOrdersResult {
  orders: Order[];
  pagination: OrdersPagination;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<unknown>;
}

export function useOrders({
  page = 1,
  limit = 10,
}: UseOrdersParams = {}): UseOrdersResult {
  const { data, error, isLoading, mutate } = useSWR(
    ["total-orders", page, limit],
    async () => {
      const response = await getTotalOrdersInPlatform({ page, limit });

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load orders");
      }

      return response.data;
    }
  );

  return {
    orders: data?.orders ?? [],
    pagination: data?.pagination ?? { page, limit, total: 0, totalPages: 1 },
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}
