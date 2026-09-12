"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useFilterStore } from "@/stores/buyer/filter";

import ActiveFilters from "./filters/ActiveFilters";
import Filterfeature from "./filters/Filter";
import ProductGrid from "./Product-grid";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Product } from "@/types/product.type";
import { useAllProducts } from "@/hooks/useProduct";
import { useCategories } from "@/hooks/useCategory";
import ProductsLoading from "@/app/(store)/products/loading";

function ShopProductsClient({
  products: initialProducts,
}: { products?: Product[] } = {}) {
  const searchParams = useSearchParams();
  const { products: fetchedProducts, isLoading, error } = useAllProducts();
  const { categories: allCategories } = useCategories();

  const categoryIdToName = useMemo(() => {
    const map = new Map<string, string>();
    (allCategories || []).forEach((c) => {
      const name = c.categoryName || c.categroyName || c.name || "";
      if (name) {
        if (c._id) map.set(c._id, name);
        if (c.id) map.set(c.id, name);
      }
    });
    return map;
  }, [allCategories]);

  const searchQuery = useFilterStore((state) => state.searchQuery);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const rating = useFilterStore((state) => state.rating);
  const availability = useFilterStore((state) => state.availability);
  const discount = useFilterStore((state) => state.discount);
  const color = useFilterStore((state) => state.color);
  const selectedCategories = useFilterStore((state) => state.category);
  const selectedBrands = useFilterStore((state) => state.brand);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams, searchQuery, setSearchQuery]);

  const products = useMemo(
    () =>
      (initialProducts && initialProducts.length > 0
        ? initialProducts
        : fetchedProducts) || [],
    [initialProducts, fetchedProducts],
  );

  const highestPrice = useMemo(
    () =>
      Math.ceil(
        Math.max(
          ...(products.length > 0
            ? products.map((product) => product.price)
            : [0]),
          0,
        ),
      ),
    [products],
  );

  // Derive unique categories and brands from fetched products
  const derivedCategories = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((p) => {
              if (typeof p.category === "object" && p.category !== null) {
                return (
                  p.category.categoryName ||
                  p.category.categroyName ||
                  p.category.name ||
                  ""
                );
              }
              if (typeof p.category === "string" && p.category) {
                return categoryIdToName.get(p.category) || p.category;
              }
              return "";
            })
            .filter(Boolean) as string[],
        ),
      ).sort(),
    [products, categoryIdToName],
  );

  const derivedBrands = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.brand).filter(Boolean) as string[]),
      ).sort(),
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = searchQuery
          ? (product.productName || product.name || "")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : true;

        const matchesMinPrice = minPrice > 0 ? product.price >= minPrice : true;
        const matchesMaxPrice = maxPrice > 0 ? product.price <= maxPrice : true;

        const matchesRating = rating
          ? (product.AvgRating ?? 0) >= rating
          : true;

        const matchesAvailability =
          availability.length > 0
            ? availability.some((value) => {
                const stock =
                  typeof product.stock === "number" ? product.stock : 0;
                const status =
                  typeof product.status === "string"
                    ? product.status.toLowerCase().trim()
                    : "active";
                const isProductInStock =
                  stock > 0 &&
                  status !== "out_of_stock" &&
                  status !== "inactive";
                return value === "inStock"
                  ? isProductInStock
                  : !isProductInStock;
              })
            : true;

        const matchesDiscount =
          discount.length > 0
            ? discount.some((value) => {
                if (value === "onSale") return (product.discount ?? 0) > 0;
                if (value === "featured")
                  return (product.AvgRating ?? 0) >= 4.5;
                // "newArrival" — products created in the last 30 days
                if (value === "newArrival") {
                  const createdAt = product.createdAt
                    ? new Date(product.createdAt).getTime()
                    : 0;
                  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
                  return createdAt >= thirtyDaysAgo;
                }
                return false;
              })
            : true;

        let prodCategoryName = "";
        let prodCategoryId = "";
        if (typeof product.category === "object" && product.category !== null) {
          prodCategoryName =
            product.category.categoryName ||
            product.category.categroyName ||
            product.category.name ||
            "";
          prodCategoryId =
            product.category._id ||
            product.category.id ||
            "";
        } else if (typeof product.category === "string" && product.category) {
          prodCategoryId = product.category;
          prodCategoryName =
            categoryIdToName.get(product.category) || product.category;
        }

        const matchesCategory =
          selectedCategories.length > 0
            ? selectedCategories.some((selected) => {
                const selLower = selected.toLowerCase();
                return (
                  (prodCategoryName && selLower === prodCategoryName.toLowerCase()) ||
                  (prodCategoryId && selLower === prodCategoryId.toLowerCase()) ||
                  (categoryIdToName.get(selected)?.toLowerCase() === prodCategoryName.toLowerCase())
                );
              })
            : true;

        const matchesBrand =
          selectedBrands.length > 0
            ? product.brand
              ? selectedBrands.includes(product.brand)
              : false
            : true;

        // Color filter — product data does not carry a color field; skip filtering
        const matchesColor = color.length > 0 ? true : true;

        return (
          matchesSearch &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesRating &&
          matchesAvailability &&
          matchesDiscount &&
          matchesCategory &&
          matchesBrand &&
          matchesColor
        );
      }),
    [
      availability,
      categoryIdToName,
      color,
      discount,
      maxPrice,
      minPrice,
      products,
      rating,
      searchQuery,
      selectedCategories,
      selectedBrands,
    ],
  );

  const PRODUCTS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLElement>(null);

  const filterKey = `${searchQuery}|${minPrice}|${maxPrice}|${rating}|${availability.join(",")}|${discount.join(",")}|${color.join(",")}|${selectedCategories.join(",")}|${selectedBrands.join(",")}|${products.length}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  if (isLoading && (!initialProducts || initialProducts.length === 0)) {
    return <ProductsLoading />;
  }

  if (error && (!initialProducts || initialProducts.length === 0)) {
    return (
      <div className="w-full rounded-lg border border-border bg-card p-8 text-center shadow-md">
        <p className="text-destructive font-semibold">
          Failed to load products.
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Please try refreshing the page.
        </p>
      </div>
    );
  }

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridRef.current) {
      const yOffset = -100;
      const y =
        gridRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <Filterfeature
        maxPrice={highestPrice}
        categories={derivedCategories}
        brands={derivedBrands}
      />
      <section aria-label="Product results" className="min-w-0" ref={gridRef}>
        <ActiveFilters />
        {filteredProducts.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center shadow-md">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <ProductGrid products={paginatedProducts} />
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={page === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    },
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          handlePageChange(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default ShopProductsClient;
