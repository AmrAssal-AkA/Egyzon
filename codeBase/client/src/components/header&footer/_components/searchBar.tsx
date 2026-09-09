"use client";

import React, { useState, useRef, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { IoIosSearch } from "react-icons/io";
import { FiX, FiArrowRight, FiLoader } from "react-icons/fi";

import { useDebounce } from "@/hooks/useDebounce";
import { useSearchProducts } from "@/hooks/useProduct";
import { useFilterStore } from "@/stores/buyer/filter";
import { Product } from "@/types/product.type";

const DEBOUNCE_DELAY = 300;
const MIN_QUERY_LENGTH = 2;

interface SearchBarComponentProps {
  isMobile?: boolean;
  onClose?: () => void;
  autoFocus?: boolean;
}

function SearchBarInner({
  isMobile = false,
  onClose,
  autoFocus = false,
}: SearchBarComponentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSearchQueryInStore = useFilterStore((state) => state.setSearchQuery);

  const [query, setQuery] = useState<string>(searchParams.get("q") || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const debouncedQuery = useDebounce(query.trim(), DEBOUNCE_DELAY);
  const shouldSearch = debouncedQuery.length >= MIN_QUERY_LENGTH;

  const searchParamsPayload = useMemo(
    () => (shouldSearch ? { q: debouncedQuery, limit: 6 } : null),
    [debouncedQuery, shouldSearch]
  );

  const { products, isLoading } = useSearchProducts(searchParamsPayload);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsOpen(false);
    setSearchQueryInStore(query.trim());
    if (onClose) onClose();
    router.push(`/products?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectProduct = (productId: string | number) => {
    setIsOpen(false);
    if (onClose) onClose();
    router.push(`/products/${productId}`);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${
        isMobile
          ? "w-full"
          : "hidden md:flex flex-1 max-w-md lg:max-w-lg items-center"
      }`}
    >
      <form onSubmit={handleSubmit} className="w-full relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          autoComplete="on"
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim().length >= MIN_QUERY_LENGTH) {
              setIsOpen(true);
            }
          }}
          placeholder={
            isMobile
              ? "Search products..."
              : "Search products, brands, categories..."
          }
          autoFocus={autoFocus}
          className="w-full pl-4 pr-20 py-2 rounded-full border border-input bg-muted/30 text-foreground placeholder:text-muted-foreground/70 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
        />

        <div className="absolute right-1 flex items-center gap-1">
          {isLoading && shouldSearch && (
            <FiLoader className="w-4 h-4 text-muted-foreground animate-spin mr-1" />
          )}

          {query.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="p-1 text-muted-foreground hover:text-foreground rounded-full transition-colors cursor-pointer"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            aria-label="Search"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center shadow-xs"
          >
            <IoIosSearch className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Live Suggestions Dropdown */}
      {isOpen && shouldSearch && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground border border-border rounded-2xl shadow-xl z-50 overflow-hidden backdrop-blur-md animate-in fade-in-50 zoom-in-95 duration-150">
          {isLoading ? (
            <div className="p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <FiLoader className="w-4 h-4 animate-spin text-blue-600" />
              <span>Searching for &quot;{debouncedQuery}&quot;...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="flex flex-col">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/40 border-b border-border/50">
                Products
              </div>
              <ul className="divide-y divide-border/50 max-h-72 overflow-y-auto">
                {products.map((product: Product) => {
                  const id = String(product._id || product.id || "");
                  const name = product.productName || product.name || "Product";
                  const price =
                    typeof product.price === "number"
                      ? product.price
                      : Number(product.price) || 0;
                  const discount =
                    typeof product.discount === "number"
                      ? product.discount
                      : typeof product.discountPercentage === "number"
                        ? product.discountPercentage
                        : Number(product.discount) || 0;
                  const finalPrice =
                    discount > 0 && discount < 100
                      ? price * (1 - discount / 100)
                      : price;

                  const rawImage =
                    product.imageUrl || product.image || product.thumbnail;
                  const imageSrc =
                    (Array.isArray(rawImage) ? rawImage[0] : rawImage) ||
                    "/images/placeholder.jpg";

                  const categoryName =
                    typeof product.category === "object" && product.category !== null
                      ? product.category.categoryName || product.category.name || ""
                      : typeof product.category === "string"
                        ? product.category
                        : "";

                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => handleSelectProduct(id)}
                        className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted/60 transition-colors text-left group cursor-pointer"
                      >
                        <div className="w-10 h-10 shrink-0 relative rounded-lg overflow-hidden bg-muted border border-border/50">
                          <Image
                            src={typeof imageSrc === "string" ? imageSrc : "/images/placeholder.jpg"}
                            alt={typeof name === "string" ? name : "Product image"}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate group-hover:text-blue-600 transition-colors">
                            {name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                              {finalPrice.toLocaleString()} EGP
                            </span>
                            {discount > 0 && (
                              <span className="text-[10px] text-muted-foreground line-through">
                                {price.toLocaleString()} EGP
                              </span>
                            )}
                            {categoryName && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground truncate max-w-24">
                                {String(categoryName)}
                              </span>
                            )}
                          </div>
                        </div>

                        <FiArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="p-2 bg-muted/20 border-t border-border/50">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-2 px-3 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View all results for &quot;{debouncedQuery}&quot;</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-muted-foreground">
              <p>No products found for &quot;{debouncedQuery}&quot;</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchBarComponent(props: SearchBarComponentProps) {
  return (
    <Suspense
      fallback={
        <div
          className={`relative ${
            props.isMobile
              ? "w-full"
              : "hidden md:flex flex-1 max-w-md lg:max-w-lg items-center"
          }`}
        >
          <div className="w-full h-9 rounded-full border border-input bg-muted/30 animate-pulse" />
        </div>
      }
    >
      <SearchBarInner {...props} />
    </Suspense>
  );
}

