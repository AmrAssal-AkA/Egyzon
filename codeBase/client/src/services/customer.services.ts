import { apiClient } from "@/lib/apiClient";
import {
  CustomerOrderHistoryResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
  CustomerTotalSpendResponse,
  CustomerTotalOrdersResponse,
  ChangeCustomerNamePayload,
  ChangeCustomerNameResponse,
  DeleteCustomerPayload,
  DeleteCustomerResponse,
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

  changeCustomerName: async (
    payload: ChangeCustomerNamePayload
  ): Promise<ChangeCustomerNameResponse> => {
    try {
      const response = await apiClient.patch<ChangeCustomerNameResponse>(
        "/api/customer/changeName",
        payload,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Change customer name error:", error);
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
        "Failed to change customer name";
      return {
        success: false,
        message,
      };
    }
  },

  deleteCustomer: async (
    payload: DeleteCustomerPayload
  ): Promise<DeleteCustomerResponse> => {
    try {
      const response = await apiClient.delete<DeleteCustomerResponse>(
        "/api/customer/deleteCustomer",
        {
          data: payload,
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Delete customer error:", error);
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
        "Failed to delete customer account";
      return {
        success: false,
        message,
      };
    }
  },

  getTotalOrders: async (): Promise<CustomerTotalOrdersResponse> => {
    try {
      const response = await apiClient.get<CustomerTotalOrdersResponse>(
        "/api/customer/totalOrders",
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      if (!data?.success) {
        return {
          success: false,
          message: data?.message || "Failed to fetch total orders",
          data: {
            totalOrders: 0,
          },
        };
      }

      return {
        success: true,
        message: data.message || "Total orders retrieved successfully",
        data: data.data || {
          totalOrders: 0,
        },
      };
    } catch (error: unknown) {
      console.error("Fetch customer total orders error:", error);
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
        "Failed to fetch total orders";
      return {
        success: false,
        message,
        data: {
          totalOrders: 0,
        },
      };
    }
  },
};

export const getCustomerOrderHistory = customerService.getCustomerOrderHistory;
export const changePassword = customerService.changePassword;
export const getTotalSpend = customerService.getTotalSpend;
export const getTotalOrders = customerService.getTotalOrders;
export const changeCustomerName = customerService.changeCustomerName;
export const changeName = customerService.changeCustomerName;
export const deleteCustomer = customerService.deleteCustomer;
export const deleteCustomerAccount = customerService.deleteCustomer;


