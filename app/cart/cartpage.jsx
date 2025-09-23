"use client"
import React from 'react'
import {Trash2, Plus, Minus, ShoppingBag, ArrowLeft} from 'lucide-react'

import { useCart } from '@/context/CartContext'


export default function CartPage() {
    const {cartItems} = useCart();
    const subtotal = cartItems.reduce((sum, items) => sum +(items.price * items.quantity) , 0);
    const tax = subtotal * 0.14;
    const  shipping = subtotal > 1000 ? 0 : 9.99;
    const Total = subtotal + tax + shipping;

    if (cartItems ===0 ){
        return (
            <div className='min-h-screen py-12'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='text-center'>
                            <ShoppingBag className='mx-auto h-12 w-12 text-gray-400'/>
                            <h1 className='mt-4 text-lg font-medium text-gray-900'>Your cart is empty</h1>
                            <p className='mt-2 text-sm text-gray-500'>start adding some items to your cart .</p>
                            <button className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                            Continue Shopping
                                    </button>
                    </div>
                </div>
            </div>
        )
    }
  return (
    <div className='max-w-4xl mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-6'>Your Cart</h1>
        
    </div>
  )
}
