import axios from "axios";

import { SellerFormData } from "@/types/seller";
import { ApiResponse } from "@/types/auth";

export const sellerService = {
  applyAsSeller: async (
    data: SellerFormData,
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
          data.commercialRegisterImage.name
        );
      }
      if (data.taxCardImage) {
        formData.append(
          "taxCardImage", 
          data.taxCardImage,
          data.taxCardImage.name
        );
      }

      const response = await axios.post("/api/seller/apply", formData, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
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
};
