"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Product } from "@/types/product.type";
import { useCartStore } from "@/stores/buyer/useCart";
import { useWishlistStore } from "@/stores/buyer/wishlist";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const title = product.productName || product.name || "Product";
  const description = product.productDescription || product.description || "";
  const price = typeof product.price === "number" ? product.price : Number(product.price) || 0;
  const discount =
    typeof product.discount === "number"
      ? product.discount
      : typeof product.discountPercentage === "number"
        ? product.discountPercentage
        : Number(product.discount) || 0;

  const hasDiscount = discount > 0 && discount < 100;
  const discountedPrice = hasDiscount ? price * (1 - discount / 100) : price;
  const finalPrice = hasDiscount ? discountedPrice : price;

  const imageUrl = product.imageUrl || product.image || product.thumbnail;
  const stock = typeof product.stock === "number" ? product.stock : 0;
  const rating = product.AvgRating ?? product.rating ?? 0;
  const productStatus = product.status || "active";

  const productId: string = String(product._id || product.id);

  const image =
    (Array.isArray(imageUrl) ? imageUrl[0] : imageUrl) ||
    "/images/placeholder.jpg";

  const stockStatus = (() => {
    if (stock <= 0) {
      return "out";
    }
    if (stock <= 10) {
      return "low";
    }
    return "in";
  })();

  const isAvailable = stockStatus !== "out" && productStatus !== "inactive";

  const { user, isSeller } = useAuth();
  const addToCart = useCartStore((state) => state.addToCart);
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    items: wishlistItems,
  } = useWishlistStore();

  const isWishlisted = wishlistItems.some((item) => item.id === productId);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to manage your wishlist");
      return;
    }

    if (isSeller) {
      toast.error("Seller accounts cannot use wishlist");
      return;
    }

    if (isAvailable) {
      if (isWishlisted) {
        removeFromWishlist(productId);
        toast.success(`Removed "${title}" from your wishlist.`);
      } else {
        addToWishlist({
          id: productId,
          title,
          price: finalPrice,
          image,
        });
        toast.success(`Added "${title}" to your wishlist.`);
      }
    }
  };

  return (
    <div className="group flex flex-col h-full bg-card text-card-foreground shadow-xs hover:shadow-md rounded-xl overflow-hidden border border-border transition-all duration-300">
      <Link
        href={`/products/${productId}`}
        aria-label={`View product details for ${title}`}
        className="flex flex-col flex-1 min-w-0"
      >
        <div className="relative aspect-square w-full bg-muted overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            priority
            quality={75}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {hasDiscount && (
            <span className="absolute top-2 left-2 z-10 bg-rose-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs">
              -{Math.round(discount)}%
            </span>
          )}
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-foreground line-clamp-1 sm:line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 line-clamp-2">
              {description}
            </p>
          )}

          <div className="mt-auto pt-3 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 px-2 py-0.5 rounded text-xs font-semibold shrink-0">
              <span>{rating > 0 ? Number(rating).toFixed(1) : "0.0"}</span>
              <span className="text-amber-500">★</span>
            </div>
            <span
              className={`text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap ${
                stockStatus === "in"
                  ? "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                  : stockStatus === "low"
                    ? "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                    : "bg-rose-500/15 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
              }`}
            >
              {stockStatus === "in"
                ? "In Stock"
                : stockStatus === "low"
                  ? `Low Stock (${stock})`
                  : "Out of Stock"}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-3 sm:p-4 pt-2 border-t border-border/50 mt-auto">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            {hasDiscount ? (
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                  {price.toFixed(2)}
                </span>
                <p className="text-sm sm:text-base md:text-lg font-bold text-foreground truncate">
                  {discountedPrice.toFixed(2)}{" "}
                  <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                    EGP
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-sm sm:text-base md:text-lg font-bold text-foreground truncate">
                {price.toFixed(2)}{" "}
                <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                  EGP
                </span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleWishlistToggle}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className="p-1.5 sm:p-2 rounded-full transition-colors hover:bg-muted text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
            >
              {isWishlisted ? (
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-600 text-rose-600" aria-hidden="true" />
              ) : (
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              disabled={!isAvailable}
              className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors shrink-0 ${
                isAvailable
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 cursor-pointer shadow-xs"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!user) {
                  toast.error("Please login to add items to your cart");
                  return;
                }
                if (isSeller) {
                  toast.error("Seller accounts cannot use cart");
                  return;
                }
                addToCart({
                  id: productId,
                  title,
                  price: finalPrice,
                  thumbnail: image,
                  description,
                });
                toast.success("Added to cart");
              }}
              aria-label={`Add ${title} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
