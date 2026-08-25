"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { FiShoppingCart, FiX, FiPlus, FiMinus } from "react-icons/fi";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/cart";
import { useCartStore } from "@/stores/buyer/useCart";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function CartModel() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const { user } = useAuth();
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    useCartStore.getState().updateQuantity(itemId, newQuantity);
  };

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsCheckoutLoading(true);
      if (!user) {
        return toast.error("Please log in to proceed to checkout");
      }
      if (cartItems.length === 0) {
        return toast.error("Your cart is empty");
      }
      await useCartStore.getState().syncCartWithServer();
      router.push("/checkout");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to proceed to checkout"
      );
    } finally {
      setIsCheckoutLoading(false);
    }
  };
  const handleCartEmpty = async () => {
    try {
      useCartStore.getState().clearCart();
      toast.success("Cart emptied successfully!");
      router.push("/");
    }catch(error){
      toast.error(error instanceof Error ? error.message : "Failed to empty cart");
    }
  }

  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger className="relative bg-secondary shadow-md text-secondary-foreground rounded-md px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out">
        <FiShoppingCart />
        {cartQuantity > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {cartQuantity}
          </span>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerClose className="absolute right-4 top-4 rounded-sm text-muted-foreground opacity-70 transition-opacity hover:text-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <FiX className="h-5 w-5" />
            <span className="sr-only">Close cart drawer</span>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <FiShoppingCart className="mb-4 h-12 w-12 opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-secondary">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={`Image of ${item.title}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FiShoppingCart className="h-6 w-6 text-muted-foreground opacity-50" />
                      </div>
                    )}
                  </div>
                   
                  <div className="flex flex-1 flex-col">
                    <span className="font-medium line-clamp-2">
                      {item.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="rounded-md border border-border px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <FiMinus />
                      </button>
                      <span className="mt-1 text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="rounded-md border border-border px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-semibold">
                      {(item.price * item.quantity).toFixed(2)} EGP
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-red-500 transition-colors hover:text-red-700 focus:outline-none focus:underline"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
          {/* Drawer Footer */}
        <DrawerFooter className="border-t pt-4">
          <div className="mb-4 flex items-center justify-between text-lg font-bold">
            <span>Subtotal</span>
            <span>{totalPrice.toFixed(2)} EGP</span>
          </div>
          <button onClick={handleCartEmpty} className="bg-none text-red-600 cursor-pointer justify-end">
            Empty Cart
          </button>
          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || isCheckoutLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground flex items-center justify-center gap-2"
          >
            {isCheckoutLoading ? "Processing..." : "Checkout"}
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
