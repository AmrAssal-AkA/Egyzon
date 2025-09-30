"use client"
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

export default function useHandleAddToCart() {
  const { addtocart } = useCart();

  const handleAddToCart = (product, quantity = 1) => {
    addtocart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`, {
      position: "bottom-right", 
      autoClose: 5000, 
      size : "small"
    });
  };

  return handleAddToCart;
}
