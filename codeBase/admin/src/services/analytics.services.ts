import { AxiosError } from "axios";

import { serverClient } from "../lib/serverClient";
import type { ApiResponse } from "../types/auth";
import type {
  ActiveSellersCountData,
  AnalyticalTimeframe,
  PendingSellersCountData,
  PlatformRevenueGrowthData,
  SellerProductsCategoryData,
  TotalRevenueData,
} from "../types/analytics";

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

export async function getAllSellerActiveCounts(): Promise<
  ApiResponse<ActiveSellersCountData>
> {
  try {
    const { data } = await serverClient.get<ApiResponse<ActiveSellersCountData>>(
      "/getAllSellerActiveCounts"
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to fetch active sellers count"),
    };
  }
}

export async function getAllSellerPendingCounts(): Promise<
  ApiResponse<PendingSellersCountData>
> {
  try {
    const { data } = await serverClient.get<ApiResponse<PendingSellersCountData>>(
      "/getAllSellerPendingCounts"
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to fetch pending sellers count"),
    };
  }
}

export async function getTotalRevenueInPlatform(): Promise<
  ApiResponse<TotalRevenueData>
> {
  try {
    const { data } = await serverClient.get<ApiResponse<TotalRevenueData>>(
      "/getTotalRevenueInPlatform"
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to fetch total platform revenue"),
    };
  }
}

export async function getPlatformRevenueGrowth(
  timeframe: AnalyticalTimeframe = "7days"
): Promise<ApiResponse<PlatformRevenueGrowthData>> {
  try {
    const { data } = await serverClient.get<
      ApiResponse<PlatformRevenueGrowthData>
    >("/getPlatformRevenueGrowth", {
      params: { timeframe },
    });

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to fetch platform revenue growth"
      ),
    };
  }
}

export async function getSellerProductsCategory(): Promise<
  ApiResponse<SellerProductsCategoryData>
> {
  try {
    const { data } = await serverClient.get<
      ApiResponse<SellerProductsCategoryData>
    >("/getSellerProductsCategory");

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to fetch seller products category distribution"
      ),
    };
  }
}
