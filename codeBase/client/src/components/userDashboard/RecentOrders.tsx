"use client"
import React from 'react';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';

export default function RecentOrders() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
          <Link href="/my-orders" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            View All
          </Link>
        </div>
        <p className="text-muted-foreground text-center dark:text-gray-200">Please log in to view your recent orders.</p>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        <Link href="/my-orders" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Order ID</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {user?.orders?.map((order) => (
              <tr key={order.id} className="border-b dark:border-gray-700">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{order.id}</td>
                <td className="px-4 py-3 truncate max-w-50 sm:max-w-none">{order.product}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : order.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
