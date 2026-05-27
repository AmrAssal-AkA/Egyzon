"use client";
import Link from "next/link";
import useHandleAddToCart from "@/Hooks/useHandleAddToCart";

export default function ProductGrid({ products }) {
  const addToCart = useHandleAddToCart();

  const handleAddToCartClick = (e, product) => {
    e.preventDefault();

    addToCart(product, 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 dark:shadow-gray-700">
      {!products || products.length === 0 ? (
        <div className="flex justify-center items-center h-64 bg-gray-50 rounded-2xl">
          <p className="text-lg text-gray-500 font-medium">
            No products found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 dark:shadow-gray-700">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md shadow-amber-400 hover:shadow-xl transition-all duration-300 border border-gray-100 h-full dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-white p-4 sm:p-6 flex justify-center items-center dark:bg-gray-700">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <h3 className="text-xs sm:text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold dark:text-white">
                  {product.category}
                </h3>
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[40px] sm:min-h-[48px] dark:text-white">
                  {product.name}
                </h2>
                <div className="mt-auto pt-4 flex flex-col gap-3">
                  <p className="text-lg sm:text-xl font-bold text-yellow-600 dark:text-yellow-400">
                    {Number(product.price).toFixed(2)} EGP
                  </p>
                  <button
                    onClick={(e) => handleAddToCartClick(e, product)}
                    className="w-full bg-yellow-400 text-gray-900 font-bold py-2.5 rounded-xl hover:bg-yellow-500 transition-colors active:scale-95 duration-200"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
