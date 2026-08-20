"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, PackageOpen, ArrowLeft, RefreshCw } from "lucide-react";
import { useCategoryProducts } from "@/hooks/useCategory";
import { Product } from "@/types/product.type";
import ProductGrid from "@/components/products/Product-grid";

interface CategoryProductsClientProps {
  categoryId: string;
  initialProducts?: Product[];
  categoryName?: string;
}

export default function CategoryProductsClient({
  categoryId,
  initialProducts = [],
  categoryName,
}: CategoryProductsClientProps) {
  const { products, isLoading, error, mutate } = useCategoryProducts(
    categoryId,
    initialProducts
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        const name = (item.productName || item.name || "").toLowerCase();
        const desc = (item.productDescription || item.description || "").toLowerCase();
        return name.includes(q) || desc.includes(q);
      });
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => (b.AvgRating ?? 0) - (a.AvgRating ?? 0));
    }

    return list;
  }, [products, searchQuery, sortBy]);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-card/60 backdrop-blur border border-border p-4 rounded-xl shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${categoryName || "category"} products...`}
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-sm">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <span className="font-medium text-foreground whitespace-nowrap">
            {filteredProducts.length}{" "}
            <span className="text-muted-foreground font-normal">
              {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </span>

          <button
            onClick={() => mutate()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition-colors cursor-pointer"
            title="Refresh products"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && products.length === 0 && (
        <div className="w-full rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="text-destructive font-semibold text-base mb-1">
            Failed to load products for this category
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            An error occurred while fetching products. Please try again.
          </p>
          <button
            onClick={() => mutate()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && products.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-80 rounded-xl bg-muted/60 border border-border"
            />
          ))}
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 && (
        <div className="w-full">
          <ProductGrid products={filteredProducts} />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="w-full rounded-xl border border-dashed border-border bg-card/40 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <PackageOpen className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {searchQuery ? "No matching products" : "No products in this category yet"}
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm mb-6">
            {searchQuery
              ? `No products matched "${searchQuery}". Try a different keyword.`
              : "We couldn't find any products listed under this category right now."}
          </p>
          <div className="flex items-center gap-3">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            )}
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Categories</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
