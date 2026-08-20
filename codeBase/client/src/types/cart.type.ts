export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface CreateCartRequest {
  items: CartItem[];
}



export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  phone: string;
}

export type PaymentMethodType = "cashOnDelivery" | "creditCard";

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}

export interface OrderItem {
  id: string;
  image: string;
  name: string;
  variant?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
}

export interface DeliveryOption {
  method: string;
  estimatedDelivery: string;
  trackingAvailable: boolean;
}

export interface PaymentMethod {
  type: string;
  provider: string;
  last4: string;
  status: "Paid" | "Pending" | string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  governorate: string;
  postalCode: string;
  country: string;
}

export interface ConfirmationBannerProps {
  orderNumber: string;
  orderStatus: "Confirmed" | string;
  orderDate: string;
}

export interface OrderReviewProps {
  orderItems: OrderItem[];
  summary: OrderSummary;
}

export interface DeliveryOptionsProps {
  delivery: DeliveryOption;
}

export interface PaymentMethodsProps {
  payment: PaymentMethod;
}

export interface AddressSectionProps {
  address: Address;
  onChooseAddress?: () => void;
  onAddAddress?: () => void;
}

export interface ActionBarProps {
  onBackHome(): void;
  onPrintReceipt(): void;
  onDownloadInvoice(): void;
  onFinalizeConfirmation(): void;
}

export interface CheckoutConfirmationProps {
  orderNumber?: string;
  orderStatus?: "Confirmed" | string;
  orderDate?: string;
  orderItems?: OrderItem[];
  summary?: OrderSummary;
  delivery?: DeliveryOption;
  payment?: PaymentMethod;
  address?: Address;
  onChooseAddress?: () => void;
  onAddAddress?: () => void;
  onBackHome?: () => void;
  onPrintReceipt?: () => void;
  onDownloadInvoice?: () => void;
  onFinalizeConfirmation?: () => void;
}