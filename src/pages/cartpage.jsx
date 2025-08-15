import React from 'react'
import PS5 from '../assets/Products/Products Images/Ps5.webp'


function cartpage() {
  return (
    <div className="bg-gray-100  py-8 px-2 md:px-8 mt-30">
      <h1 className="text-2xl font-bold mb-4">MY CART</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="bg-white shadow-md rounded p-4 mb-6">
            {/* Cart Actions */}
            <div className="flex justify-end gap-2 mb-2">
              <button className="border px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm">Move All to Wish List</button>
              <button className="border px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm">Remove All</button>
            </div>
            {/* Cart Item */}
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col md:flex-row gap-4 border-b pb-4 mb-4">
                <img src={item.image} alt={item.name} className="w-28 h-20 object-contain rounded bg-gray-100" />
                <div className="flex-1">
                  <a href="#" className="font-semibold  hover:underline">{item.name}</a>
                  <div className="text-xs text-gray-500">{item.BuyerName}</div>
                  <div className="mt-2">
                    {item.accessories.map(acc => (
                      <div key={acc} className="bg-gray-100 px-2 py-1 rounded text-sm inline-block mb-1">{acc}</div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-600 font-semibold text-sm">{item.inStock ? "In Stock" : "Out of Stock"}</span>
                    <span className="text-xs text-gray-500">{item.inStock ? "Ready to Ship" : ""}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="border px-2 rounded text-lg font-bold text-gray-700 hover:bg-gray-200">-</button>
                    <span className="px-2">{item.qty}</span>
                    <button className="border px-2 rounded text-lg font-bold text-gray-700 hover:bg-gray-200">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between min-w-[100px]">
                  <span className="font-bold text-lg text-gray-800">{item.price.toFixed(2)} EGP </span>
                  <div className="flex gap-2 mt-4">
                    <button className="text-gray-500 text-xs hover:underline">Save for Later</button>
                    <button className="text-gray-500 text-xs hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
            {/* Protection Plan */}
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2l7 4v6c0 5.25-3.5 10-7 10S5 17.25 5 12V6l7-4z" />
              </svg>
              <span className="text-gray-700 text-sm">Protection Plans starting at <span className="font-bold">14.99 EGP</span></span>
              <button className="ml-2 px-3 py-1 bg-yellow-400 t rounded text-xs cursor-pointer">See Options</button>
            </div>
            {/* Item Total */}
            <div className="flex justify-end font-bold text-lg mt-2">
              Item Total: {cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)} EGP
            </div>
          </div>
          {/* Saved for Later */}
          <div className="bg-white shadow-md rounded p-4 mt-6">
            <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Whishlists
            </h2>
            <p className="text-sm text-gray-500">put here Buy later</p>
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <div className="bg-white shadow-md rounded p-4 mb-4">
            <h3 className="font-semibold mb-2">ESTIMATE SHIPPING & TAX <span className="ml-1 text-gray-400 cursor-pointer" title="Info">ⓘ</span></h3>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="pickup" className="accent-yellow-600" />
              <label htmlFor="pickup" className="text-sm">read policy plan <span className="text-blue-600 hover:underline cursor-pointer">See Details</span></label>
            </div>
            <input type="text" placeholder="Discount Code" className="w-full border rounded px-2 py-1 mb-2 text-sm" />
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal:</span>
                <span className="font-semibold">{cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)} EGP</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Shipping</span>
                <span className="text-gray-500">Calculate Above</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Sales Tax</span>
                <span className="text-gray-500">Calculate Above</span>
              </div>
              <div className="flex justify-between text-base font-bold mt-2">
                <span>Total</span>
                <span>{cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}EGP</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-yellow-400  py-2 rounded transition flex items-center justify-center gap-2 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="7" rx="2" />
                <path d="M16 11V7a4 4 0 0 0-8 0v4" />
              </svg>
              go to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default cartpage