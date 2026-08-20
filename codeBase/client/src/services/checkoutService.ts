import axios from "axios";
import { apiClient } from "@/lib/apiClient";
import { PlaceOrderRequest, PlaceOrderApiResponse } from "@/types/order.types";

export const placeOrder = async (
  formData: PlaceOrderRequest
): Promise<PlaceOrderApiResponse> => {
  try {
    const res = await apiClient.post<PlaceOrderApiResponse>(
      "/api/checkout/placeOrder",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message ||
          error.response.data?.error ||
          "Failed to place order"
      );
    }
    throw new Error("Failed to place order");
  }
};