import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { persist } from 'zustand/middleware';
import { addWishlist, removeWishlist, getWishlist } from '@/services/wishlistService';

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  clearItems: () => void;
  containsItem: (id: string) => boolean;
  isItemInWishlist: (id: string) => boolean;
  loadWishlist: () => void;
  fetchWishlistFromServer: () => Promise<void>;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: async (item) => {
        const currentItems = get().items;
        if (currentItems.some((i) => i.id === item.id)) {
          return;
        }
        set({ items: [...currentItems, item] });
        
        try {
          await addWishlist(item.id);
        } catch (error) {
          console.error("Failed to add to server wishlist:", error);
        }
      },
      removeItem: async (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });

        try {
          await removeWishlist(id);
        } catch (error) {
          console.error("Failed to remove from server wishlist:", error);
        }
      },
      clearWishlist: () => set({ items: [] }),
      clearItems: () => set({ items: [] }),
      containsItem: (id) => get().items.some((item) => item.id === id),
      isItemInWishlist: (id) => get().items.some((item) => item.id === id),
      loadWishlist: () => {
        try {
          useWishlistStore.persist.rehydrate();
        } catch (e) {
          console.error("Failed to rehydrate wishlist store from localStorage:", e);
        }
      },
      fetchWishlistFromServer: async () => {
        try {
          const response = await getWishlist();
          if (response.success && response.data) {
            const items = Array.isArray(response.data) ? response.data : response.data.items || [];
            set({ items });
          }
        } catch (error) {
          console.error("Failed to fetch wishlist from server:", error);
        }
      },
    }),
    {
      name: 'wishlist-storage',
      skipHydration: true,
    }
  )
);


export const useWishlistCount = () => useWishlistStore((state) => state.items.length);
export const useTopThreeItems = () =>
  useWishlistStore(useShallow((state) => state.items.slice(-3).reverse()));
export const useIsWishlistEmpty = () => useWishlistStore((state) => state.items.length === 0);