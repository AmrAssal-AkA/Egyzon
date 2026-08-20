import React from "react";

import AnalyticCard from "@/components/seller/dashboardComp/AnalyticCard";
import TotalRevenueCard from "@/components/seller/dashboardComp/TotalRevenueCard";
import TotalOrdersCard from "@/components/seller/dashboardComp/TotalOrdersCard";
import TotalProductsCard from "@/components/seller/dashboardComp/TotalProductsCard";
import { ChartPieDonutText } from "@/components/seller/dashboardComp/analyticalPage/ChartPieDonutText";
import RevenueGraph from "@/components/seller/dashboardComp/analyticalPage/RevenueGraph";
import TopProduct from "@/components/seller/dashboardComp/topProduct";

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
    <main className="min-h-screen flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 font-serif">
          Analytics Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          comprehensive Insights into your store&apos;s performance
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <AnalyticCard
          title="Conversion Rate"
          value="890"
          change="+4.5%"
          description="Improvement in conversion rate"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueGraph />
        <ChartPieDonutText />
      </div>
      <TopProduct variant="analytical" />
    </main>
  );
}

export default AnalyticsPage;
