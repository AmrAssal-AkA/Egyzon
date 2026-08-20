"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';

import { useWishlistStore } from "@/stores/buyer/wishlist";
import { useCartStore } from "@/stores/buyer/useCart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function WishlistPreview() {
  const { items } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const { user, isSeller } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (item: { id: string; title: string; price: number; image?: string }) => {
    if (!user) {
      toast.error("Please login to add items to your cart");
      return;
    }
    if (isSeller) {
      toast.error("Seller accounts cannot use cart");
      return;
    }
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      thumbnail: item.image || "/images/placeholder.jpg",
      description: "",
    });
    toast.success(`Added "${item.title}" to cart`);
  };

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-36 bg-muted animate-pulse rounded" />
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-56 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 fill-red-500/20" />
          Wishlist Preview
          {items.length > 0 && (
            <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          )}
        </h3>
        <Link href="/dashboard/wishlist" className="text-sm text-blue-600 hover:underline dark:text-blue-400 font-medium">
          See All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
            <Heart className="w-10 h-10 text-muted-foreground/30 stroke-[1.5] mb-2" />
            <p className="text-muted-foreground text-sm font-medium">Your wishlist is empty</p>
            <p className="text-xs text-muted-foreground mt-1">Explore items and add them to your wishlist</p>
          </div>
        ) : (
          items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col justify-between group hover:shadow-md transition duration-200 ease-in-out bg-card"
            >
              <Link href={`/products/${item.id}`} className="flex flex-col items-center">
                <div className="relative w-full h-36 rounded-md overflow-hidden bg-muted mb-3">
                  <Image 
                    src={item.image || "/images/placeholder.jpg"} 
                    alt={item.title} 
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h4 className="text-sm font-medium text-foreground text-center line-clamp-1 mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm font-bold text-foreground mb-3">
                  {item.price.toFixed(2)} EGP
                </p>
              </Link>
              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition duration-200 active:scale-[0.99] cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
