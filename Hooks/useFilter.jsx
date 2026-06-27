"use client";
import { useState, useMemo } from "react";
import useFilterStore from "@/stores/buyer/filterStore";

const useFilter = (products) => {
  const filters = useFilterStore((state) => state.filters);
  const sortOption = useFilterStore((state) => state.sortOption);
  const setFilter = useFilterStore((state) => state.setFilter);
  const setSortOption = useFilterStore((state) => state.setSortOption);
  const clearFilters = useFilterStore((state) => state.clearFilters);


  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (filters.category !== "all") {
      filtered = filtered.filter(
        (product) => product.category === filters.category,
      );
    }

    // Filter by price range
    if (filters.minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= Number(filters.minPrice),
      );
    }
    if (filters.maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= Number(filters.maxPrice),
      );
    }

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    // Filter by seller
    if (filters.seller !== "all") {
      filtered = filtered.filter(
        (product) => product.seller === filters.seller,
      );
    }

    // Filter by availability
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "best-selling":
        filtered.sort((a, b) => b.sales - a.sales);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters, sortOption]);

  return {
    filteredProducts,
    filters,
    setFilter,
    clearFilters,
    sortOption,
    setSortOption,
  };
};

export default useFilter;

