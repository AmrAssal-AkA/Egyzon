import React from "react";
import ExpandableProductSection from "@/components/category/ExpandableProductSection";

import { fetchProductByCategoryName } from "@/services/product";
import type { Product } from "@/types/product.type";

async function BeveragePart() {
  const products: Product[] = await fetchProductByCategoryName("beverages");

  const initialProductCount = 3;
  const initialProducts = products.slice(0, initialProductCount);
  const remainingProducts = products.slice(initialProductCount);

  return (
    <ExpandableProductSection
      initialProducts={initialProducts}
      remainingProducts={remainingProducts}
      title="Beverages"
      description="Explore our wide range of beverage products."
    />
  );
}

export default BeveragePart;
