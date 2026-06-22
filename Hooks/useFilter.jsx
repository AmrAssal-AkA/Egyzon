"use client";
import { useState, useMemo } from "react";

export const useFilter = (products) => {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: "",
    maxPrice: "",
    rating: 0,
    seller: "all",
    inStock: false,
  });
  const [sortOption, setSortOption] = useState("newest");

  const setFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      minPrice: "",
      maxPrice: "",
      rating: 0,
      seller: "all",
      inStock: false,
    });
    setSortOption("newest");
  };

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
