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



