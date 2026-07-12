"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  useFilterStore,
  type AvailabilityFilter,
  type DiscountFilter,
} from "@/stores/seller/filter";

import FilterAccordion from "./FilterAccordion";

const DEFAULT_MAX_PRICE = 2000;

const fallbackCategories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "laptops",
  "smartphones",
];

const fallbackBrands = [
  "Apple",
  "Samsung",
  "Dior",
  "Gucci",
  "Essence",
  "Annibale Colombo",
  "Knoll",
];

const colors = [
  { name: "Black", className: "bg-gray-950" },
  { name: "White", className: "bg-white" },
  { name: "Blue", className: "bg-blue-500" },
  { name: "Green", className: "bg-green-500" },
  { name: "Red", className: "bg-red-500" },
  { name: "Yellow", className: "bg-yellow-400" },
  { name: "Purple", className: "bg-purple-500" },
];

const ratingOptions = [
  { label: "5★", value: 5 },
  { label: "4★ & Up", value: 4 },
  { label: "3★ & Up", value: 3 },
  { label: "2★ & Up", value: 2 },
];

const availabilityOptions: { label: string; value: AvailabilityFilter }[] = [
  { label: "In Stock", value: "inStock" },
  { label: "Out of Stock", value: "outOfStock" },
];

const discountOptions: { label: string; value: DiscountFilter }[] = [
  { label: "On Sale", value: "onSale" },
  { label: "Featured", value: "featured" },
  { label: "New Arrival", value: "newArrival" },
];

interface FilterfeatureProps {
  categories?: string[];
  brands?: string[];
  maxPrice?: number;
}

interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const formatLabel = (value: string) => (
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
);

function CheckboxOption({ label, checked, onChange }: CheckboxOptionProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-md px-1 py-2 text-sm text-foreground transition-colors duration-300 ease-in-out hover:text-blue-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-input text-blue-600 focus:ring-blue-500"
      />
      <span>{label}</span>
    </label>
  );
}

