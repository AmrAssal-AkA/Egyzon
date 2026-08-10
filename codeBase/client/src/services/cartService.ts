import axios from "axios";
import { CreateCartRequest } from "@/types/cart.type";

export const createCart = async (data: CreateCartRequest) => {
  try {
    const response = await axios.post("/api/cart/createCart", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to create cart");
    }
    throw new Error("Failed to create cart");
  }
};

export const emptyCart = async () => {
  try {
    const response = await axios.delete("/api/cart/emptyCart");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to empty cart");
    }
    throw new Error("Failed to empty cart");
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get("/api/cart/getCart");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to get cart");
    }
    throw new Error("Failed to get cart");
  }
};
