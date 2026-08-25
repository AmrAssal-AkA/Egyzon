import React from "react";
import ProductCard from "./product-card";

import { Product } from "@/types/product.type";

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product: Product, index: number) => (
        <ProductCard key={`${product._id}-${index}`} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
