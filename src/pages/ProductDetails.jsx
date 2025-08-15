import { useParams } from 'react-router-dom';
import {Products} from './Products'
import { useState } from 'react';
import {Electronics} from './electronics'

function ProductDetails() {
  const {id} = useParams() ; 
  const product = Products.find(p => p.id === parseInt(id));
  if (!product) return <div className="text-center mt-10">Product not found.</div>;

  const [quantity , setQuantity] = useState(1);



  return (
     <div className="min-h-screen bg-white px-4 py-6 mt-40">
      {/* Top section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left: Main Image & Thumbnails */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="bg-gray-200 w-56 h-56 flex items-center justify-center mb-4">
            <img src={product.image} alt={product.name} className="object-contain max-h-52" />
          </div>
          <div className="flex gap-4 w-full justify-center">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-gray-300 w-12 h-12" />
            ))}
          </div>
        </div>
        {/* Right: Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">{product.name || 'Product name'}</h2>
            <div className="flex items-center text-xs">
              <span className="flex items-center mr-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.7,11.3 15,17.1 9.9,14 4.8,17.1 6.1,11.3 1.6,7.3 7.5,6.6" />
                  </svg>
                ))}
              </span>
              <span className="text-gray-700">
                ({product.reviews || 5} ratings)
              </span>
            </div>
          </div>
          <p className="font-semibold text-sm mt-2 mb-4">
            {product.description ||
              'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'}
          </p>
          <div className="font-bold text-2xl mb-4">{product.price}EGP</div>
          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-2 mb-6">
            <button
              className="border px-2 rounded cursor-pointer"
              onClick={() => setQuantity(quantity - 1)}
            >-</button>

            <span className="px-2">{quantity}</span>

            <button
              className="border px-2 rounded cursor-pointer"
              onClick={() => setQuantity(quantity + 1)}
            >+</button>
            <button className="ml-4 bg-yellow-300 border border-black text-black px-6 py-1 rounded-full font-semibold hover:bg-yellow-400 transition cursor-pointer">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      {/* Product Info Section */}
      <div className="max-w-5xl mx-auto mt-8 border p-6">
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Product information</h3>
          <div className="border-b mb-4" />
          <div className="border-b mb-4" />
          <div className="border-b mb-4" />
        </div>
        <h3 className="font-semibold mb-2">About Product</h3>
      </div>
      {/* Ratings Section */}
      <div className="max-w-5xl mx-auto mt-4 border p-6">
        <h2 className="font-bold text-xl mb-2">Ratings</h2>
      </div>
    </div>
  )

}

export default ProductDetails;