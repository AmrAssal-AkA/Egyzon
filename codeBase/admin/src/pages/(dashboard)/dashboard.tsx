import React, { useState } from "react";

import { LayoutDashboard, Calendar } from "lucide-react";

import ActiveSellersCard from "../../components/ActiveSellersCard";
import PendingSellersCard from "../../components/PendingSellersCard";
import TotalRevenue from "../../components/totalRevenue";
import RevenueChart from "../../components/RevenueChart";
import SellerDistributionChart from "../../components/SellerDistributionChart";
import ContactCard from "../../components/contactCard";
import type { SellerDistributionData } from "../../types/charts";

const sellerDistributionData: SellerDistributionData[] = [
  { category: "Electronics", value: 480, percentage: 40 },
  { category: "Fashion", value: 360, percentage: 30 },
  { category: "Home Goods", value: 360, percentage: 30 },
];

function DashBoardPage(): React.ReactElement {
  const [period, setPeriod] = useState<string>("7D");

  const formatCurrency = (value: number): string => {
    return `${value.toLocaleString()} EGP`;
  };

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <title>Dashboard Overview | Egyzon Admin</title>
      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs shrink-0">
              <LayoutDashboard className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Dashboard Overview
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Real-time marketplace intelligence, revenue tracking, and operational management.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              {todayFormatted}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync
            </span>
          </div>
        </div>

        {/* Metric Summary Cards Grid */}
        <section aria-label="Platform Key Performance Indicators">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
            <TotalRevenue />
            <ActiveSellersCard />
            <PendingSellersCard />
          </div>
        </section>

        {/* Analytics & Distribution Visualizations */}
        <section
          aria-label="Revenue Growth and Seller Distribution"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Revenue Growth Line/Area Chart */}
          <RevenueChart
            title="Revenue Growth"
            description="Trailing gross performance across all marketplace categories."
            valueFormatter={formatCurrency}
            period={period}
            onPeriodChange={(p) => setPeriod(p)}
            className="lg:col-span-2"
            ariaLabel="Revenue Growth over time chart"
          />

          {/* Seller Distribution Donut Chart */}
          <SellerDistributionChart
            data={sellerDistributionData}
            title="Seller Distribution"
            description="Active sellers grouped by category."
            totalLabel="Total Sellers"
            valueFormatter={(val) => val.toLocaleString()}
            className="lg:col-span-1"
            ariaLabel="Sellers distribution by category donut chart"
          />

          {/* Customer Complaints & Operations Workflow */}
          <ContactCard className="lg:col-span-3 w-full" />
        </section>
      </main>
    </>
  );
}

export default DashBoardPage;
