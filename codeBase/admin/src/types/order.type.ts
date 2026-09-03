

export type orderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ApiOrderCustomer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApiOrderProduct {
  _id: string;
  productName: string;
  imageUrl: string;
  category: string;
}

export interface ApiOrderSeller {
  _id: string;
  storeName: string;
  email: string;
}

export interface ApiOrderItem {
  _id: string;
  product?: ApiOrderProduct;
  seller?: ApiOrderSeller;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface ApiPaymentMethod {
  method: string;
}

export interface ApiShippingAddress {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ApiOrder {
  _id: string;
  orderNumber: string | number;
  customer?: ApiOrderCustomer;
  orderDate?: string;
  orderStatus: orderStatus;
  subTotal?: number;
  discount?: number;
  shippingFee?: number;
  taxAmount?: number;
  totalAmount: number;
  paymentStatus?: string;
  payment?: string;
  paymentMethod?: ApiPaymentMethod;
  shippingAddress?: ApiShippingAddress;
  notes?: string;
  orderItems: ApiOrderItem[];
}

export interface OrdersPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiOrdersResponseData {
  orders: ApiOrder[];
  pagination?: OrdersPagination;
  total?: number;
  totalOrders?: number;
  totalPages?: number;
}

export interface Order {
  id: string | number;
  orderNumber: string | number;
  productName: string;
  FirstName: string;
  LastName: string;
  email: string;
  orderStatus: orderStatus;
  totalAmount: number;
  seller: string;
  storeName: string;
  imageUrl: string;
  category: string;
  orderDate?: string;
  raw?: ApiOrder;
}