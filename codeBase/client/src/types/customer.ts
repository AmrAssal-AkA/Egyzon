export interface CustomerOrderItem {
  _id?: string;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  status: string;
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
