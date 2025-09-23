"use client"
import React from 'react'

import { useCart } from '@/context/CartContext'
import { toast } from 'react-toastify'


export default function productDetailPage({product}) {
  const popAlert = () =>{
    toast.success(`${product.name} added to cart`, {
      position : 'bottom-right'
    });
  }

  const {addtocart} = useCart();
    const hundleAddToCart = () => {
      addtocart(product , 1);
      popAlert()
  }

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='flex-1'>
          <img src={product.image} alt={product.name} className='w-full h-auto rounded-lg shadow-md object-cover'/>
        </div>
        <div className='flex-1 flex flex-col justify-between' >
          <div>
            <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
            <p className='text-gray-700 mb-6'>{product.description}</p>
            <p className='text-2xl font-semibold mb-6'>{product.price} EGP</p>
          </div>
          <button onClick={hundleAddToCart} className='bg-yellow-400 text-white hover:bg-transparent hover:text-black w-40 h-15 cursor-pointer hover:border-1'>
                Add To Cart
              </button>
        </div>
      </div>
    </div>
  )
}