"use client";
import Link from "next/link";
import useHandleAddToCart from "@/Hooks/useHandleAddToCart";

export default function ProductGrid({ products }) {
  const addToCart = useHandleAddToCart();

  const handleAddToCartClick = (e, product) => {
    e.preventDefault(); // Prevent navigating to product detail page
    e.stopPropagation(); // Stop event from bubbling up
    addToCart(product, 1);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-8xl mx-auto mt-5 shadow-lg">
      {!products || products.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No products found.
        </p>
      ) : (
        products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-85 fill"
              />
              <div className="p-4 text-center">
                <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                <h2 className=" text-gray-500 mb-2">{product.category}</h2>
                <p className="text-yellow-600 font-bold text-xl">
                  {product.price} EGP
                </p>
                <button
                  onClick={(e) => handleAddToCartClick(e, product)}
                  className="mt-10 bg-yellow-400 text-white rounded-3xl hover:bg-transparent hover:text-black w-35 h-10 cursor-pointer hover:border-1"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