function FilterContent({
  categories,
  brands,
  maxPrice,
}: Required<FilterfeatureProps>) {
  const [brandQuery, setBrandQuery] = useState("");
  const selectedCategories = useFilterStore((state) => state.category);
  const selectedBrands = useFilterStore((state) => state.brand);
  const minPrice = useFilterStore((state) => state.minPrice);
  const selectedMaxPrice = useFilterStore((state) => state.maxPrice);
  const selectedRating = useFilterStore((state) => state.rating);
  const availability = useFilterStore((state) => state.availability);
  const discount = useFilterStore((state) => state.discount);
  const selectedColors = useFilterStore((state) => state.color);
  const setCategory = useFilterStore((state) => state.setCategory);
  const setBrand = useFilterStore((state) => state.setBrand);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);
  const setRating = useFilterStore((state) => state.setRating);
  const setAvailability = useFilterStore((state) => state.setAvailability);
  const setDiscount = useFilterStore((state) => state.setDiscount);
  const setColor = useFilterStore((state) => state.setColor);

  const filteredBrands = useMemo(
    () => brands.filter((brand) => brand.toLowerCase().includes(brandQuery.toLowerCase())),
    [brandQuery, brands]
  );
  const liveMaxPrice = selectedMaxPrice > 0 ? selectedMaxPrice : maxPrice;

  return (
    <div className="space-y-0">
      <FilterAccordion title="Category">
        <div className="space-y-1">
          {categories.map((category) => (
            <CheckboxOption
              key={category}
              label={formatLabel(category)}
              checked={selectedCategories.includes(category)}
              onChange={() => setCategory(category)}
            />
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion title="Brand">
        <div className="space-y-3">
          <label className="relative block">
            <span className="sr-only">Search brands</span>
            <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={brandQuery}
              onChange={(event) => setBrandQuery(event.target.value)}
              placeholder="Search brand"
              className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors duration-300 ease-in-out placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </label>
          <div className="max-h-44 space-y-1 overflow-y-auto pr-1">
            {filteredBrands.map((brand) => (
              <CheckboxOption
                key={brand}
                label={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => setBrand(brand)}
              />
            ))}
            {filteredBrands.length === 0 && (
              <p className="px-1 py-2 text-sm text-muted-foreground">No brands found.</p>
            )}
          </div>
        </div>
      </FilterAccordion>

      <FilterAccordion title="Price">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1 text-xs font-semibold text-muted-foreground">
              <span>Min</span>
              <input
                type="number"
                min={0}
                max={liveMaxPrice}
                value={minPrice}
                onChange={(event) => setPriceRange(Math.min(Number(event.target.value), liveMaxPrice), liveMaxPrice)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal text-foreground outline-none transition-colors duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
            <label className="space-y-1 text-xs font-semibold text-muted-foreground">
              <span>Max</span>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={liveMaxPrice}
                onChange={(event) => setPriceRange(minPrice, Math.max(Number(event.target.value), minPrice))}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal text-foreground outline-none transition-colors duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={minPrice}
              aria-label="Minimum price"
              onChange={(event) => setPriceRange(Math.min(Number(event.target.value), liveMaxPrice), liveMaxPrice)}
              className="w-full accent-blue-600"
            />
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={liveMaxPrice}
              aria-label="Maximum price"
              onChange={(event) => setPriceRange(minPrice, Math.max(Number(event.target.value), minPrice))}
              className="w-full accent-blue-600"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${minPrice}</span>
            <span>${liveMaxPrice}</span>
          </div>
        </div>
      </FilterAccordion>

      <FilterAccordion title="Rating">
        <div className="space-y-1">
          {ratingOptions.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-md px-1 py-2 text-sm text-foreground transition-colors duration-300 ease-in-out hover:text-blue-600">
              <input
                type="radio"
                name="rating-filter"
                checked={selectedRating === option.value}
                onChange={() => setRating(selectedRating === option.value ? null : option.value)}
                className="h-4 w-4 border-input text-blue-600 focus:ring-blue-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion title="Availability">
        <div className="space-y-1">
          {availabilityOptions.map((option) => (
            <CheckboxOption
              key={option.value}
              label={option.label}
              checked={availability.includes(option.value)}
              onChange={() => setAvailability(option.value)}
            />
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion title="Discount">
        <div className="space-y-1">
          {discountOptions.map((option) => (
            <CheckboxOption
              key={option.value}
              label={option.label}
              checked={discount.includes(option.value)}
              onChange={() => setDiscount(option.value)}
            />
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion title="Color">
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color.name);

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => setColor(color.name)}
                className={cn(
                  "h-9 w-9 rounded-full border border-border shadow-sm transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  color.className,
                  color.name === "White" && "border-muted-foreground",
                  isSelected && "ring-2 ring-blue-600 ring-offset-2 ring-offset-background"
                )}
                aria-pressed={isSelected}
                aria-label={`Filter by ${color.name}`}
              />
            );
          })}
        </div>
      </FilterAccordion>
    </div>
  );
}

function Filterfeature({
  categories = fallbackCategories,
  brands = fallbackBrands,
  maxPrice = DEFAULT_MAX_PRICE,
}: FilterfeatureProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const uniqueCategories = useMemo(() => Array.from(new Set(categories)).sort(), [categories]);
  const uniqueBrands = useMemo(() => Array.from(new Set(brands)).filter(Boolean).sort(), [brands]);
  const resolvedMaxPrice = Math.max(maxPrice, DEFAULT_MAX_PRICE);

  useEffect(() => {
    if (!isDrawerOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen]);

  const contentProps = {
    categories: uniqueCategories,
    brands: uniqueBrands,
    maxPrice: resolvedMaxPrice,
  };

  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
          Filter
        </button>
      </div>

      <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-md lg:block">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <Filter aria-hidden="true" className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-card-foreground">Filters</h2>
        </div>
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto px-5">
          <FilterContent {...contentProps} />
        </div>
      </aside>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-title"
        >
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="absolute bottom-0 right-0 top-0 flex w-full max-w-sm flex-col bg-card text-card-foreground shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <Filter aria-hidden="true" className="h-5 w-5 text-blue-600" />
                <h2 id="mobile-filter-title" className="text-lg font-semibold text-card-foreground">
                  Filters
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="rounded-md p-2 text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Close filters"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">
              <FilterContent {...contentProps} />
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-border p-5">
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-300 ease-in-out hover:border-blue-500 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Filterfeature);
