"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types/product.type";
import { useCartStore } from "@/stores/buyer/useCart";
import { useWishlistStore } from "@/stores/buyer/wishlist";
import { useAuth } from "@/hooks/useAuth";

interface StoreProductCardProps {
  product: Product;
}

export default function StoreProductCard({ product }: StoreProductCardProps) {
  const title = product.productName || product.name || "Unnamed Product";
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
  const image = (Array.isArray(imageUrl) ? imageUrl[0] : imageUrl) || "/images/placeholder.jpg";

  const stock = typeof product.stock === "number" ? product.stock : 0;
  const rating = product.AvgRating ?? product.rating ?? 0;
  const isOutOfStock = stock <= 0 || product.status === "out_of_stock";
  const isLowStock = !isOutOfStock && stock <= 5;

  const productId: string = String(
    (product as any)._id ||
    (product as any).id ||
    (product as any).productId ||
    ""
  );

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

    if (isWishlisted) {
      removeFromWishlist(productId);
      toast.success(`Removed "${title}" from wishlist.`);
    } else {
      addToWishlist({
        id: productId,
        title,
        price: finalPrice,
        image,
      });
      toast.success(`Added "${title}" to wishlist.`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

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
    toast.success(`Added "${title}" to cart!`);
  };

  return (
    <div className="group relative flex flex-col h-full bg-card rounded-2xl border border-border/80 hover:border-primary/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Product Image Link */}
      <Link href={`/products/${productId}`} className="relative aspect-square w-full bg-muted overflow-hidden block">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            isOutOfStock ? "grayscale opacity-75" : ""
          }`}
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-rose-600 text-white text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm">
            -{Math.round(discount)}%
          </span>
        )}

        {/* Out of stock badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="bg-background/90 text-foreground text-xs font-bold px-2.5 py-1 rounded-lg shadow-md border border-border">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 z-20 p-2 rounded-full bg-background/80 hover:bg-background backdrop-blur-md text-foreground/80 hover:text-rose-600 shadow-sm border border-border/50 transition-all active:scale-90 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "fill-rose-600 text-rose-600" : ""
            }`}
          />
        </button>
      </Link>

      {/* Details Container */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Category / Brand metadata */}
        <div className="flex items-center justify-between gap-1 text-[11px] text-muted-foreground font-medium mb-1">
          <span className="truncate">
            {typeof product.category === "object" && product.category !== null
              ? (product.category as any).name || (product.category as any).categoryName
              : typeof product.category === "string"
                ? product.category
                : product.brand || "Product"}
          </span>
          {rating > 0 && (
            <span className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-semibold shrink-0">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{Number(rating).toFixed(1)}</span>
            </span>
          )}
        </div>

        {/* Product Title */}
        <Link href={`/products/${productId}`} className="block group-hover:text-primary transition-colors">
          <h3 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>

        {/* Stock Status Indicator */}
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full ${
              isOutOfStock
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                : isLowStock
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {isOutOfStock
              ? "Out of Stock"
              : isLowStock
                ? `Only ${stock} left`
                : "In Stock"}
          </span>
        </div>

        {/* Price & Action Strip */}
        <div className="mt-auto pt-3 border-t border-border/50 flex items-end justify-between gap-2">
          <div>
            {hasDiscount ? (
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-xs text-muted-foreground line-through">
                  {price.toLocaleString()} EGP
                </span>
                <span className="text-sm sm:text-base font-bold text-foreground">
                  {discountedPrice.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">EGP</span>
                </span>
              </div>
            ) : (
              <span className="text-sm sm:text-base font-bold text-foreground">
                {price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">EGP</span>
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
              isOutOfStock
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
