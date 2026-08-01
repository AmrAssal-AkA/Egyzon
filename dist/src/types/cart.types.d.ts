export type CartItem = {
    productId: string;
    quantity: number;
    price: number;
    name: string;
};
export interface Cart {
    cartId: string;
    userId: string;
    items: CartItem[];
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=cart.types.d.ts.map