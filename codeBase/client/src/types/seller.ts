export interface SellerFormData {
  shopName: string;
  storeName?: string;
  commercialRegisterNumber: string;
  taxCardNumber: string;
  commercialRegisterImage: File | null;
  taxCardImage: File | null;
}

export interface ImageDropzoneProps {
  id: string;
  label: string;
  description?: string;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  error?: string;
}

export interface RegisterAsSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: SellerFormData) => void;
}

export interface SellerProduct {
  _id: string;
  productName: string;
  productDescription?: string;
  price: number;
  discount?: number;
  stock: number;
  category: string;
  imageUrl: string | string[];
  status?: "active" | "inactive" | string;
  createdAt?: string;
  sku?: string;
}

export interface SellerProductsResponse {
  success: boolean;
  message: string;
  data: SellerProduct[];
}

export interface TotalProductsData {
  totalProductCounts: number;
}

export interface TotalProductsResponse {
  success: boolean;
  message: string;
  data?: TotalProductsData;
}

export interface TotalOrdersData {
  totalOrders?: number;
  totalOrdersCount?: number;
  totalOrderCounts?: number;
}

export interface TotalOrdersResponse {
  success: boolean;
  message: string;
  data?: TotalOrdersData | number;
}

export interface TotalRevenueData {
  totalRevenue: number;
}

export interface TotalRevenueResponse {
  success: boolean;
  message: string;
  data?: TotalRevenueData;
}

export interface TotalInventoryValueData {
  totalInventoryValue: number;
}

export interface TotalInventoryValueResponse {
  success: boolean;
  message: string;
  data?: TotalInventoryValueData;
}


export interface TopSellingProductItem {
  _id?: string;
  productId?:
    | string
    | {
        _id?: string;
        id?: string | number;
        productName?: string;
        name?: string;
        price?: number;
        imageUrl?: string | string[];
        image?: string;
        category?: string;
        stock?: number;
      };
  productName?: string;
  name?: string;
  category?: string;
  price?: number;
  sales?: number;
  unitsSold?: number;
  totalSales?: number;
  count?: number;
  revenue: number;
  imageUrl?: string | string[];
  image?: string;
}

export interface TopSellingProductsResponse {
  success: boolean;
  message: string;
  data: TopSellingProductItem[];
}

export interface SellerOrderItem {
  product:
    | string
    | {
        _id?: string;
        productName?: string;
        name?: string;
        price?: number;
        imageUrl?: string | string[];
        category?: string;
      };
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface SellerOrderCustomer {
  _id?: string;
  FirstName?: string;
  LastName?: string;
  name?: string;
  email?: string;
}

export interface SellerOrder {
  _id: string;
  id?: string | number;
  orderNumber?: string;
  customer?: SellerOrderCustomer | string;
  customerName?: string;
  orderDate?: string | Date;
  orderStatus?: string;
  status?: string;
  subTotal?: number;
  discount?: number;
  shippingFee?: number;
  taxAmount?: number;
  totalAmount: number;
  paymentStatus?: string;
  paymentMethod?: {
    method: string;
    details?: string;
  };
  Address?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
  orderItems: SellerOrderItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SellerOrdersResponse {
  success: boolean;
  message: string;
  data: SellerOrder[];
}
