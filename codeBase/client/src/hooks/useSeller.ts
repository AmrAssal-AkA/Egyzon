"use client";

import useSWR from "swr";
import { sellerService } from "@/services/sellerService";
import {
  TotalProductsResponse,
  TotalOrdersResponse,
  TotalRevenueResponse,
  TopSellingProductsResponse,
  SellerOrdersResponse,
  TotalInventoryValueResponse,
  WalletBalanceResponse,
  SalesPerformanceResponse,
  AvgOrderValueResponse,
  SalesByCategoryResponse,
} from "@/types/seller";

export const useTotalProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<TotalProductsResponse>(
    "/api/seller/getTotalProduct",
    () => sellerService.getTotalProducts(),
    {
      revalidateOnFocus: true,
    }
  );


  return {
    totalProducts: data?.data?.totalProductCounts ?? 0,
    isLoading,
    error,
    mutate,
  };
};

export const useTotalOrders = () => {
  const { data, error, isLoading, mutate } = useSWR<TotalOrdersResponse>(
    "/api/seller/getTotalOrders",
    () => sellerService.getTotalOrders(),
    {
      revalidateOnFocus: true,
    }
  );

  const count =
    typeof data?.data === "number"
      ? data.data
      : (data?.data?.totalOrders ??
         data?.data?.totalOrdersCount ??
         data?.data?.totalOrderCounts ??
         0);

  return {
    totalOrders: count,
    isLoading,
    error,
    mutate,
  };
};

export const useTotalRevenue = () => {
  const { data, error, isLoading, mutate } = useSWR<TotalRevenueResponse>(
    "/api/seller/getTotalRevenue",
    () => sellerService.getTotalRevenue(),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    totalRevenue: data?.data?.totalRevenue ?? 0,
    isLoading,
    error,
    mutate,
  };
};

export const useTopProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<TopSellingProductsResponse>(
    "/api/seller/getTopProduct",
    () => sellerService.getTopProducts(),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    topProducts: Array.isArray(data?.data) ? data.data : [],
    isLoading,
    error,
    mutate,
  };
};

export const useSellerOrders = () => {
  const { data, error, isLoading, mutate } = useSWR<SellerOrdersResponse>(
    "/api/seller/getAllOrders",
    () => sellerService.getAllOrders(),
    {
      revalidateOnFocus: true,
    }
  );
  console.log("data?.data:", data?.data);
  return {
    orders: Array.isArray(data?.data) ? data.data : [],
    isLoading,
    error,
    mutate,
  };
};

export const useTotalInventoryValue = () => {
  const { data, error, isLoading, mutate } = useSWR<TotalInventoryValueResponse>(
    "/api/seller/getTotalInventoryValue",
    () => sellerService.getTotalInventoryValue(),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    totalInventoryValue: data?.data?.totalInventoryValue ?? 0,
    isLoading,
    error,
    mutate,
  };
};

export const useWalletBalance = () => {
  const { data, error, isLoading, mutate } = useSWR<WalletBalanceResponse>(
    "/api/seller/walletPageApis/getWalletBalance",
    () => sellerService.getWalletBalance(),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    balance: data?.data?.balance ?? 0,
    isLoading,
    error,
    mutate,
  };
};

export const useSalesPerformanceIndicator = (timeframe: string = "7days") => {
  const { data, error, isLoading, mutate } = useSWR<SalesPerformanceResponse>(
    [`/api/seller/salesPerformanceIndecator`, timeframe],
    () => sellerService.getSalesPerformanceIndicator(timeframe),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    salesPerformance: data?.data,
    isLoading,
    error,
    mutate,
  };
};

export const useAverageOrderValue = () => {
  const { data, error, isLoading, mutate } = useSWR<AvgOrderValueResponse>(
    "/api/seller/AverageOrderValue",
    () => sellerService.getAverageOrderValue(),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    avgOrderValue: data?.data?.avgOrderValue ?? 0,
    changePercent: data?.data?.changePercent ?? 0,
    isLoading,
    error,
    mutate,
  };
};

export const useSalesByCategory = () => {
  const { data, error, isLoading, mutate } = useSWR<SalesByCategoryResponse>(
    "/api/seller/getSalesByCategory",
    () => sellerService.getSalesByCategory(),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    salesByCategory: data?.data ?? {},
    isLoading,
    error,
    mutate,
  };
};






