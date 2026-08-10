import axios from "axios";

export const addWishlist = async (productId: string) => {
  try {
    const response = await axios.post("/api/wishlists/addWishlist", { productId });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to add wishlist");
    }
    throw new Error("Failed to add wishlist");
  }
};

export const removeWishlist = async (productId: string) => {
  try {
    const response = await axios.delete("/api/wishlists/removeWishlist", { data: { productId } });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to remove wishlist");
    }
    throw new Error("Failed to remove wishlist");
  }
};

export const getWishlist = async () => {
  try {
    const response = await axios.get("/api/wishlists/getWishlist");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to get wishlist");
    }
    throw new Error("Failed to get wishlist");
  }
};
