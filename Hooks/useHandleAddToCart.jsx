"use client"
import useCartStore from "@/stores/buyer/cartSore";
import { toast } from "react-toastify";

export default function useHandleAddToCart() {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`, {
      position: "bottom-right", 
      autoClose: 5000, 
      size : "small"
    });
  };

  return handleAddToCart;
}
