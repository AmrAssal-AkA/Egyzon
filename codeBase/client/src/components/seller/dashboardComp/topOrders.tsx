import Link from 'next/link';
import React from 'react'

export default function TopOrders({topOrders}: {topOrders: {
    id: number;
  orderId: string;
  customerName: string;
  totalAmount: number;
  status: string;
  orderDate: string;
}[]}) {
  return (
    <div className="w-full h-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
        <h2 className="text-2xl font-medium text-black dark:text-white font-stretch-normal ">Top Orders</h2>
        <div className="">
            {topOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{order.customerName}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{order.totalAmount.toFixed(2)} EGP</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.orderDate}</p>
                    <p className={`text-sm font-medium rounded-2xl p-2.5 w-25 text-center ${order.status === "Delivered" ? "bg-green-500 text-green-200  " : "bg-red-500 text-red-200 "}`}>
                        {order.status}
                    </p>
                </div>
            ))}
        </div>
        <div className="flex items-center justify-center">
            <Link href="/sellerDashboard/orders" className='text-xl font-medium text-blue-500 hover:underline'>See More</Link>
        </div>
    </div>
  )
}
