"use client";

import React, { useState } from "react";
import { Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import QuantitySelector from "./QuantitySelector";
import AddToCartSection from "./AddToCartSection";
import SellerCard from "./SellerCard";

import { Seller } from "@/types/store";

interface ProductInfoProps {
  id: string;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  discount?: number;
  inStock: boolean;
  stock: number;
  seller: Seller;
  thumbnail: string;
}

export default function ProductInfo({
  id,
  title,
  rating,
  reviewCount,
  price,
  discount = 0,
  inStock,
  stock,
  seller,
  thumbnail,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const numPrice = typeof price === "number" ? price : Number(price) || 0;
  const numDiscount =
    typeof discount === "number" ? discount : Number(discount) || 0;
  const hasDiscount = numDiscount > 0 && numDiscount < 100;
  const discountedPrice = hasDiscount
    ? numPrice * (1 - numDiscount / 100)
    : numPrice;
  const finalPrice = hasDiscount ? discountedPrice : numPrice;

  const isAvailable = Boolean(
    inStock && (typeof stock === "number" ? stock > 0 : true),
  );

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} x "${title}" to your cart!`);
  };

  const handleAddToWishlist = () => {
    toast.success(`Updated "${title}" in your wishlist.`);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link
          href="/products"
          className="hover:text-foreground transition-colors"
        >
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-foreground font-medium truncate max-w-37.5">
          {title}
        </span>
      </nav>

      {/* Product Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight leading-tight">
          {title}
        </h1>

        {/* Rating & Availability Row */}
        <div className="flex flex-wrap items-center gap-3 text-sm mt-1">
          <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 font-semibold px-2 py-0.5 rounded text-xs">
            <Star className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>{rating.toFixed(2)}</span>
          </div>
          <span className="text-muted-foreground">({reviewCount} reviews)</span>
          <span className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
          {isAvailable ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                In Stock
              </span>
              {typeof stock === "number" && stock > 0 && stock <= 5 && (
                <span className="inline-flex items-center text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                  Only {stock} left!
                </span>
              )}
            </div>
          ) : (
            <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-450 bg-red-500/10 px-2.5 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-border pt-4">
        <div className="flex items-baseline gap-3 flex-wrap">
          {hasDiscount ? (
            <>
              <span className="text-xl text-muted-foreground line-through">
                {numPrice.toFixed(2)} EGP
              </span>
              <span className="text-3xl font-bold text-foreground tracking-tight">
                {discountedPrice.toFixed(2)} EGP
              </span>
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                {Math.round(numDiscount)}% OFF
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold text-foreground tracking-tight">
              {numPrice.toFixed(2)} EGP
            </span>
          )}
        </div>
      </div>

      {/* Selector & Actions */}
      <div className="flex flex-col gap-6 border-t border-border pt-6">
        <QuantitySelector
          quantity={isAvailable ? quantity : 0}
          onChange={setQuantity}
          stock={stock}
          disabled={!isAvailable}
        />
        <AddToCartSection
          onAddToCart={handleAddToCart}
          productId={id}
          productTitle={title}
          productPrice={finalPrice}
          productThumbnail={thumbnail}
          onAddToWishlist={handleAddToWishlist}
          isAvailable={isAvailable}
        />
      </div>

      {/* Seller Card */}
      <div className="border-t border-border pt-6 mt-2">
        <SellerCard seller={seller} />
      </div>
    </div>
  );
}
