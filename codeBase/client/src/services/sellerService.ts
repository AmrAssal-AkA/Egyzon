import { apiClient } from "@/lib/apiClient";
import {
  SellerFormData,
  SellerProductsResponse,
  TotalProductsResponse,
  TotalOrdersResponse,
  TotalRevenueResponse,
  TopSellingProductsResponse,
  SellerOrdersResponse,
  TotalInventoryValueResponse,
  WalletBalanceResponse,
  SalesPerformanceResponse,
  AvgOrderValueResponse,
  AvgOrderValueData,
  SalesByCategoryResponse,
  StoreDetailsResponse,
} from "@/types/seller";
import { CreateStoreResponse, StorefrontFormData } from "@/types/store";
import { ApiResponse } from "@/types/auth";

export const sellerService = {
  getSellerProducts: async (): Promise<SellerProductsResponse> => {
    try {
      const response = await apiClient.get<SellerProductsResponse>(
        "/api/seller/getSellerProduct",
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch seller products",
          data: [],
        };
      }

      return {
        success: true,
        message: data.message || "Seller products retrieved successfully",
        data: Array.isArray(data.data) ? data.data : [],
      };
    } catch (error: unknown) {
      console.error("Fetch seller products error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to fetch seller products";
      return { success: false, message, data: [] };
    }
  },

  applyAsSeller: async (
    data: SellerFormData,
    onProgress?: (percent: number) => void,
  ): Promise<ApiResponse<unknown>> => {
    try {
      const formData = new FormData();
      formData.append("storeName", data.shopName || data.storeName || "");
      formData.append(
        "commercialRegisterNumber",
        data.commercialRegisterNumber,
      );
      formData.append("taxCardNumber", data.taxCardNumber);

      if (data.commercialRegisterImage) {
        formData.append(
          "commercialRegisterImage",
          data.commercialRegisterImage,
          data.commercialRegisterImage.name,
        );
      }
      if (data.taxCardImage) {
        formData.append(
          "taxCardImage",
          data.taxCardImage,
          data.taxCardImage.name,
        );
      }

      const response = await apiClient.post("/api/seller/apply", formData, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percent);
          }
        },
      });

      return {
        success: true,
        data: response.data,
        message: response.data?.message || "Successfully applied as seller",
      };
    } catch (error: unknown) {
      console.error("Seller application error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to apply as seller";
      return { success: false, message };
    }
  }, 

  deleteProduct: async (
    productId: string | number,
  ): Promise<ApiResponse<unknown>> => {
    try {
      const response = await apiClient.delete(
        `/api/product/deleteProduct?productId=${productId}`,
        {
          withCredentials: true,
        },
      );

      return {
        success: response.data?.success ?? true,
        message: response.data?.message || "Product deleted successfully",
        data: response.data?.data,
      };
    } catch (error: unknown) {
      console.error("Seller delete product error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to delete product";
      return { success: false, message };
    }
  },
  editProduct: async (
    productId: string | number,
    data:
      | {
          productName?: string;
          productDescription?: string;
          price?: number;
          discount?: number;
          category?: string;
          stock?: number;
        }
      | FormData,
  ): Promise<ApiResponse<unknown>> => {
    try {
      const response = await apiClient.put(
        `/api/product/editProduct?productId=${productId}`,
        data,
        {
          withCredentials: true,
        },
      );

      return {
        success: response.data?.success ?? true,
        message: response.data?.message || "Product updated successfully",
        data: response.data?.data,
      };
    } catch (error: unknown) {
      console.error("Seller edit product error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to edit product";
      return { success: false, message };
    }
  },
  applyDiscount: async (
    productId: string | number,
    discount: number,
  ): Promise<ApiResponse<unknown>> => {
    try {
      const response = await apiClient.patch(
        `/api/product/ApplyDiscount?productId=${productId}`,
        { discount: Number(discount) },
        {
          withCredentials: true,
        },
      );

      return {
        success: response.data?.success ?? true,
        message: response.data?.message || "Discount applied successfully",
        data: response.data?.data,
      };
    } catch (error: unknown) {
      console.error("Seller apply discount error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to apply discount";
      return { success: false, message };
    }
  },
  editStock: async (
    productId: string | number,
    newStock: number,
  ): Promise<ApiResponse<unknown>> => {
    try {
      const response = await apiClient.patch(
        `/api/product/editStock?productId=${productId}`,
        { newStock: Number(newStock) },
        {
          withCredentials: true,
        },
      );

      return {
        success: response.data?.success ?? true,
        message: response.data?.message || "Stock updated successfully",
        data: response.data?.data,
      };
    } catch (error: unknown) {
      console.error("Seller edit stock error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to update stock";
      return { success: false, message };
    }
  },
  getTotalProducts: async (): Promise<TotalProductsResponse> => {
    try {
      const response = await apiClient.get<TotalProductsResponse>(
        "/api/seller/getTotalProduct",
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch total products",
          data: { totalProductCounts: 0 },
        };
      }

      return {
        success: true,
        message: data.message || "Total products retrieved successfully",
        data: data.data || { totalProductCounts: 0 },
      };
    } catch (error: unknown) {
      console.error("Get total products error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to get total products";
      return { success: false, message, data: { totalProductCounts: 0 } };
    }
  },
  getTotalOrders: async (): Promise<TotalOrdersResponse> => {
    try {
      const response = await apiClient.get<TotalOrdersResponse>(
        "/api/seller/getTotalOrders",
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch total orders",
          data: { totalOrders: 0 },
        };
      }

      return {
        success: true,
        message: data.message || "Total orders retrieved successfully",
        data: data.data || { totalOrders: 0 },
      };
    } catch (error: unknown) {
      console.error("Get total orders error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to get total orders";
      return { success: false, message, data: { totalOrders: 0 } };
    }
  },
  getTotalRevenue: async (): Promise<TotalRevenueResponse> => {
    try {
      const response = await apiClient.get<TotalRevenueResponse>(
        "/api/seller/getTotalRevenue",
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch total revenue",
          data: { totalRevenue: 0 },
        };
      }

      return {
        success: true,
        message: data.message || "Total revenue retrieved successfully",
        data: data.data || { totalRevenue: 0 },
      };
    } catch (error: unknown) {
      console.error("Get total revenue error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to get total revenue";
      return { success: false, message, data: { totalRevenue: 0 } };
    }
  },
  getTopProducts: async (): Promise<TopSellingProductsResponse> => {
    try {
      const response = await apiClient.get<TopSellingProductsResponse>(
        "/api/seller/getTopProduct",
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch top products",
          data: [],
        };
      }

      return {
        success: true,
        message: data.message || "Top products retrieved successfully",
        data: Array.isArray(data.data) ? data.data : [],
      };
    } catch (error: unknown) {
      console.error("Get top products error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to get top products";
      return { success: false, message, data: [] };
    }
  },
  getAllOrders: async (): Promise<SellerOrdersResponse> => {
    try {
      const response = await apiClient.get<SellerOrdersResponse>(
        "/api/seller/getAllOrders",
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch seller orders",
          data: [],
        };
      }

      const list = Array.isArray(data.data)
        ? data.data
        : Array.isArray((data as any).orders)
          ? (data as any).orders
          : Array.isArray((data as any).allOrders)
            ? (data as any).allOrders
            : [];

      return {
        success: true,
        message: data.message || "Seller orders retrieved successfully",
        data: list,
      };
    } catch (error: unknown) {
      console.error("Get all seller orders error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to fetch seller orders";
      return { success: false, message, data: [] };
    }
  },
  getTotalInventoryValue: async (): Promise<TotalInventoryValueResponse> => {
    try {
      const response = await apiClient.get<TotalInventoryValueResponse>(
        "/api/seller/getTotalInventoryValue",
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch total inventory value",
          data: { totalInventoryValue: 0 },
        };
      }

      return {
        success: true,
        message: data.message || "Total inventory value retrieved successfully",
        data: data.data || { totalInventoryValue: 0 },
      };
    } catch (error: unknown) {
      console.error("Get total inventory value error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to get total inventory value";
      return { success: false, message, data: { totalInventoryValue: 0 } };
    }
  },
  getWalletBalance: async (): Promise<WalletBalanceResponse> => {
    try {
      const response = await apiClient.get<WalletBalanceResponse>(
        "/api/seller/walletPageApis/getWalletBalance",
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch wallet balance",
          data: { balance: 0 },
        };
      }

      console.log(
        "[getWalletBalance] API response:",
        data,
        "Status:",
        response.status,
      );
      return {
        success: true,
        message: data.message || "Wallet balance retrieved successfully",
        data: data.data || { balance: 0 },
      };
    } catch (error: unknown) {
      console.error("Get wallet balance error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to get wallet balance";
      return { success: false, message, data: { balance: 0 } };
    }
  },
  createStore: async (
    data: StorefrontFormData | FormData,
  ): Promise<CreateStoreResponse> => {
    try {
      let body: FormData;

      if (data instanceof FormData) {
        body = data;
        body.delete("storeName");
      } else {
        body = new FormData();
        body.append("storeDescription", data.description || "");
        body.append("storeType", data.storeType || "physical");

        if (data.storeType === "physical") {
          body.append("storephysicalAddress", data.address || "");
        } else {
          body.append("storeOnlineAddress", data.address || "Online");
        }

        if (data.logo) {
          body.append("storeLogo", data.logo, data.logo.name);
        }
        if (data.banner) {
          body.append("storeBanner", data.banner, data.banner.name);
        }
      }

      const response = await apiClient.post<CreateStoreResponse>(
        "/api/seller/createStore",
        body,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        },
      );

      const resData = response.data;
      return {
        success: resData?.success ?? true,
        message: resData?.message || "Store setup successful",
        data: resData?.data,
      };
    } catch (error: unknown) {
      console.error("Create store error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to create store";
      return { success: false, message };
    }
  },
  setupStore: async (
    data: StorefrontFormData | FormData,
  ): Promise<CreateStoreResponse> => {
    return sellerService.createStore(data);
  },
  getSalesPerformanceIndicator: async (
    timeframe: string = "7days",
  ): Promise<SalesPerformanceResponse> => {
    try {
      const response = await apiClient.get<SalesPerformanceResponse>(
        "/api/seller/salesPerformanceIndecator",
        {
          params: { timeframe },
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message:
            data?.message || "Failed to fetch sales performance indicator",
        };
      }

      return {
        success: true,
        message:
          data.message || "Sales performance indicator retrieved successfully",
        data: data.data,
      };
    } catch (error: unknown) {
      console.error("Get sales performance indicator error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to get sales performance indicator";
      return { success: false, message };
    }
  },
  getAverageOrderValue: async (): Promise<AvgOrderValueResponse> => {
    try {
      const response = await apiClient.get<AvgOrderValueResponse>(
        "/api/seller/AverageOrderValue",
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch average order value",
          data: { avgOrderValue: 0, changePercent: 0 },
        };
      }

      let resultData: AvgOrderValueData = {
        avgOrderValue: 0,
        changePercent: 0,
      };
      if (data.data) {
        const raw = data.data as unknown as Record<string, unknown>;
        if (raw.data && typeof raw.data === "object") {
          const nested = raw.data as Record<string, unknown>;
          resultData = {
            avgOrderValue: Number(
              nested.avgOrderValue ?? nested.averageOrderValue ?? 0,
            ),
            changePercent: Number(nested.changePercent ?? 0),
            message:
              typeof nested.message === "string" ? nested.message : undefined,
          };
        } else {
          resultData = {
            avgOrderValue: Number(
              raw.avgOrderValue ?? raw.averageOrderValue ?? 0,
            ),
            changePercent: Number(raw.changePercent ?? 0),
            message: typeof raw.message === "string" ? raw.message : undefined,
          };
        }
      }

      return {
        success: true,
        message: data.message || "Average order value retrieved successfully",
        data: resultData,
      };
    } catch (error: unknown) {
      console.error("Get average order value error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to get average order value";
      return {
        success: false,
        message,
        data: { avgOrderValue: 0, changePercent: 0 },
      };
    }
  },
  getSalesByCategory: async (): Promise<SalesByCategoryResponse> => {
    try {
      const response = await apiClient.get<SalesByCategoryResponse>(
        "/api/seller/getSalesByCategory",
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch sales by category",
          data: {},
        };
      }

      return {
        success: true,
        message: data.message || "Sales by category retrieved successfully",
        data: data.data || {},
      };
    } catch (error: unknown) {
      console.error("Get sales by category error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to get sales by category";
      return {
        success: false,
        message,
        data: {},
      };
    }
  },
  getStoreDetails: async (
    sellerId: string
  ): Promise<StoreDetailsResponse> => {
    if (
      !sellerId ||
      sellerId === "undefined" ||
      sellerId === "null" ||
      sellerId.trim() === ""
    ) {
      return {
        success: false,
        message: "Seller ID is required",
        data: null,
      };
    }

    try {
      const response = await apiClient.get<StoreDetailsResponse>(
        `/api/seller/storeFront?sellerId=${encodeURIComponent(sellerId)}`,
        {
          withCredentials: true,
          validateStatus: (status) => status < 500,
        }
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch store details",
          data: null,
        };
      }

      return {
        success: true,
        message: data.message || "Store details retrieved successfully",
        data: data.data,
      };
    } catch (error: unknown) {
      console.error("Get store details error:", error);
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
        message?: string;
      };
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        axiosError?.message ||
        "Failed to get store details";
      return { success: false, message, data: null };
    }
  },
};

export const fetchSellerProducts = sellerService.getSellerProducts;
export const deleteSellerProduct = sellerService.deleteProduct;
export const editSellerProduct = sellerService.editProduct;
export const applySellerProductDiscount = sellerService.applyDiscount;
export const editSellerStock = sellerService.editStock;
export const editStock = sellerService.editStock;
export const fetchTotalProducts = sellerService.getTotalProducts;
export const fetchTotalOrders = sellerService.getTotalOrders;
export const fetchTotalRevenue = sellerService.getTotalRevenue;
export const fetchTopProducts = sellerService.getTopProducts;
export const fetchSellerOrders = sellerService.getAllOrders;
export const fetchTotalInventoryValue = sellerService.getTotalInventoryValue;
export const fetchWalletBalance = sellerService.getWalletBalance;
export const createStore = sellerService.createStore;
export const setupStore = sellerService.setupStore;
export const fetchSalesPerformanceIndicator =
  sellerService.getSalesPerformanceIndicator;
export const fetchAverageOrderValue = sellerService.getAverageOrderValue;
export const fetchSalesByCategory = sellerService.getSalesByCategory;
export const fetchStoreDetails = sellerService.getStoreDetails;
export const getStoreDetails = sellerService.getStoreDetails;
export const fetchStorefrontDetails = sellerService.getStoreDetails;

