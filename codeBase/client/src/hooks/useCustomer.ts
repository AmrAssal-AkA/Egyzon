"use client";

import useSWR from "swr";

import { customerService } from "@/services/customer.services";
import { CustomerOrderHistoryResponse } from "@/types/customer";

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
