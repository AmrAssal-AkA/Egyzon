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

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
  confirmNewPassword?: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  data?: string | null;
  error?: string;
}

export interface CustomerTotalSpendData {
  totalAmountSpent: number;
}

export interface CustomerTotalSpendResponse {
  success: boolean;
  message: string;
  data: CustomerTotalSpendData;
}

export interface CustomerTotalOrdersData {
  totalOrders: number;
}

export interface CustomerTotalOrdersResponse {
  success: boolean;
  message: string;
  data: CustomerTotalOrdersData;
}

export interface ChangeCustomerNamePayload {
  FirstName: string;
  LastName: string;
}

export interface ChangeCustomerNameResponse {
  success: boolean;
  message: string;
  data?: {
    FirstName: string;
    LastName: string;
  } | null;
  error?: string;
}

export type ChangeNamePayload = ChangeCustomerNamePayload;
export type ChangeNameResponse = ChangeCustomerNameResponse;

export interface DeleteCustomerPayload {
  email: string;
}

export interface DeleteCustomerResponse {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
}

export type DeleteCustomerAccountPayload = DeleteCustomerPayload;
export type DeleteCustomerAccountResponse = DeleteCustomerResponse;


