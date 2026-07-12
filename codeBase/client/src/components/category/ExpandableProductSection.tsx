"use client";
import { useState } from "react";
import ProductGrid from "@/components/products/Product-grid";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images?: string[];
  category: string;
  rating: number;
  brand: string;
  inStock: boolean;
  stock: number;
  availabilityStatus?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  weight?: number;
  reviews?: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
    
  }>;
}

interface ExpandableProductSectionProps {
  initialProducts: Product[];
  remainingProducts: Product[];
  title: string;
  description: string;
}

export default function ExpandableProductSection({
  initialProducts,
  remainingProducts,
  title,
  description,
}: ExpandableProductSectionProps) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="w-full rounded-lg shadow-md p-4">
      <div className="flex items-start justify-between mb-4">
        <div className="border-r-2 border-blue-500 pr-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        {remainingProducts.length > 0 && (
          <button
            className="text-black dark:text-white cursor-pointer hover:underline whitespace-nowrap ml-4"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        )}
      </div>
      <div className="flex items-start">
        <div className="border-r-2 border-blue-500 pr-4 w-1/3"></div>
        <div className="w-2/3 pl-4">
          <ProductGrid products={initialProducts} />
        </div>
      </div>
      {showAll && remainingProducts.length > 0 && (
        <div className="mt-6 flex items-start">
          <div className="border-r-2 border-blue-500 pr-4 w-1/3"></div>
          <div className="w-2/3 pl-4">
            <ProductGrid products={remainingProducts} />
          </div>
        </div>
      )}
    </div>
  );
}
