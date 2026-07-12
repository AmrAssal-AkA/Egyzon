"use client";

import React, { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";

interface AddToCartSectionProps {
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  isAvailable?: boolean;
}

export default function AddToCartSection({
  onAddToCart,
  onAddToWishlist,
  isAvailable = true,
}: AddToCartSectionProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist();
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <button
        type="button"
        onClick={onAddToCart}
        disabled={!isAvailable}
        className={`flex-1 h-12 flex items-center justify-center gap-2 font-semibold text-sm rounded-lg transition-all duration-300 ${
          isAvailable
            ? "bg-black text-white hover:bg-neutral-850 dark:bg-white dark:text-black dark:hover:bg-neutral-200 active:scale-[0.99] cursor-pointer"
            : "bg-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600 cursor-not-allowed"
        }`}
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
