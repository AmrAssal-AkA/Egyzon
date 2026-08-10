import axios from "axios"


import { Category } from "@/components/category/category-grid";
import { productListResponse, Product, Products } from "@/types/product.type";

const API_BASE_URL = "https://dummyjson.com";

const CATEGORY_ALIASES: Record<string, string[]> = {
  electronics: ["laptops", "smartphones", "tablets"],
  beverages: ["groceries"],
};


const mapDummyJsonProduct = (product: Products): Product => ({
  _id: String(product.id),
  productName: product.title,
  productDescription: product.description,
  price: product.price,
  discount: product.discountPercentage ?? 0,
  stock: product.stock ?? 0,
  AvgRating: product.rating ?? 0,
  status: (product.stock ?? 0) > 0 ? "active" : "inactive",
  imageUrl:
    product.images && product.images.length > 0
      ? product.images
      : product.thumbnail
        ? [product.thumbnail]
        : [],
  SellerId: "",
  createdAt: new Date().toISOString(),
  category: product.category,
  brand: product.brand,
});

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

export const fetchProducts = async (page: number = 1, limit: number = 10): Promise<productListResponse> => {
  try {
    const isServer = typeof window === "undefined";
    const url = isServer
      ? `${BACKEND_URL}/api/product?page=${page}&limit=${limit}`
      : `/api/product/getProducts?page=${page}&limit=${limit}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (id: string | number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    return mapDummyJsonProduct(data);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch product");
  }
};

export const fetchProductsByCategory = async ({
  category,
  currentId = 0,
}: {
  category: string;
  currentId?: number;
}) => {
  try {
    const categories = CATEGORY_ALIASES[category] ?? [category];

    const results = await Promise.all(
      categories.map(async (categorySlug) => {
        const response = await fetch(
          `${API_BASE_URL}/products/category/${categorySlug}`,
        );
        const data = await response.json();
        return (data.products as Products[]).map(mapDummyJsonProduct);
      }),
    );

    return results
      .flat()
      .filter((product: Product) => Number(product._id) !== currentId) as Product[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products by category");
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    const data = await response.json();
    return data as Category[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories");
  }
};

export const fetchProductByCategoryName = async (category: string) => {
  return fetchProductsByCategory({ category });
};
