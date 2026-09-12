import {create} from 'zustand'

export type AvailabilityFilter = 'inStock' | 'outOfStock';
export type DiscountFilter = 'onSale' | 'featured' | 'newArrival';

interface FilterStore {
    searchQuery: string;
    category: string[]; // Selected category names
    brand: string[];
    maxPrice: number;
    minPrice: number;
    rating: number | null;
    availability: AvailabilityFilter[];
    discount: DiscountFilter[];
    color: string[];
    setSearchQuery: (query: string) => void;
    setCategory: (category: string) => void;
    setBrand: (brand: string) => void;
    setPriceRange: (min:number, max:number) => void;
    setRating: (rating: number | null) => void;
    setAvailability: (availability: AvailabilityFilter) => void;
    setDiscount: (discount: DiscountFilter) => void;
    setColor: (color: string) => void;
    removeFilter: (group: keyof Pick<FilterStore, 'category' | 'brand' | 'availability' | 'discount' | 'color'>, value: string) => void;
    resetFilters: () => void;
}

const initialFilters={
    searchQuery: '',
    category: [],
    brand: [],
    maxPrice: 0,
    minPrice: 0,
    rating: null,
    availability: [],
    discount: [],
    color: [],
}

const toggleValue = <T extends string>(values: T[], value: T) => (
    values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value]
);

export const useFilterStore = create<FilterStore>((set) => ({
    ...initialFilters,
    setSearchQuery: (query) => set({searchQuery: query}),
    setCategory: (category) => set((state) => ({category: toggleValue(state.category, category)})),
    setBrand: (brand) => set((state) => ({brand: toggleValue(state.brand, brand)})),
    setPriceRange: (min, max) => set({minPrice: min, maxPrice: max}),
    setRating: (rating) => set({rating}),
    setAvailability: (availability) => set((state) => ({availability: toggleValue(state.availability, availability)})),
    setDiscount: (discount) => set((state) => ({discount: toggleValue(state.discount, discount)})),
    setColor: (color) => set((state) => ({color: toggleValue(state.color, color)})),
    removeFilter: (group, value) => set((state) => ({
        [group]: state[group].filter((item) => item !== value),
    })),
    resetFilters: () => set(initialFilters),
}));
