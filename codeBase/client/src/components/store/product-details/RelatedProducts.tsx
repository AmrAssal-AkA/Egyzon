import React from "react";
import Link from "next/link";
import ProductCard from "@/components/products/product-card";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
  brand: string;
  inStock: boolean;
  stock?: number;
}

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-16 pt-10 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-bold text-foreground">
          You May Also Like
        </h2>
        <Link
          href="/products"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.thumbnail}
            category={product.category}
            rating={product.rating}
            brand={product.brand}
            inStock={product.inStock}
            stock={product.stock}
          />
        ))}
      </div>
    </div>
  );
}
