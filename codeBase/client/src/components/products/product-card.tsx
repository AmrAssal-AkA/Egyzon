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
  const {
    productName: title,
    productDescription: description,
    price,
    imageUrl,
    stock,
    AvgRating: rating = 0,
    status: productStatus = "active",
  } = product;

  
  const productId = (product as any)._id || (product as any).id || (product as any).productId || "";

  const image = (Array.isArray(imageUrl) ? imageUrl[0] : imageUrl) || "/images/placeholder.jpg";
  const availability = productStatus === "active" || stock > 0;

  const stockStatus = (() => {
    if (stock <= 0) {
      return "out";
    }
    if (stock <= 10) {
      return "low";
    }
    return "in";
  })();

  const isAvailable = stockStatus !== "out";

  const { user } = useAuth();
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

    if (isAvailable) {
      if (isWishlisted) {
        removeFromWishlist(productId);
        toast.success(`Removed "${title}" from your wishlist.`);
      } else {
        addToWishlist({
          id: productId,
          title,
          price,
          thumbnail: image,
        });
        toast.success(`Added "${title}" to your wishlist.`);
      }
    }
  };


  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden border border-border">
      <Link href={`/products/${productId}`}>
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-2 left-2 bg-blue-500 text-white dark:bg-blue-600 dark:text-white px-2 py-1 rounded">
            #{productId.slice(0, 8)}
          </div>
        </div>
        <div className="p-4 pb-0">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="bg-yellow-500 text-white dark:bg-yellow-600 dark:text-white px-2 py-1 rounded">
              {rating} ★
            </div>
            <p
              className={`text-xs px-3 py-1 rounded-lg text-white ${stockStatus === "in" ? "bg-green-500" : stockStatus === "low" ? "bg-yellow-600" : "bg-red-500"}`}
            >
              {stockStatus === "in"
                ? "In Stock"
                : stockStatus === "low"
                  ? `Low Stock (${stock})`
                  : "Out of Stock"}
            </p>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-foreground font-bold mt-4">
            {price.toFixed(2)} EGP
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleWishlistToggle}
              className="p-2 rounded-full transition-colors duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isWishlisted ? (
                <Heart className="w-5 h-5 fill-red-700 dark:fill-red-600" />
              ) : (
                <Heart className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              )}
            </button>

            <button
              disabled={!isAvailable}
              className={`px-4 py-2 rounded transition-colors duration-300 ease-in-out ${
                isAvailable
                  ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-300 text-muted-foreground dark:bg-gray-700 cursor-not-allowed"
              }`}
              onClick={() => {
                if (!user) {
                  toast.error("Please login to add items to your cart");
                  return;
                }
                addToCart({
                  id: productId,
                  title,
                  price,
                  thumbnail: image,
                  description: "",
                });
                toast.success("Added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
