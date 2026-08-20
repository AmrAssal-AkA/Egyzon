"use client";

import useSWR from "swr";
import { fetchCategories, fetchProductsByCategoryId } from "@/services/categoryService";
import { Category } from "@/types/category.type";
import { Product } from "@/types/product.type";

export const useCategories = (fallbackData?: Category[]) => {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(
    "categories",
    fetchCategories,
    {
      fallbackData,
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  return {
    categories: data ?? fallbackData ?? [],
    error,
    isLoading: isLoading && !data && !fallbackData,
    mutate,
  };
};

export const useCategory = useCategories;

export const useCategoryProducts = (
  categoryId: string,
  fallbackData?: Product[]
) => {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    categoryId ? ["categoryProducts", categoryId] : null,
    () => fetchProductsByCategoryId(categoryId),
    {
      fallbackData,
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  return {
    products: data ?? fallbackData ?? [],
    error,
    isLoading: isLoading && !data && !fallbackData,
    mutate,
  };
};
