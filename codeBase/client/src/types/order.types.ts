export type PaymentMethodType = "cashOnDelivery" | "creditCard";

export interface OrderAddressPayload {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface BillingDataPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  apartment?: string;
  floor?: string;
  street?: string;
  building?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface PlaceOrderRequest {
  Address: OrderAddressPayload;
  billingData: BillingDataPayload;
  phoneNumber: string;
  shippingAddress?: string;
  paymentMethod?: PaymentMethodType;
  notes?: string;
}

export interface IOrderItemResponse {
  product: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface IOrderResponse {
  _id?: string;
  orderNumber?: string;
  customer?: string;
  orderDate?: string;
  orderStatus?: string;
  subTotal?: number;
  discount?: number;
  shippingFee?: number;
  taxAmount?: number;
  totalAmount?: number;
  paymentStatus?: string;
  paymentMethod?: {
    method: PaymentMethodType;
    details?: string;
  };
  paymentUrl?: string;
  notes?: string;
  orderItems?: IOrderItemResponse[];
  address?: OrderAddressPayload;
  billingData?: BillingDataPayload;
  phoneNumber?: string;
  details?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PlaceOrderApiResponse {
  success: boolean;
  message: string;
  data: ({
    order?: IOrderResponse;
    paymentUrl?: string;
  } & IOrderResponse) | null;
}
