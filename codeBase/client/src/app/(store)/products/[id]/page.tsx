import React from "react";
import { notFound } from "next/navigation";

import ProductGallery from "@/components/products/product-Deatail/product-details/ProductGallery";
import ProductInfo from "@/components/products/product-Deatail/product-details/ProductInfo";
import ProductTabs from "@/components/products/product-Deatail/product-details/ProductTabs";
import RelatedProducts from "@/components/products/product-Deatail/product-details/RelatedProducts";
import { fetchProductById, fetchProducts } from "@/services/product";
import type { Product } from "@/types/product.type";

export const dynamic = "force-dynamic";

type ProductWithOptionalId = Product & {
  productId?: string | null;
  _id?: string | null;
};

type SellerLike = {
  storeName?: string;
  shopName?: string;
  FirstName?: string;
  LastName?: string;
  name?: string;
  username?: string;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const fetchedProduct = await fetchProductById(id);
  if (!fetchedProduct) {
    notFound();
  }

  const product = fetchedProduct as ProductWithOptionalId;
  const productId = product._id ?? product.productId;
  const relatedProducts = (await fetchProducts(1, 12)).data.products.filter(
    (relatedProduct) => {
      const relatedProductId =
        (relatedProduct as ProductWithOptionalId)._id ??
        (relatedProduct as ProductWithOptionalId).productId;
      return relatedProductId !== productId;
    },
  );

  // Resolve Seller Name & Store Information
  const rawSeller = product.sellerId || product.seller;
  let sellerName = "Egyzon Store";
  let sellerStoreName = "";

  let sellerId: string | undefined;

  if (rawSeller && typeof rawSeller === "object") {
    const sellerObject = rawSeller as SellerLike;
    sellerId = (sellerObject as any)._id || (sellerObject as any).id;
    sellerStoreName = sellerObject.storeName || sellerObject.shopName || "";
    const fullName = [sellerObject.FirstName, sellerObject.LastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    sellerName =
      sellerStoreName ||
      fullName ||
      sellerObject.name ||
      sellerObject.username ||
      product.storeName ||
      product.sellerName ||
      "Egyzon Store";
  } else if (typeof rawSeller === "string" && rawSeller.trim() !== "") {
    sellerId = rawSeller;
    sellerName =
      product.storeName ||
      product.sellerName ||
      `Seller #${rawSeller.slice(-6)}`;
  } else if (product.storeName || product.sellerName) {
    sellerName = product.storeName || product.sellerName || "Egyzon Store";
  }

  const seller = {
    id: sellerId,
    name: sellerName,
    storeName: sellerStoreName || sellerName,
    feedbackPercentage: 98.6,
    responseTime: "Within 1 hour",
    isVerified: true,
  };

  const rawCategory = product.category;
  let categoryDisplayName = "General";
  if (typeof rawCategory === "object" && rawCategory !== null) {
    categoryDisplayName =
      (rawCategory as any).categoryName ||
      (rawCategory as any).name ||
      "General";
  } else if (typeof rawCategory === "string" && rawCategory.trim() !== "") {
    categoryDisplayName = rawCategory;
  }

  const specifications = [
    {
      key: "Product ID",
      value: String(product._id || product.productId || "N/A"),
    },
    { key: "Seller", value: sellerName },
    { key: "Category", value: categoryDisplayName },
    {
      key: "Status",
      value: typeof product.status === "string" ? product.status : "active",
    },
    {
      key: "Discount",
      value: `${product.discount ?? product.discountPercentage ?? 0}%`,
    },
    {
      key: "Created At",
      value: product.createdAt
        ? new Date(product.createdAt).toLocaleDateString()
        : "N/A",
    },
  ];

  const shipping = {
    delivery: "Ships in 3-5 business days",
    method: "Standard Shipping (Air/Ground)",
    returns: "30 days return policy",
    packaging: "Premium Eco-friendly Box",
  };

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center py-20 px-4 md:px-20 md:mt-20">
      {(() => {
        const galleryImages = Array.isArray(product.imageUrl)
          ? product.imageUrl.filter(
              (image): image is string =>
                typeof image === "string" && image.length > 0,
            )
          : typeof product.imageUrl === "string" && product.imageUrl.length > 0
            ? [product.imageUrl]
            : ["/images/placeholder.jpg"];
        const productTitle = product.productName || product.name || "Product";
        const productIdValue =
          product._id || product.productId || product.id || "product";
        const productDescription =
          product.productDescription ||
          product.description ||
          "No description available.";
        const productThumbnail = galleryImages[0] || "/images/placeholder.jpg";

        return (
          <div className="w-full max-w-7xl flex flex-col gap-12">
            {/* Top Product Details Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Left Column: Gallery */}
              <div className="w-full">
                <ProductGallery images={galleryImages} title={productTitle} />
              </div>

              {/* Right Column: Info & Buy Section */}
              <div className="w-full">
                <ProductInfo
                  id={String(productIdValue)}
                  title={productTitle}
                  rating={product.AvgRating ?? 0}
                  reviewCount={10}
                  price={product.price}
                  discount={product.discount ?? product.discountPercentage ?? 0}
                  inStock={product.status === "active" || product.stock > 0}
                  stock={product.stock}
                  seller={seller}
                  thumbnail={productThumbnail}
                />
              </div>
            </div>

            {/* Middle Area: Tabs */}
            <div className="w-full">
              <ProductTabs
                description={productDescription}
                tags={[]}
                specifications={specifications}
                shipping={shipping}
              />
            </div>

            {/* Bottom Area: Related Products */}
            <div className="w-full">
              <RelatedProducts products={relatedProducts} />
            </div>
          </div>
        );
      })()}
    </main>
  );
}
