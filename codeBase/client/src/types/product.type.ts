export interface Product {
  _id?: string;
  id?: string;
  productName?: string;
  name?: string;
  productDescription?: string;
  description?: string;
  price: number;
  discount?: number;
  discountPercentage?: number;
  stock: number;
  maxStock?: number;
  sku?: string;
  AvgRating?: number;
  rating?: number;
  status?:
    | "active"
    | "inactive"
    | "low_stock"
    | "out_of_stock"
    | "Active"
    | "Inactive"
    | "Low Stock"
    | "Out of Stock"
    | string;
  imageUrl?: string[] | string;
  image?: string;
  thumbnail?: string;
  images?: string[];
  sellerId?:
    | string
    | {
        _id?: string;
        id?: string;
        storeName?: string;
        shopName?: string;
        FirstName?: string;
        LastName?: string;
        name?: string;
        username?: string;
        email?: string;
      };
  seller?: {
    _id?: string;
    id?: string;
    storeName?: string;
    shopName?: string;
    name?: string;
  };
  sellerName?: string;
  storeName?: string;
  createdAt?: string;
  category?:
    | string
    | {
        _id?: string;
        id?: string;
        categoryName?: string;
        name?: string;
        [key: string]: any;
      };
  brand?: string;
}

export type Products = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    stock?: number;
    rating?: number;
    thumbnail?: string;
    images?: string[];
    category?: string;
    brand?: string;
}


export interface productListResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    page: number;
    limit: number;
    total: number;
    length: number;
  };
}

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  stock: number;
  sku?: string;
  status?: Product["status"];
  images?: File[];
}

export interface SearchProductsParams {
  q: string;
  category?: string;
  sort?:
    | "price:asc"
    | "price:desc"
    | "productName:asc"
    | "productName:desc"
    | "createdAt:asc"
    | "createdAt:desc"
    | string;
  page?: number;
  limit?: number;
}

export interface SearchProductsResponse {
  success: boolean;
  message: string;
  data?: {
    products: Product[];
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
  error?: string;
}
