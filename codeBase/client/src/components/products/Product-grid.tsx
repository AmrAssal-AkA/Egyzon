import React from "react";
import ProductCard from "./product-card";

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

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <ProductCard
          id={product.id}
          key={product.id}
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
  );
}

export default ProductGrid;
