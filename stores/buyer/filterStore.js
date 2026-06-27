import {create} from "zustand";


const useFilterStore = create((set) => ({
    filteredProducts: [],
    filters:{
    category: "all",
      minPrice: "",
      maxPrice: "",
      rating: 0,
      seller: "all",
      inStock: false,
    },
    sortOption: "newest",
    setFilter: (filterName, value) =>
        set((state) => ({
            filters: {
                ...state.filters,
                [filterName]: value,
            },
        })),
        setSortOption: (value) => set({sortOption: value}),

    clearFilters: () =>
      set({
        filters: {
          category: "all",
          minPrice: "",
          maxPrice: "",
          rating: 0,
          seller: "all",
          inStock: false,
        },
        sortOption: "newest",
      }),
}));


export default useFilterStore;