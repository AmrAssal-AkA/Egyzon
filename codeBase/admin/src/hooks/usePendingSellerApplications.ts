import useSWR from "swr";

import { getPendingSellerApplications } from "../services/seller.services";
import type { Seller } from "../types/seller";

const PENDING_SELLER_APPLICATIONS_SWR_KEY = "pending-seller-applications";

interface UsePendingSellerApplicationsResult {
  sellers: Seller[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<Seller[] | undefined>;
}

export function usePendingSellerApplications(): UsePendingSellerApplicationsResult {
  const { data, error, isLoading, mutate } = useSWR<Seller[]>(
    PENDING_SELLER_APPLICATIONS_SWR_KEY,
    async () => {
      const response = await getPendingSellerApplications();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    }
  );

  return {
    sellers: data ?? [],
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}
