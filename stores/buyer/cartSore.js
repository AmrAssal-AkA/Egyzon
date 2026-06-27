import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (product, quantityToAdd = 1) => {
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.id === product.id,
          );

          if (existingItemIndex > -1) {
            const updatedCartItems = state.cartItems.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantityToAdd }
                : item,
            );
            return { cartItems: updatedCartItems };
          } else {
            return {
              cartItems: [
                ...state.cartItems,
                { ...product, quantity: quantityToAdd },
              ],
            };
          }
        });
      },
      removeFromCart: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", 
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
