import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { persist } from 'zustand/middleware';
import { addWishlist, removeWishlist, getWishlist } from '@/services/wishlistService';

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
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
        const image = item.image || (item as any).thumbnail || "/images/placeholder.jpg";
        const normalizedItem: WishlistItem = {
          id: item.id,
          title: item.title,
          price: item.price,
          image,
        };
        set({ items: [...currentItems, normalizedItem] });
        
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
      clearWishlist: async () => {
        const currentItems = get().items;
        set({ items: [] });
        if (currentItems.length > 0) {
          try {
            await Promise.allSettled(
              currentItems.map((item) => removeWishlist(item.id))
            );
          } catch (error) {
            console.error("Failed to clear wishlist on server:", error);
          }
        }
      },
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
          if (response?.success && response?.data) {
            let rawItems: any[] = [];
            const data = response.data;
            if (Array.isArray(data)) {
              rawItems = data;
            } else if (Array.isArray(data.productId)) {
              rawItems = data.productId;
            } else if (Array.isArray(data.items)) {
              rawItems = data.items;
            } else if (data.data) {
              if (Array.isArray(data.data)) {
                rawItems = data.data;
              } else if (Array.isArray(data.data.productId)) {
                rawItems = data.data.productId;
              } else if (Array.isArray(data.data.items)) {
                rawItems = data.data.items;
              }
            }

            const items: WishlistItem[] = rawItems
              .map((p: any) => {
                if (!p) return null;
                const id = p._id || p.id || p.productId || (typeof p === "string" ? p : "");
                if (!id) return null;
                const title = p.productName || p.title || p.name || "Product";
                const price = typeof p.price === "number" ? p.price : Number(p.price) || 0;
                const image = Array.isArray(p.imageUrl)
                  ? p.imageUrl[0]
                  : p.imageUrl || p.image || p.thumbnail || "/images/placeholder.jpg";
                return { id: String(id), title, price, image };
              })
              .filter(Boolean) as WishlistItem[];

            set({ items });
          } else if (response?.success && !response?.data) {
            set({ items: [] });
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