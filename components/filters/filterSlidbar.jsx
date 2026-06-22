"use client";
import React from "react";
import { categories } from "@/lib/Products";

const FilterSidebar = ({
  filters,
  setFilter,
  clearFilters,
  sortOption,
  setSortOption,
  products,
}) => {
  const sellers = [...new Set(products.map((p) => p.seller))];

  return (
    <aside className="w-full md:w-96 p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg space-y-6 md:mt-0 mt-30">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Filters
        </h2>
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Sort By
        </h3>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="best-selling">Best Selling</option>
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Category
        </h3>
        <select
          value={filters.category}
          onChange={(e) => setFilter("category", e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Price Range
        </h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilter("minPrice", e.target.value)}
            className="w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
          <span className="text-gray-500 dark:text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilter("maxPrice", e.target.value)}
            className="w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Rating
        </h3>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={filters.rating}
          onChange={(e) => setFilter("rating", Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="text-center text-gray-600 dark:text-gray-300 font-medium">
          {filters.rating.toFixed(1)}+ Stars
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Seller
        </h3>
        <select
          value={filters.seller}
          onChange={(e) => setFilter("seller", e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="all">All Sellers</option>
          {sellers.map((seller) => (
            <option key={seller} value={seller}>
              {seller}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-4">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            In Stock Only
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => setFilter("inStock", e.target.checked)}
              className="sr-only"
            />
            <div className="block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${filters.inStock ? "transform translate-x-6 bg-yellow-500" : ""}`}
            ></div>
          </div>
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
