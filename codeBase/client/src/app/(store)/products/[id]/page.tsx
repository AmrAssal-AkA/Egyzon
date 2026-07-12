import React from "react";
import { notFound } from "next/navigation";

import ProductGallery from "@/components/store/product-details/ProductGallery";
import ProductInfo from "@/components/store/product-details/ProductInfo";
import ProductTabs from "@/components/store/product-details/ProductTabs";
import RelatedProducts from "@/components/store/product-details/RelatedProducts";
import { fetchProductById } from "@/services/product";
import {fetchProductsByCategory} from '@/services/product'
import { Product } from "@/components/category/ExpandableProductSection";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = params; 


  const fetchedProduct = await fetchProductById(Number(id));
  if (!fetchedProduct) {
    notFound();
  }
  const product: Product = {
    ...fetchedProduct,
    inStock: Boolean(fetchedProduct.stock && fetchedProduct.stock > 0),
    stock: fetchedProduct.stock || 0,
    images: fetchedProduct.images || [],
  };
  const relatedProducts = await fetchProductsByCategory({category: product.category, currentId: product.id});

  const seller = {
    name:
      product.brand ||
      `${product.category.charAt(0).toUpperCase() + product.category.slice(1)} Store`,
    feedbackPercentage: 98.6,
    responseTime: "Within 1 hour",
    isVerified: true,
  };

  const specifications = [
    { key: "Brand", value: product.brand || "Unbranded" },
    {
      key: "Category",
      value:
        product.category.charAt(0).toUpperCase() + product.category.slice(1),
    },
    {
      key: "Warranty",
      value: product.warrantyInformation || "1 Year Manufacturer Warranty",
    },
    { key: "Weight", value: product.weight ? `${product.weight} kg` : "N/A" },
    {
      key: "Dimensions",
      value: product.dimensions
        ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`
        : "N/A",
    },
  ];

  const shipping = {
    delivery: product.shippingInformation || "Ships in 3-5 business days",
    method: "Standard Shipping (Air/Ground)",
    returns: product.returnPolicy || "30 days return policy",
    packaging: "Premium Eco-friendly Box",
  };

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center py-20 px-4 md:px-20 mt-10">
      <div className="w-full max-w-7xl flex flex-col gap-12">
        {/* Top Product Details Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column: Gallery */}
          <div className="w-full">
            <ProductGallery
              images={product.images || []}
              title={product.title}
            />
          </div>

          {/* Right Column: Info & Buy Section */}
          <div className="w-full">
            <ProductInfo
              id={product.id}
              title={product.title}
              category={product.category}
              brand={product.brand || "Unbranded"}
              rating={product.rating}
              reviewCount={product.reviews?.length || 10}
              price={product.price}
              inStock={product.inStock} 
              stock={product.stock || 99}
              seller={seller}
            />
          </div>
        </div>

        {/* Middle Area: Tabs */}
        <div className="w-full">
          <ProductTabs
            description={product.description}
            tags={product.category ? [product.category] : []}
            specifications={specifications}
            shipping={shipping}
          />
        </div>

        {/* Bottom Area: Related Products */}
        <div className="w-full">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </main>
  );
}
