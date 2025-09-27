import Link from "next/link";

import { ProductsData, categories } from "@/lib/Products";
import CarouselMain from "@/components/carousel";

export default function Home() {
  //limit Products desplay in homepage
  const NumberOfProduct = 4;
  const ProductstoShow = ProductsData.slice(0, NumberOfProduct);
  //limit categories display in homepage
  const NumberOfCategory = 4;
  const categoriesToShow = categories.slice(0, NumberOfCategory);

  return (
    <main className="mt-30 justify-center">
      <div>
        <CarouselMain />
      </div>

      <section className="m-8">
        <h1 className="text-5xl text-center font-bold font-serif">
          Latest <span className="text-yellow-400">Products</span>{" "}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-8xl mx-auto mt-5 shadow-lg">
          {ProductstoShow.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-85 fill"
                />
                <div className="p-4 text-center">
                  <h2 className="text-2xl font-semibold mb-2">
                    {product.name}
                  </h2>
                  <h2 className=" text-gray-500 mb-2">{product.category}</h2>
                  <p className="text-yellow-600 font-bold text-xl">
                    {product.price} EGP
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* category section */}
      <section className="m-8">
        <h1 className="text-5xl text-center font-bold">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-8xl mx-auto mt-5 shadow-lg">
          {categoriesToShow.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer "
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-85 fill"
              />

              <div className="p-4 text-center">
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
