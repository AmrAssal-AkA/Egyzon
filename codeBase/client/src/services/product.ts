interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  inStock: boolean;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
import { Category } from "@/components/category/category-grid";

const API_BASE_URL = "https://dummyjson.com";

const CATEGORY_ALIASES: Record<string, string[]> = {
  electronics: ["laptops", "smartphones", "tablets"],
  beverages: ["groceries"],
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    return data.products as Product[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const data = await response.json();
    return data as Product;
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
        return data.products as Product[];
      }),
    );

    return results
      .flat()
      .filter((product: Product) => product.id !== currentId) as Product[];
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
