export interface CustomerProductItem {
  _id?: string;
  productName: string;
  sku?: string;
  price?: number;
  imageUrl?: string;
}

export interface CustomerOrderItemDetail {
  _id?: string;
  product: CustomerProductItem;
  quantity: number;
  price: number;
}

export interface CustomerOrderPayment {
  method?: string;
  status?: string;
  type?: string;
  provider?: string;
  last4?: string;
}

export interface CustomerOrderItem {
  _id?: string;
  orderNumber: string;
  orderStatus: string;
  orderDate: string;
  totalAmount: number;
  subTotal?: number;
  discount?: number;
  shipping?: number;
  tax?: number;
  payment?: CustomerOrderPayment;
  orderItems: CustomerOrderItemDetail[];
}

export interface CustomerOrderHistoryData {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  phoneNumber?: string;
  address?: string[];
  orders: CustomerOrderItem[];
  wishlist?: string[];
}

export interface CustomerOrderHistoryResponse {
  success: boolean;
  message: string;
  data: CustomerOrderHistoryData;
}
