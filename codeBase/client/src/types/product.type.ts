export interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  price: number;
  discount: number;
  stock: number;
  AvgRating?: number;
  status?: "active" | "inactive";
  imageUrl: string[] | string;
  SellerId?: string;
  createdAt?: string;
  category?: string;
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
