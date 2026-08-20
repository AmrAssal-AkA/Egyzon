import axios from "axios";

import { apiClient } from "@/lib/apiClient";
import { Category } from "@/types/category.type";
import { productListResponse, Product, Products } from "@/types/product.type";
import {
  fetchCategories,
  fetchProductsByCategoryId,
  getCategoryById,
  addCategory,
  addProductToCategory,
} from "./categoryService";

export {
  fetchCategories,
  fetchProductsByCategoryId,
  getCategoryById,
  addCategory,
  addProductToCategory,
};

const mapDummyJsonProduct = (product: Products): Product => ({
  _id: String(product.id),
  productName: product.title,
  productDescription: product.description,
  price: product.price,
  discount: product.discountPercentage ?? 0,
  stock: product.stock ?? 0,
  AvgRating: product.rating ?? 0,
  status: (product.stock ?? 0) > 0 ? "active" : "inactive",
  imageUrl:
    product.images && product.images.length > 0
      ? product.images
      : product.thumbnail
        ? [product.thumbnail]
        : [],
  sellerId: "",
  createdAt: new Date().toISOString(),
  category: product.category,
  brand: product.brand,
});

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

export const fetchProducts = async (page: number = 1, limit: number = 10): Promise<productListResponse> => {
  try {
    const response = await apiClient.get(`/api/product/getProducts?page=${page}&limit=${limit}`);
    const data = response.data;

    if (!data?.success || !data?.data) {
      return {
        success: false,
        message: data?.message ?? "No products found",
        data: {
          products: [],
          page,
          limit,
          total: 0,
          length: 0,
        },
      };
    }

    return data as productListResponse;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      success: false,
      message: "Failed to fetch products",
      data: {
        products: [],
        page,
        limit,
        total: 0,
        length: 0,
      },
    };
  }
};

export const fetchProductById = async (id: string | number): Promise<Product | null> => {
  if (!id) return null;

  try {
    const response = await apiClient.get(`/api/product/getProductById?productId=${id}`, {
      validateStatus: (status) => status < 500, // Do not throw on 404
    });
    const resData = response.data;

    if (!resData || resData.success === false) return null;

    const productData = resData.data !== undefined ? resData.data : resData;

    if (!productData || typeof productData !== "object") return null;

    if (productData.title && !productData.productName) {
      return mapDummyJsonProduct(productData);
    }

    return productData as Product;
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Product not found or unavailable";
    console.warn(`[fetchProductById] Notice for ID ${id}: ${errorMsg}`);
    return null;
  }
};

const CATEGORY_ALIASES: Record<string, string[]> = {};

export const fetchProductsByCategory = async ({
  category,
  currentId = 0,
}: {
  category: string;
  currentId?: number;
}) => {
  try {
    const categories = CATEGORY_ALIASES[category] ?? [category];

    const results = await Promise.all(
      categories.map(async (categorySlug: string) => {
        const response = await fetch(
          `${BACKEND_URL}/api/product/category/${categorySlug}`,
        );
        const data = await response.json();
        return (data.products as Products[]).map(mapDummyJsonProduct);
      }),
    );

    return results
      .flat()
      .filter((product: Product) => Number(product._id) !== currentId) as Product[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products by category");
  }
};

export const fetchProductByCategoryName = async (category: string) => {
  return fetchProductsByCategory({ category });
};

export const addProduct = async (formData: FormData) => {
  try {
    const response = await apiClient.post("/api/product/addProduct", formData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error("Failed to add product");
  }
};

export const deleteProduct = async (productId: string | number) => {
  try {
    const response = await apiClient.delete(`/api/product/deleteProduct?productId=${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error("Failed to delete product");
  }
};

export interface EditProductPayload {
  productId?: string | number;
  id?: string | number;
  _id?: string;
  productName?: string;
  name?: string;
  productDescription?: string;
  description?: string;
  price?: number;
  discount?: number;
  category?: string;
  stock?: number;
}

export const editProduct = async (
  productIdOrData: string | number | EditProductPayload | FormData,
  data?: EditProductPayload | FormData
) => {
  try {
    let productId: string | number | undefined;
    let payload: any;

    if (typeof productIdOrData === "string" || typeof productIdOrData === "number") {
      productId = productIdOrData;
      payload = data;
    } else if (productIdOrData instanceof FormData) {
      productId = (productIdOrData.get("productId") ||
        productIdOrData.get("id") ||
        productIdOrData.get("_id")) as string;
      payload = productIdOrData;
    } else {
      productId =
        productIdOrData.productId ||
        productIdOrData.id ||
        productIdOrData._id;
      payload = productIdOrData;
    }

    const url = productId
      ? `/api/product/editProduct?productId=${productId}`
      : `/api/product/editProduct`;

    const response = await apiClient.patch(url, payload, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing product:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error("Failed to edit product");
  }
};