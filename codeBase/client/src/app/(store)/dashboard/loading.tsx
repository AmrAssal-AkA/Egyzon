import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen pt-28 md:pt-40 px-4 md:px-8 max-w-7xl mx-auto gap-4 md:gap-6 mb-12 flex-col md:flex-row">
      
      {/* Side Menu Skeleton */}
      <div className="md:w-64 shrink-0">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2 h-[500px]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-full"></div>
          ))}
        </div>
      </div>

      <main className="flex-1 flex flex-col gap-6 w-full">
        {/* Welcome Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0 animate-pulse"></div>
          <div className="flex flex-col justify-center h-full sm:pt-2 w-full max-w-md items-center sm:items-start">
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3 animate-pulse"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
        
        {/* Dashboard Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Recent Orders Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-[400px] flex flex-col">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>
            <div className="flex-1 flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 dark:bg-gray-700/50 rounded-lg animate-pulse w-full"></div>
              ))}
            </div>
          </div>
          
          {/* Quick Actions Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-[400px] flex flex-col">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 dark:bg-gray-700/50 rounded-lg animate-pulse w-full"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Wishlist Preview Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-[300px]">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-100 dark:bg-gray-700/50 rounded-lg animate-pulse w-full"></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
