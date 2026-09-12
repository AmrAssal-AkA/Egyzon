import React from "react";

import AnalyticCard from "@/components/seller/dashboardComp/AnalyticCard";
import TotalRevenueCard from "@/components/seller/dashboardComp/TotalRevenueCard";
import TotalOrdersCard from "@/components/seller/dashboardComp/TotalOrdersCard";
import TotalProductsCard from "@/components/seller/dashboardComp/TotalProductsCard";
import { ChartPieDonutText } from "@/components/seller/dashboardComp/analyticalPage/ChartPieDonutText";
import RevenueGraph from "@/components/seller/dashboardComp/analyticalPage/RevenueGraph";
import TopProduct from "@/components/seller/dashboardComp/topProduct";
import AverageOrderValueCard from '@/components/seller/dashboardComp/AverageOrderValueCard'

export const metadata = {
  title: "Egyzon - Seller Analytics",
  description: "Analytics Overview for your store's performance",
  meta: {
    viewport: "width=device-width, initial-scale=1",
    robots: "noindex, nofollow",
  },
}



function AnalyticsPage() {
  return (
    <main className="w-full min-w-0 flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 font-serif tracking-tight">
          Analytics Overview
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Comprehensive insights into your store&apos;s performance
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TotalRevenueCard
          change="+5.20"
          description="Increase in revenue compared to last month"
        />
        <TotalOrdersCard
          change="-1.1%"
          description="Decrease in orders compared to last month"
        />
        <TotalProductsCard
          change="+1.2%"
          description="Increase in products listed"
        />
        <AverageOrderValueCard
          change="+3.5%"
          description="Improvement in average order value"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RevenueGraph />
        <ChartPieDonutText />
      </div>
      <TopProduct variant="analytical" />
    </main>
  );
}

export default AnalyticsPage;
