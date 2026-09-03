"use client";

import React, { useState, useMemo } from "react";
import { Search, ArrowDownUp, X } from "lucide-react";
import { Product } from "@/types/product.type";
import {
  StoreAvailabilityFilter,
  StoreCategoryItem,
  StoreProductSort,
} from "@/types/storefront";
import StoreProductCard from "./StoreProductCard";
import StoreEmptyState from "./StoreEmptyState";

interface StoreProductsSectionProps {
  products: Product[];
  categories: StoreCategoryItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function StoreProductsSection({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
}: StoreProductsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<StoreProductSort>("featured");
  const [availability, setAvailability] =
    useState<StoreAvailabilityFilter>("all");

  // Filtered & Sorted products computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search query filter
        const title = (product.productName || product.name || "").toLowerCase();
        const desc = (
          product.productDescription ||
          product.description ||
          ""
        ).toLowerCase();
        const brand = (product.brand || "").toLowerCase();
        const query = searchQuery.trim().toLowerCase();

        const matchesSearch =
          !query ||
          title.includes(query) ||
          desc.includes(query) ||
          brand.includes(query);

        // Category filter
        const prodCat =
          typeof product.category === "object" && product.category !== null
            ? (product.category as any).name ||
              (product.category as any).categoryName ||
              ""
            : typeof product.category === "string"
              ? product.category
              : "";

        const matchesCategory =
          !selectedCategory ||
          selectedCategory === "all" ||
          prodCat.toLowerCase() === selectedCategory.toLowerCase();

        // Availability filter
        const stock = typeof product.stock === "number" ? product.stock : 0;
        const discount =
          typeof product.discount === "number"
            ? product.discount
            : typeof product.discountPercentage === "number"
              ? product.discountPercentage
              : 0;

        let matchesAvailability = true;
        if (availability === "in-stock") {
          matchesAvailability = stock > 0 && product.status !== "out_of_stock";
        } else if (availability === "on-sale") {
          matchesAvailability = discount > 0;
        }

        return matchesSearch && matchesCategory && matchesAvailability;
      })
      .sort((a, b) => {
        const priceA =
          typeof a.price === "number" ? a.price : Number(a.price) || 0;
        const priceB =
          typeof b.price === "number" ? b.price : Number(b.price) || 0;
        const ratingA = a.AvgRating ?? a.rating ?? 0;
        const ratingB = b.AvgRating ?? b.rating ?? 0;

        switch (sortBy) {
          case "price-asc":
            return priceA - priceB;
          case "price-desc":
            return priceB - priceA;
          case "highest-rated":
            return ratingB - ratingA;
          case "newest":
            return (
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
            );
          case "featured":
          default:
            return (b.discount || 0) - (a.discount || 0);
        }
      });
  }, [products, searchQuery, selectedCategory, availability, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    onSelectCategory("all");
    setAvailability("all");
    setSortBy("featured");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    (selectedCategory !== "all" && selectedCategory !== "") ||
    availability !== "all";

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <span>Products</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {filteredProducts.length} items
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Explore authentic products directly from this store
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-card p-3 rounded-2xl border border-border/80 shadow-xs">
        {/* In-store Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products in this store..."
            className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-muted/60 border border-transparent focus:border-primary/50 focus:bg-background focus:outline-none transition-all placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Controls Strip: Availability + Sort */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Availability Filter Buttons */}
          <div className="inline-flex items-center bg-muted/60 p-1 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setAvailability("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                availability === "all"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setAvailability("in-stock")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                availability === "in-stock"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              In Stock
            </button>
            <button
              type="button"
              onClick={() => setAvailability("on-sale")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                availability === "on-sale"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              On Sale
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/60 text-xs font-medium text-foreground border border-border/50">
              <ArrowDownUp className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as StoreProductSort)}
                className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="highest-rated">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills (Derived dynamically from seller products) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
            !selectedCategory || selectedCategory === "all"
              ? "bg-primary text-primary-foreground font-semibold shadow-xs"
              : "bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          All Categories ({products.length})
        </button>

        {categories.map((cat) => {
          const isSelected =
            selectedCategory?.toLowerCase() === cat.name.toLowerCase();
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {cat.productCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Filters Reset Indicator */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
          <span>
            Showing{" "}
            <strong className="text-foreground">
              {filteredProducts.length}
            </strong>{" "}
            of {products.length} products
          </span>
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-primary hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      )}

      {/* Products Grid or Empty State */}
      {products.length === 0 ? (
        <StoreEmptyState type="no-products" />
      ) : filteredProducts.length === 0 ? (
        <StoreEmptyState
          type="no-search-results"
          searchQuery={searchQuery}
          onResetFilters={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {filteredProducts.map((product) => (
            <StoreProductCard
              key={
                product._id ||
                product.id ||
                (product as any).productId ||
                Math.random()
              }
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}
