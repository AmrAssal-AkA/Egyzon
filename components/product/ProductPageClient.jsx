"use client";
import React, { Suspense, useState } from "react";
import { Menu, X } from "lucide-react";

import ProductGrid from "@/components/product/ProductGrid";
import { ProductsData } from "@/lib/Products";
import FilterSidebar from "@/components/filters/filterSlidbar";
import { useFilter } from "@/Hooks/useFilter";

export default function ProductPageClient() {
  const {
    filteredProducts,
    filters,
    setFilter,
    clearFilters,
    sortOption,
    setSortOption,
  } = useFilter(ProductsData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex min-h-screen bg-white dark:bg-gray-900">
      <div className="hidden md:block w-96 flex-shrink-0 sticky top-24 bg-white dark:bg-gray-900">
        <FilterSidebar
          filters={filters}
          setFilter={setFilter}
          clearFilters={clearFilters}
          sortOption={sortOption}
          setSortOption={setSortOption}
          products={ProductsData}
        />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden absolute top-0 right-6 z-40">
        <button
          className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-900 dark:text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-10 flex justify-end"
          onClick={toggleMenu}
        >
          <div
            className="absolute top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 p-6 shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <FilterSidebar
              filters={filters}
              setFilter={setFilter}
              clearFilters={clearFilters}
              sortOption={sortOption}
              setSortOption={setSortOption}
              products={ProductsData}
            />
          </div>
        </div>
      )}

      <main className="flex-1 p-6 bg-white dark:bg-gray-900">
        <Suspense
          fallback={
            <div className="text-center text-lg">Loading products...</div>
          }
        >
          <ProductGrid products={filteredProducts} />
        </Suspense>
      </main>
    </div>
  );
}
