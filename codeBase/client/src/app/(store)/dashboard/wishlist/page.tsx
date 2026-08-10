"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Heart, ArrowLeft } from "lucide-react";
import { useWishlistStore } from "@/stores/buyer/wishlist";
import { toast } from "sonner";

import SideMenu from "@/components/userDashboard/sideMenu";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleRemove = (id: string, title: string) => {
    removeItem(id);
    toast.success(`Removed "${title}" from your wishlist.`);
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear your entire wishlist?")) {
      clearWishlist();
      toast.success("Cleared all items from your wishlist.");
    }
  };

  if (!mounted) {
    return (
      <main className="w-full min-h-screen bg-background flex flex-col items-center py-20 px-4 md:px-20 mt-10">
        <div className="w-full max-w-7xl flex flex-col gap-8">
          <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-96 w-full bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
      <div className="flex min-h-screen mt-40 w-full">
      <SideMenu />
    <main className="flex-1 bg-background flex flex-col items-center py-20 px-4 md:px-20 ">
      <div className="w-full max-w-7xl flex flex-col gap-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
              My Wishlist
              <span className="text-sm font-normal text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">
              Keep track of items you love and want to shop later.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center justify-center gap-2 bg-destructive/10 hover:bg-destructive hover:text-white text-destructive border border-destructive/25 transition-all text-xs font-semibold px-4 py-2.5 rounded-lg active:scale-[0.99] cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Clear Wishlist
            </button>
          )}
        </div>

        {/* Content Area */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-2xl bg-muted/20">
            <Heart className="w-16 h-16 text-muted-foreground/30 stroke-[1.5] mb-4 animate-pulse" />
            <h2 className="text-xl font-bold text-foreground">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md px-4">
              Explore our catalog and click the heart button on items you like
              to save them for later!
            </p>
            <Link
              href="/"
              className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card text-card-foreground shadow-md hover:shadow-lg rounded-lg overflow-hidden border border-border flex flex-col justify-between h-full transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-64 w-full bg-muted">
                  <Image
                    src={item.thumbnail || "/images/placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <button
                    onClick={() => handleRemove(item.id, item.title)}
                    className="absolute top-3 right-3 bg-background/90 backdrop-blur hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white text-muted-foreground p-2 rounded-full shadow transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-label={`Remove ${item.title} from wishlist`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Body */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-foreground tracking-tight line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-lg font-bold text-foreground">
                      {item.price.toFixed(2)} EGP
                    </p>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${item.id}`}
                        className="flex-1 text-center py-2 px-3 bg-secondary hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white text-secondary-foreground font-semibold text-xs rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
    </div>
  );
}
