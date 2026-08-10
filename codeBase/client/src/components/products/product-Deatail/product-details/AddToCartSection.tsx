"use client";
import React, { useSyncExternalStore } from "react";

import { Heart, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/stores/buyer/wishlist";
import { useCartStore } from "@/stores/buyer/useCart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const emptySubscribe = () => () => {};

interface AddToCartSectionProps {
  productId: string;
  productTitle: string;
  productPrice: number;
  productThumbnail: string;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  isAvailable?: boolean;
}

export default function AddToCartSection({
  productId,
  productTitle,
  productPrice,
  productThumbnail,
  onAddToCart,
  onAddToWishlist,
  isAvailable = true,
}: AddToCartSectionProps) {
  const { user } = useAuth();
  const { addItem, removeItem, items } = useWishlistStore();

  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isWishlisted = mounted && items.some((item) => item.id === productId);

  const handleWishlistClick = () => {
    if (!user) {
      toast.error("Please login to manage your wishlist");
      return;
    }

    const itemId = productId;
    if (isWishlisted) {
      removeItem(itemId);
    } else {
      addItem({
        id: itemId,
        title: productTitle,
        price: productPrice,
        thumbnail: productThumbnail,
      });
    }
    onAddToWishlist();
  };
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="flex items-center gap-4 w-full">
      <button
        type="button"
        onClick={() => {
          if (!user) {
            toast.error("Please login to add items to your cart");
            return;
          }
          addToCart({
            id: productId,
            title: productTitle,
            price: productPrice,
            thumbnail: productThumbnail,
            description: "",
          });
          onAddToCart();
        }}
        disabled={!isAvailable}
        className={`flex-1 h-12 flex items-center justify-center gap-2 font-semibold text-sm rounded-lg transition-all duration-300 ${
          isAvailable
            ? "bg-black text-white hover:bg-neutral-850 dark:bg-white dark:text-black dark:hover:bg-neutral-200 active:scale-[0.99] cursor-pointer"
            : "bg-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600 cursor-not-allowed"
        }`}
        aria-label="Add to cart"
      >
        <ShoppingBag className="w-4 h-4" />
        {isAvailable ? "Add to Cart" : "Out of Stock"}
      </button>

      <button
        type="button"
        onClick={handleWishlistClick}
        className={`w-12 h-12 border border-border rounded-lg flex items-center justify-center transition-colors hover:bg-muted ${
          isWishlisted
            ? "text-red-500 border-red-200 bg-red-50/10"
            : "text-foreground hover:text-red-500"
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
      </button>
    </div>
  );
}
