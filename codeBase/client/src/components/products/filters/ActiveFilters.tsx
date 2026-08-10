"use client";

import { memo, useMemo } from "react";
import { X } from "lucide-react";

import {
  useFilterStore,
  type DiscountFilter,
  type AvailabilityFilter,
} from "@/stores/buyer/filter";

const availabilityLabels: Record<AvailabilityFilter, string> = {
  inStock: "In Stock",
  outOfStock: "Out of Stock",
};

const discountLabels: Record<DiscountFilter, string> = {
  onSale: "On Sale",
  featured: "Featured",
  newArrival: "New Arrival",
};

interface FilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

function ActiveFilters() {
  const category = useFilterStore((state) => state.category);
  const brand = useFilterStore((state) => state.brand);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const rating = useFilterStore((state) => state.rating);
  const availability = useFilterStore((state) => state.availability);
  const discount = useFilterStore((state) => state.discount);
  const color = useFilterStore((state) => state.color);
  const removeFilter = useFilterStore((state) => state.removeFilter);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);
  const setRating = useFilterStore((state) => state.setRating);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const chips = useMemo<FilterChip[]>(() => {
    const activeChips: FilterChip[] = [
      ...category.map((value) => ({
        key: `category-${value}`,
        label: value,
        onRemove: () => removeFilter("category", value),
      })),
      ...brand.map((value) => ({
        key: `brand-${value}`,
        label: value,
        onRemove: () => removeFilter("brand", value),
      })),
      ...availability.map((value) => ({
        key: `availability-${value}`,
        label: availabilityLabels[value],
        onRemove: () => removeFilter("availability", value),
      })),
      ...discount.map((value) => ({
        key: `discount-${value}`,
        label: discountLabels[value],
        onRemove: () => removeFilter("discount", value),
      })),
      ...color.map((value) => ({
        key: `color-${value}`,
        label: value,
        onRemove: () => removeFilter("color", value),
      })),
    ];

    if (minPrice > 0 || maxPrice > 0) {
      activeChips.push({
        key: "price",
        label: `$${minPrice} - $${maxPrice}`,
        onRemove: () => setPriceRange(0, 0),
      });
    }

    if (rating) {
      activeChips.push({
        key: "rating",
        label: rating === 5 ? "5 Stars" : `${rating} Stars & Up`,
        onRemove: () => setRating(null),
      });
    }

    return activeChips;
  }, [
    availability,
    brand,
    category,
    color,
    discount,
    maxPrice,
    minPrice,
    rating,
    removeFilter,
    setPriceRange,
    setRating,
  ]);

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-card-foreground shadow-sm transition-colors duration-300 ease-in-out hover:border-blue-500 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`Remove ${chip.label} filter`}
        >
          <span>{chip.label}</span>
          <X aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      ))}
      <button
        type="button"
        onClick={resetFilters}
        className="text-sm font-semibold text-blue-600 transition-colors duration-300 ease-in-out hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Clear All
      </button>
    </div>
  );
}

export default memo(ActiveFilters);
