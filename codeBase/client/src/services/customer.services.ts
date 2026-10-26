import { apiClient } from "@/lib/apiClient";
import {
  CustomerOrderHistoryResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
  CustomerTotalSpendResponse,
} from "@/types/customer";

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
  },

  changePassword: async (
    payload: ChangePasswordPayload
  ): Promise<ChangePasswordResponse> => {
    try {
      const response = await apiClient.put<ChangePasswordResponse>(
        "/api/customer/changePassword",
        payload,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
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
        "Failed to change password";
      return {
        success: false,
        message,
      };
    }
  },

  getTotalSpend: async (): Promise<CustomerTotalSpendResponse> => {
    try {
      const response = await apiClient.get<CustomerTotalSpendResponse>(
        "/api/customer/totalSpend",
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch total spend",
          data: {
            totalAmountSpent: 0,
          },
        };
      }

      return {
        success: true,
        message: data.message || "Total amount spent retrieved successfully",
        data: data.data || {
          totalAmountSpent: 0,
        },
      };
    } catch (error: unknown) {
      console.error("Fetch customer total spend error:", error);
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
        "Failed to fetch total spend";
      return {
        success: false,
        message,
        data: {
          totalAmountSpent: 0,
        },
      };
    }
  },
};

export const getCustomerOrderHistory = customerService.getCustomerOrderHistory;
export const changePassword = customerService.changePassword;
export const getTotalSpend = customerService.getTotalSpend;
