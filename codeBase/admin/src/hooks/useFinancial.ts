import { useCallback, useState } from "react";

import useSWR from "swr";

import { useAlert } from "./useAlert";
import {
  approveWithdrawal,
  getFinancialSummary,
  getSalesOverviewLast30Days,
  getTotalSales,
  getWithdrawalCompletedCount,
  getWithdrawalRequests,
  rejectWithdrawal,
} from "../services/financial.services";
import { getPlatformConfig } from "../services/platform.services";
import type {
  FinancialSummaryMetrics,
  PaginatedWithdrawalsResponse,
  SalesOverviewLast30DaysData,
  TotalSalesData,
  WithdrawalCompletedCountData,
  WithdrawalFilters,
} from "../types/financial";
import type { IPlatformConfig } from "../types/platformConfig";

const FINANCIAL_SUMMARY_SWR_KEY = "getFinancialSummary";
const TOTAL_SALES_SWR_KEY = "getTotalSales";
const WITHDRAWAL_COMPLETED_COUNT_SWR_KEY = "getWithdrawalCompletedCount";
const SALES_OVERVIEW_SWR_KEY = "getSalesOverview";
const PLATFORM_FEE_SWR_KEY = "getPlatformConfig";
const WITHDRAWAL_REQUESTS_SWR_KEY = "getWithdrawalRequests";


export function useFinancialSummary() {
  const { data, error, isLoading, mutate } = useSWR<FinancialSummaryMetrics | null>(
    FINANCIAL_SUMMARY_SWR_KEY,
    async () => {
      const res = await getFinancialSummary();
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to fetch financial summary");
      }
      return res.data;
    },
    { revalidateOnFocus: false }
  );

  return {
    summary: data ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}

export function useTotalSales() {
  const { data, error, isLoading, mutate } = useSWR<TotalSalesData | null>(
    TOTAL_SALES_SWR_KEY,
    async () => {
      const res = await getTotalSales();
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to fetch total sales");
      }
      return res.data;
    },
    { revalidateOnFocus: false }
  );

  return {
    totalSales: data?.totalSales ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}

export function useWithdrawalCompletedCount() {
  const { data, error, isLoading, mutate } = useSWR<WithdrawalCompletedCountData | null>(
    WITHDRAWAL_COMPLETED_COUNT_SWR_KEY,
    async () => {
      const res = await getWithdrawalCompletedCount();
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to fetch completed withdrawal count");
      }
      return res.data;
    },
    { revalidateOnFocus: false }
  );

  return {
    completedCount: data?.completedCount ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}

export function useSalesOverview() {
  const { data, error, isLoading, mutate } = useSWR<SalesOverviewLast30DaysData | null>(
    SALES_OVERVIEW_SWR_KEY,
    async () => {
      const res = await getSalesOverviewLast30Days();
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to fetch sales overview");
      }
      return res.data;
    },
    { revalidateOnFocus: false }
  );

  return {
    overview: data ?? null,
    salesData: data?.series ?? [],
    totalRevenue: data?.totalRevenue ?? 0,
    totalOrders: data?.totalOrders ?? 0,
    averageOrderValue: data?.AverageOrderValue ?? 0,
    revenueChangePercent: data?.revenueChangePercent ?? 0,
    peak: data?.peak ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}

export const useSalesOverviewLast30Days = useSalesOverview;

export function usePlatformFee() {
  const { data, error, isLoading, mutate } = useSWR<IPlatformConfig | null>(
    PLATFORM_FEE_SWR_KEY,
    async () => {
      const res = await getPlatformConfig();
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to fetch platform fee configuration");
      }
      return res.data;
    },
    { revalidateOnFocus: false }
  );

  return {
    feeData: data ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}

export { getPlatformConfig as getPlatformFee } from "../services/platform.services";
export {
  approveSellerWithdrawalRequest,
  getSalesOverview,
  getSalesOverviewLast30Days,
  getTotalSales,
  getWithdrawalCompletedCount,
} from "../services/financial.services";

export function useWithdrawalRequests(filters: WithdrawalFilters = {}) {
  const { showSuccess, showError } = useAlert();
  const [actionInProgressId, setActionInProgressId] = useState<string | null>(null);

  const swrKey = [
    WITHDRAWAL_REQUESTS_SWR_KEY,
    filters.searchQuery ?? "",
    filters.status ?? "all",
    filters.paymentMethod ?? "all",
    filters.page ?? 1,
    filters.limit ?? 10,
  ];

  const { data, error, isLoading, mutate } = useSWR<PaginatedWithdrawalsResponse | null>(
    swrKey,
    async () => {
      const res = await getWithdrawalRequests(filters);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to fetch withdrawal requests");
      }
      return res.data;
    },
    { revalidateOnFocus: false }
  );

  const handleApprove = useCallback(
    async (requestId: string, sellerId?: string): Promise<boolean> => {
      try {
        setActionInProgressId(requestId);
        const targetSellerId =
          sellerId ||
          data?.requests?.find((r) => r.id === requestId)?.sellerId;
        const res = await approveWithdrawal(requestId, targetSellerId);
        if (res.success) {
          showSuccess(res.message || "Withdrawal request approved successfully.");
          await mutate();
          return true;
        } else {
          showError(res.message || "Failed to approve withdrawal request.");
          return false;
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error approving request";
        showError(msg);
        return false;
      } finally {
        setActionInProgressId(null);
      }
    },
    [data?.requests, mutate, showSuccess, showError]
  );

  const handleReject = useCallback(
    async (requestId: string, reason: string, sellerId?: string): Promise<boolean> => {
      try {
        setActionInProgressId(requestId);
        const targetSellerId =
          sellerId ||
          data?.requests?.find((r) => r.id === requestId)?.sellerId;
        const res = await rejectWithdrawal(requestId, reason, targetSellerId);
        if (res.success) {
          showSuccess(res.message || "Withdrawal request rejected.");
          await mutate();
          return true;
        } else {
          showError(res.message || "Failed to reject withdrawal request.");
          return false;
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error rejecting request";
        showError(msg);
        return false;
      } finally {
        setActionInProgressId(null);
      }
    },
    [data?.requests, mutate, showSuccess, showError]
  );

  return {
    requests: data?.requests ?? [],
    pagination: data?.pagination ?? { page: 1, limit: 6, total: 0, totalPages: 1 },
    counts: data?.counts ?? { all: 0, pending: 0, approved: 0, rejected: 0 },
    isLoading,
    error: error instanceof Error ? error.message : null,
    actionInProgressId,
    approveRequest: handleApprove,
    rejectRequest: handleReject,
    refresh: mutate,
  };
}
