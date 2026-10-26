"use client";

import useSWR from "swr";

import { customerService } from "@/services/customer.services";
import {
  CustomerOrderHistoryResponse,
  CustomerTotalSpendResponse,
} from "@/types/customer";

export const useCustomerOrderHistory = () => {
  const { data, error, isLoading, mutate } =
    useSWR<CustomerOrderHistoryResponse>(
      "/api/customer/getCustomerOrderHistory",
      () => customerService.getCustomerOrderHistory(),
      {
        revalidateOnFocus: true,
      }
    );

  return {
    orderHistory: data?.data,
    orders: data?.data?.orders ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const useCustomerTotalSpend = () => {
  const { data, error, isLoading, mutate } =
    useSWR<CustomerTotalSpendResponse>(
      "/api/customer/totalSpend",
      () => customerService.getTotalSpend(),
      {
        revalidateOnFocus: true,
      }
    );

  return {
    totalSpend: data?.data?.totalAmountSpent ?? 0,
    isLoading,
    error,
    mutate,
  };
};

