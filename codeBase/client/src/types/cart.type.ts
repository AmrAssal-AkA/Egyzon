export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface CreateCartRequest {
  items: CartItem[];
}
