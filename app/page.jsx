import Link from "next/link";


import CarouselMain from "@/components/HomePage/carousel";
import ProductGrid from "@/components/product/ProductGrid";

import { ProductsData, categories } from "@/lib/Products";
import CategoryGrid from "@/components/category/categoryGrid";

export default async function Home() {


  const NumberOfProduct = 4;
  const ProductstoShow = ProductsData.slice(0, NumberOfProduct);
  const NumberOfCategory = 4;
  const categoriesToShow = categories.slice(0, NumberOfCategory);

  return (
    <main className="mt-30 justify-center">
        <CarouselMain />

        {/* Product Section */}
      <section className="m-8">
        <h1 className="text-5xl text-center font-bold font-serif">
          Latest <span className="text-yellow-400">Products</span>{" "}
        </h1>
        <ProductGrid products={ProductstoShow} />
      </section>
      {/* category section */}
      <section className="m-8">
        <h1 className="text-5xl text-center font-bold m-10">Top <span className="text-yellow-400">Categories</span></h1>
          <CategoryGrid categories={categoriesToShow} />
      </section>
    </main>
  );
}
