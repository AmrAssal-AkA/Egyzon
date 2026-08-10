import React from "react";
import ExpandableProductSection from "@/components/category/ExpandableProductSection";
import { fetchProductByCategoryName } from "@/services/product";
import type { Product } from "@/types/product.type";

async function Electronics() {
  const products: Product[] = await fetchProductByCategoryName("electronics");

  const initialProductCount = 3;
  const initialProducts = products.slice(0, initialProductCount);
  const remainingProducts = products.slice(initialProductCount);

  return (
    <ExpandableProductSection
      initialProducts={initialProducts}
      remainingProducts={remainingProducts}
      title="Electronics"
      description="Explore our wide range of electronic products."
    />
  );
}

export default Electronics;
