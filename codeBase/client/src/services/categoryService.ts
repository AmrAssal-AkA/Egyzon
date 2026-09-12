import axios from "axios";
import { apiClient } from "@/lib/apiClient";
import { Category, CategoryListResponse } from "@/types/category.type";
import { Product } from "@/types/product.type";

const normalizeCategory = (cat: Category): Category => {
  if (!cat || typeof cat !== "object") return cat;
  const name = cat.categoryName || cat.categroyName || cat.name || "";
  return {
    ...cat,
    categoryName: name,
    categroyName: name,
  };
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get<CategoryListResponse | Category[]>("/api/category/getCategories");
    const resData = response.data;

    let list: Category[] = [];
    if (Array.isArray(resData)) {
      list = resData;
    } else if (resData && typeof resData === "object" && "data" in resData && Array.isArray(resData.data)) {
      list = resData.data;
    } else if (Array.isArray(resData?.categories)) {
      list = resData.categories;
    }

    return list.map(normalizeCategory);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export const fetchProductsByCategoryId = async (
  categoryId: string
): Promise<Product[]> => {
  if (!categoryId) return [];

  try {
    const response = await apiClient.get(`/api/category/getCategoryById?categoryId=${encodeURIComponent(categoryId)}`);
    const resData = response.data;

    if (Array.isArray(resData)) {
      return resData as Product[];
    }
    if (resData && typeof resData === "object" && "data" in resData && Array.isArray(resData.data)) {
      return resData.data as Product[];
    }
    if (Array.isArray((resData as any)?.products)) {
      return (resData as any).products as Product[];
    }

    return [];
  } catch (error) {
    console.error(`Failed to fetch products for category ${categoryId}:`, error);
    return [];
  }
};

export const getCategoryById = fetchProductsByCategoryId;

export const addCategory = async (formData: FormData) => {
  try {
    const response = await apiClient.post("/api/category/addCategory", formData);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error("Failed to add category");
  }
};

export const addProductToCategory = async ({
  categoryId,
  productId,
}: {
  categoryId: string;
  productId: string;
}) => {
  try {
    const response = await apiClient.post("/api/category/addProductToCategory", {
      categoryId,
      productId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product to category:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error("Failed to add product to category");
  }
};
