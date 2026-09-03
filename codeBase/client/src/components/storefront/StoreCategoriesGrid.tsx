"use client";

import React from "react";
import Image from "next/image";
import { Layers, ChevronRight } from "lucide-react";
import { StoreCategoryItem } from "@/types/storefront";

interface StoreCategoriesGridProps {
  categories: StoreCategoryItem[];
  onSelectCategory: (categoryName: string) => void;
}

export default function StoreCategoriesGrid({
  categories,
  onSelectCategory,
}: StoreCategoriesGridProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
            Store Categories
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Browse items by seller category collections
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.name)}
            className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-card border border-border/80 hover:border-primary/50 hover:shadow-md transition-all duration-300 text-center cursor-pointer overflow-hidden"
          >
            {cat.image ? (
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden mb-3 bg-muted">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
            )}

            <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {cat.name}
            </h3>
            <span className="text-[11px] text-muted-foreground mt-0.5">
              {cat.productCount} {cat.productCount === 1 ? "Product" : "Products"}
            </span>

            <div className="mt-2 flex items-center text-[11px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View All</span>
              <ChevronRight className="w-3 h-3 ml-0.5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
