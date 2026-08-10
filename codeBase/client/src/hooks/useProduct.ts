"use client";

import useSWR from "swr";
import { fetchProducts } from "@/services/product";
import { productListResponse } from "@/types/product.type";


export const useProduct = (page: number = 1, limit: number = 10) => {
    const { data, error, isLoading } = useSWR<productListResponse>(
      ["products", page, limit],
      () => fetchProducts(page, limit),
      { keepPreviousData: true }
    );

    return {
        products: data?.data.products ?? [],
        total: data?.data.total ?? 0,
        page: data?.data.page ?? page,
        limit: data?.data.limit ?? limit,
        error,
        isLoading,
    };
};


export const useAllProducts = () => {
    const { data, error, isLoading } = useSWR<productListResponse>(
      ["products", "all"],
      () => fetchProducts(1, 100),
      { keepPreviousData: true, revalidateOnFocus: false }
    );

    return {
        products: data?.data.products ?? [],
        total: data?.data.total ?? 0,
        error,
        isLoading,
    };
};