export type PaymentMethodType = "cashOnDelivery" | "creditCard";

export interface OrderAddressPayload {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PlaceOrderRequest {
  shippingAddress: string;
  paymentMethod: PaymentMethodType;
  notes?: string;
  Address: OrderAddressPayload;
  phoneNumber?: string;
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
  orderDate: string;
  orderStatus: string;
  subTotal: number;
  discount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: {
    method: PaymentMethodType;
    details?: string;
  };
  notes?: string;
  orderItems: IOrderItemResponse[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PlaceOrderApiResponse {
  success: boolean;
  message: string;
  data: IOrderResponse;
}
