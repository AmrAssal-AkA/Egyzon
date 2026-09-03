"use client";

import useSWR from "swr";
import { fetchProducts, searchProducts } from "@/services/product";
import {
  productListResponse,
  SearchProductsParams,
  SearchProductsResponse,
} from "@/types/product.type";


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

export const useSearchProducts = (
  params: SearchProductsParams | string | null
) => {
  const query = typeof params === "string" ? params : params?.q;
  const isEnabled = Boolean(query && query.trim().length >= 1);

  const { data, error, isLoading, mutate } = useSWR<SearchProductsResponse>(
    isEnabled ? ["/api/product/search", params] : null,
    () => (params ? searchProducts(params) : Promise.resolve({ success: false, message: "", data: { products: [] } })),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 300,
    }
  );

  return {
    products: data?.data?.products ?? [],
    total: data?.data?.total ?? (data?.data?.products?.length ?? 0),
    page: data?.data?.page ?? 1,
    limit: data?.data?.limit ?? 10,
    totalPages: data?.data?.totalPages,
    isLoading,
    error,
    mutate,
  };
};