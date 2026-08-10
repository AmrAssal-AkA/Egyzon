import React from "react";
import { notFound } from "next/navigation";

import ProductGallery from "@/components/products/product-Deatail/product-details/ProductGallery";
import ProductInfo from "@/components/products/product-Deatail/product-details/ProductInfo";
import ProductTabs from "@/components/products/product-Deatail/product-details/ProductTabs";
import RelatedProducts from "@/components/products/product-Deatail/product-details/RelatedProducts";
import { fetchProductById, fetchProducts } from "@/services/product";
import type { Product } from "@/types/product.type";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const fetchedProduct = await fetchProductById(id);
  if (!fetchedProduct) {
    notFound();
  }
  const product: Product = fetchedProduct;
  const relatedProducts = (await fetchProducts(1, 12)).data.products.filter(
    (relatedProduct) => (relatedProduct._id || (relatedProduct as any).productId) !== (product._id || (product as any).productId),
  );

  const seller = {
    name: product.SellerId ? `Seller ${product.SellerId.slice(0, 6)}` : "Egyzon Store",
    feedbackPercentage: 98.6,
    responseTime: "Within 1 hour",
    isVerified: true,
  };

  const specifications = [
    { key: "Product ID", value: product._id || (product as any).productId },
    { key: "Seller", value: product.SellerId || "N/A" },
    { key: "Status", value: product.status || "active" },
    { key: "Discount", value: `${product.discount}%` },
    { key: "Created At", value: product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "N/A" },
  ];

  const shipping = {
    delivery: "Ships in 3-5 business days",
    method: "Standard Shipping (Air/Ground)",
    returns: "30 days return policy",
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
              images={Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl]}
              title={product.productName}
            />
          </div>

          {/* Right Column: Info & Buy Section */}
          <div className="w-full">
            <ProductInfo
              id={product._id || (product as any).productId}
              title={product.productName}
              rating={product.AvgRating ?? 0}
              reviewCount={10}
              price={product.price}
              inStock={product.status === "active" || product.stock > 0}
              stock={product.stock}
              seller={seller}
              thumbnail={(Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl) || "/images/placeholder.jpg"}
            />
          </div>
        </div>

        {/* Middle Area: Tabs */}
        <div className="w-full">
          <ProductTabs description={product.productDescription} tags={[]} specifications={specifications} shipping={shipping} />
        </div>

        {/* Bottom Area: Related Products */}
        <div className="w-full">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </main>
  );
}
