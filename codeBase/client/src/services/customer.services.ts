import { apiClient } from "@/lib/apiClient";
import { CustomerOrderHistoryResponse } from "@/types/customer";

export const customerService = {
  getCustomerOrderHistory: async (): Promise<CustomerOrderHistoryResponse> => {
    try {
      const response = await apiClient.get<CustomerOrderHistoryResponse>(
        "/api/customer/getCustomerOrderHistory",
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch customer order history",
          data: {
            _id: "",
            firstName: "",
            lastName: "",
            email: "",
            role: "customer",
            orders: [],
          },
        };
      }

      return {
        success: true,
        message:
          data.message || "Customer order history retrieved successfully",
        data: data.data || {
          _id: "",
          firstName: "",
          lastName: "",
          email: "",
          role: "customer",
          orders: [],
        },
      };
    } catch (error: unknown) {
      console.error("Fetch customer order history error:", error);
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
        "Failed to fetch customer order history";
      return {
        success: false,
        message,
        data: {
          _id: "",
          firstName: "",
          lastName: "",
          email: "",
          role: "customer",
          orders: [],
        },
      };
    }
  }
};

export const getCustomerOrderHistory = customerService.getCustomerOrderHistory;
