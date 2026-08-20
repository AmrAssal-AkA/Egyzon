import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import { createCart, emptyCart, getCart } from '@/services/cartService';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    quantity: number;
}

export interface LastOrder {
    orderNumber: string;
    orderDate: string;
    orderItems: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
    orderStatus: "Confirmed" | string;
    delivery?: {
        method: string;
        estimatedDelivery: string;
        trackingAvailable: boolean;
    };
    payment?: {
        type: string;
        provider: string;
        last4: string;
        status: "Paid" | "Pending" | string;
    };
    summary?: {
        subtotal: number;
        shipping: number;
        tax: number;
        discount: number;
        total: number;
        currency: string;
    };
    address?: {
        id?: string;
        fullName?: string;
        phone?: string;
        street?: string;
        city?: string;
        governorate?: string;
        postalCode?: string;
        country?: string;
    };
}

interface CartState {
    cartItems: CartItem[];
    totalPrice: number;
    lastOrder: LastOrder | null;
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    updateTotalPrice: () => void;
    confirmOrder: () => void;
    setLastOrder: (order: LastOrder | null) => void;
    syncCartWithServer: () => Promise<void>;
    fetchCartFromServer: () => Promise<void>;
    clearLocalCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartItems: [],
            totalPrice: 0,
            lastOrder: null,
            setLastOrder: (order: LastOrder | null) => set({ lastOrder: order }),
            syncCartWithServer: async () => {
                try {
                    const cartItems = get().cartItems;
                    const items = cartItems.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                        name: item.title,
                    }));
                    await emptyCart();
                    if (items.length > 0) {
                        await createCart({ items });
                    }
                } catch (error) {
                    console.error("Failed to sync cart with server:", error);
                }
            },
            fetchCartFromServer: async () => {
                try {
                    const response = await getCart();
                    const serverItems = response?.data?.items;
                    if (response?.success && Array.isArray(serverItems)) {
                        const items = serverItems.map((item: any) => ({
                            id: item.productId,
                            title: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            description: "",
                            thumbnail: "",
                        }));
                        set({ cartItems: items });
                        get().updateTotalPrice();
                    }
                } catch (error) {
                    console.error("Failed to fetch cart from server:", error);
                }
            },
            clearLocalCart: () => {
                set({ cartItems: [] });
                get().updateTotalPrice();
            },
            addToCart: (item: Omit<CartItem, 'quantity'>) => {
                const existingItem = get().cartItems.find((i) => i.id === item.id);
                if (existingItem) {
                    set({
                        cartItems: get().cartItems.map((i) =>
                            i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                        ),
                    });
                } else {
                    set({cartItems: [...get().cartItems, {...item, quantity: 1}]});
                }
                get().updateTotalPrice();
                get().syncCartWithServer();
            },
            removeFromCart: (id: string) => {
                set({cartItems: get().cartItems.filter((item) => item.id !== id)});
                get().updateTotalPrice();
                get().syncCartWithServer();
            },
            clearCart: () => {
                set({cartItems: []});
                get().updateTotalPrice();
                get().syncCartWithServer();
            },
            updateTotalPrice: () => {
                const total = get().cartItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
                set({totalPrice: total});
            },
            updateQuantity: (id: string, quantity: number) => {
                set({
                    cartItems: get().cartItems.map((item) =>
                        item.id === id ? {...item, quantity} : item
                    ),
                });
                get().updateTotalPrice();
                get().syncCartWithServer();
            },
            confirmOrder: () => {
                const items = get().cartItems;
                const subPrice = get().totalPrice;
                const shipping = subPrice > 0 ? 50 : 0;
                const tax = Math.round(subPrice * 0.14);
                const discount = 0;
                const total = subPrice + shipping + tax - discount;
                
                const orderDate = new Date().toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
                const orderNumber = `EGY-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

                set({
                  lastOrder: {
                    orderNumber,
                    orderDate,
                    orderItems: items,
                    subtotal: subPrice,
                    shipping,
                    tax,
                    discount,
                    total,
                    orderStatus: "Confirmed"
                  },
                  cartItems: [],
                  totalPrice: 0,
                });
            },
        })
        , {
            name: 'cart-storage',
        }
    )
);