"use client"
import React , {useState} from 'react'
import { Star , Truck, RotateCcw } from 'lucide-react';

export default function Tabs({product}) {
     const [activeTab, setActiveTab] = useState('details');
  return (
            <div className="mt-16 bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="border-b">
            <div className="flex">
              {['details', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 font-medium capitalize transition-colors relative ${
                    activeTab === tab
                      ? ' border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'details' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                <p className="text-gray-700 leading-relaxed">
                    {product.description}
                </p>
              </div>
            )}



            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Shipping & Returns</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2">
                        <Truck className="w-5 h-5 text-green-600" />
                        <span>Shipping Options</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Free Standard Shipping (5-7 business days) - Orders over $100</li>
                        <li>• Express Shipping (2-3 business days) - $15</li>
                        <li>• Next Day Delivery - $25</li>
                        <li>• Same Day Delivery (select areas) - $35</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2">
                        <RotateCcw className="w-5 h-5 text-blue-600" />
                        <span>Returns & Exchanges</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• 30-day return policy</li>
                        <li>• Free return shipping</li>
                        <li>• Items must be in original condition</li>
                        <li>• Refund processed within 5-7 business days</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Track Your Order</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Get real-time updates on your order status and delivery progress.
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
  )
}
