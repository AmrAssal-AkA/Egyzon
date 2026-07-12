"use client";

import { useMemo } from "react";

import { useFilterStore } from "@/stores/seller/filter";

import ActiveFilters from "./ActiveFilters";
import Filterfeature from "./Filter";
import ProductGrid from "../Product-grid";

export interface ShopProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
  brand: string;
  inStock: boolean;
  stock?: number;
  discountPercentage?: number;
  tags?: string[];
  colors?: string[];
}

interface ShopProductsClientProps {
  products: ShopProduct[];
}

function ShopProductsClient({ products }: ShopProductsClientProps) {
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const category = useFilterStore((state) => state.category);
  const brand = useFilterStore((state) => state.brand);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const rating = useFilterStore((state) => state.rating);
  const availability = useFilterStore((state) => state.availability);
  const discount = useFilterStore((state) => state.discount);
  const color = useFilterStore((state) => state.color);

  const categories = useMemo(
    () => products.map((product) => product.category),
    [products],
  );
  const brands = useMemo(
    () => products.map((product) => product.brand).filter(Boolean),
    [products],
  );
  const highestPrice = useMemo(
    () => Math.ceil(Math.max(...products.map((product) => product.price), 0)),
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = searchQuery
          ? product.title.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        const matchesCategory =
          category.length > 0 ? category.includes(product.category) : true;
        const matchesBrand =
          brand.length > 0 ? brand.includes(product.brand) : true;
        const matchesMinPrice = minPrice > 0 ? product.price >= minPrice : true;
        const matchesMaxPrice = maxPrice > 0 ? product.price <= maxPrice : true;
        const matchesRating = rating ? product.rating >= rating : true;
        const matchesAvailability =
          availability.length > 0
            ? availability.some((value) =>
                value === "inStock" ? product.inStock : !product.inStock,
              )
            : true;
        const matchesDiscount =
          discount.length > 0
            ? discount.some((value) => {
                if (value === "onSale") {
                  return Boolean(
                    product.discountPercentage &&
                    product.discountPercentage > 0,
                  );
                }

                if (value === "featured") {
                  return product.rating >= 4.5;
                }

                return (
                  product.tags?.some((tag) =>
                    tag.toLowerCase().includes("new"),
                  ) ?? false
                );
              })
            : true;
        const matchesColor =
          color.length > 0
            ? color.some((value) => product.colors?.includes(value))
            : true;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesBrand &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesRating &&
          matchesAvailability &&
          matchesDiscount &&
          matchesColor
        );
      }),
    [
      availability,
      brand,
      category,
      color,
      discount,
      maxPrice,
      minPrice,
      products,
      rating,
      searchQuery,
    ],
  );

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <Filterfeature
        categories={categories}
        brands={brands}
        maxPrice={highestPrice}
      />
      <section aria-label="Product results" className="min-w-0">
        <ActiveFilters />
        {filteredProducts.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center shadow-md">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </section>
    </div>
  );
}

export default ShopProductsClient;
