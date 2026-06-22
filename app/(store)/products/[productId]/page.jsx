import { notFound } from "next/navigation";

import { ProductsData } from "@/lib/Products";
import ProductDetail from "@/components/product/productDetailPage";

export default async function ProductDetailPage({ params }) {
  const { productId } = await params;
  const product = ProductsData.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }
  return (
    <div className="md:m-70 mt-40 mb-30">
      <ProductDetail product={product} />
    </div>
  );
}
