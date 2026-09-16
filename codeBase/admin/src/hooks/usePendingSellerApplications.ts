import useSWR from "swr";

import { getPendingSellerApplications } from "../services/seller.services";
import type {
  GetPendingSellerApplicationsParams,
  PendingSellerApplicationsResult,
  Seller,
  SellersPagination,
} from "../types/seller";

const PENDING_SELLER_APPLICATIONS_SWR_KEY = "pending-seller-applications";

interface UsePendingSellerApplicationsResult {
  sellers: Seller[];
  applications: Seller[];
  pagination: SellersPagination;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<PendingSellerApplicationsResult | undefined>;
}

export function usePendingSellerApplications(
  params: GetPendingSellerApplicationsParams = {}
): UsePendingSellerApplicationsResult {
  const { page = 1, limit = 5 } = params;

  const { data, error, isLoading, mutate } = useSWR<PendingSellerApplicationsResult>(
    [PENDING_SELLER_APPLICATIONS_SWR_KEY, page, limit],
    async () => {
      const response = await getPendingSellerApplications({ page, limit });

      if (!response.success || !response.data) {
        throw new Error(response.message);
      }

      return response.data;
    }
  );

  return {
    sellers: data?.sellers ?? data?.applications ?? [],
    applications: data?.applications ?? data?.sellers ?? [],
    pagination: data?.pagination ?? { page, limit, total: 0, totalPages: 1 },
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}
