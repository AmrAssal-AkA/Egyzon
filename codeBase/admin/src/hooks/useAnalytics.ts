import { useEffect } from "react";

import useSWR from "swr";

import { useSocket } from "../context/socketContext";
import {
  getAllSellerActiveCounts,
  getAllSellerPendingCounts,
  getPlatformRevenueGrowth,
  getTotalRevenueInPlatform,
} from "../services/analytics.services";
import type {
  ActiveSellersCountData,
  AnalyticalTimeframe,
  PendingSellersCountData,
  PlatformRevenueGrowthData,
  TotalRevenueData,
} from "../types/analytics";

const ACTIVE_SELLERS_COUNT_SWR_KEY = "getAllSellerActiveCounts";
const PENDING_SELLERS_COUNT_SWR_KEY = "getAllSellerPendingCounts";
const TOTAL_REVENUE_SWR_KEY = "getTotalRevenueInPlatform";
const PLATFORM_REVENUE_GROWTH_SWR_KEY = "getPlatformRevenueGrowth";

export interface UseActiveSellersCountResult {
  data: ActiveSellersCountData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<ActiveSellersCountData | null | undefined>;
}

export function useActiveSellersCount(): UseActiveSellersCountResult {
  const { data, error, isLoading, mutate } = useSWR<ActiveSellersCountData | null>(
    ACTIVE_SELLERS_COUNT_SWR_KEY,
    async () => {
      const response = await getAllSellerActiveCounts();

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch active sellers count");
      }

      return response.data;
    }
  );

  return {
    data: data ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}

export interface UsePendingSellersCountResult {
  data: PendingSellersCountData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<PendingSellersCountData | null | undefined>;
}

export function usePendingSellersCount(): UsePendingSellersCountResult {
  const { data, error, isLoading, mutate } = useSWR<PendingSellersCountData | null>(
    PENDING_SELLERS_COUNT_SWR_KEY,
    async () => {
      const response = await getAllSellerPendingCounts();

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch pending sellers count");
      }

      return response.data;
    }
  );

  return {
    data: data ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}

export interface UseTotalRevenueResult {
  data: TotalRevenueData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<TotalRevenueData | null | undefined>;
}

export function useTotalRevenue(): UseTotalRevenueResult {
  const { data, error, isLoading, mutate } = useSWR<TotalRevenueData | null>(
    TOTAL_REVENUE_SWR_KEY,
    async () => {
      const response = await getTotalRevenueInPlatform();

      if (!response.success || response.data === undefined || response.data === null) {
        throw new Error(response.message || "Failed to fetch total platform revenue");
      }

      const revenueValue =
        typeof response.data === "number"
          ? response.data
          : (response.data as { totalRevenue?: number })?.totalRevenue ?? 0;

      return revenueValue;
    }
  );

  return {
    data: data ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}

export interface UsePlatformRevenueGrowthResult {
  data: PlatformRevenueGrowthData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<PlatformRevenueGrowthData | null | undefined>;
}

export function usePlatformRevenueGrowth(
  timeframe: AnalyticalTimeframe = "7days"
): UsePlatformRevenueGrowthResult {
  const socket = useSocket();

  const { data, error, isLoading, mutate } = useSWR<PlatformRevenueGrowthData | null>(
    [PLATFORM_REVENUE_GROWTH_SWR_KEY, timeframe],
    async () => {
      const response = await getPlatformRevenueGrowth(timeframe);

      if (!response.success || !response.data) {
        throw new Error(
          response.message || "Failed to fetch platform revenue growth"
        );
      }

      return response.data;
    }
  );

  useEffect(() => {
    if (!socket) return;

    socket.emit("platform-revenue:subscribe", timeframe);

    const handleSnapshot = (snapshot: PlatformRevenueGrowthData) => {
      if (
        snapshot &&
        (!snapshot.timeframe || snapshot.timeframe === timeframe)
      ) {
        mutate(snapshot, false);
      }
    };

    socket.on("platform-revenue:snapshot", handleSnapshot);

    return () => {
      socket.off("platform-revenue:snapshot", handleSnapshot);
    };
  }, [socket, timeframe, mutate]);

  return {
    data: data ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}

export const useAnalytics = useActiveSellersCount;