import useSWR from "swr";

import { getAllSellers } from "../services/seller.services";
import type { Seller, SellersPagination } from "../types/seller";

interface UseAllSellersParams {
  page?: number;
  limit?: number;
}

interface UseAllSellersResult {
  sellers: Seller[];
  pagination: SellersPagination;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<unknown>;
}

export function useAllSellers({
  page = 1,
  limit = 10,
}: UseAllSellersParams = {}): UseAllSellersResult {
  const { data, error, isLoading, mutate } = useSWR(
    ["all-sellers", page, limit],
    async () => {
      const response = await getAllSellers({ page, limit });

      if (!response.success || !response.data) {
        throw new Error(response.message);
      }

      return response.data;
    }
  );

  return {
    sellers: data?.sellers ?? [],
    pagination: data?.pagination ?? { page, limit, total: 0, totalPages: 1 },
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}
