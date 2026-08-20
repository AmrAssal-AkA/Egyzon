"use client";

import useSWR from "swr";
import { sellerService } from "@/services/sellerService";
import {
  TotalProductsResponse,
  TotalOrdersResponse,
  TotalRevenueResponse,
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


