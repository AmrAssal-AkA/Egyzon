import React, { useState } from "react";
import Card from "../../components/Card";
import { PoundSterling, Users, ShieldAlert, PackageCheck } from "lucide-react";
import { RevenueData, SellerDistributionData } from "../../types/charts";
import RevenueChart from "../../components/RevenueChart";
import SellerDistributionChart from "../../components/SellerDistributionChart";
import ContactCard from "../../components/contactCard";


// Example mock datasets for periods
const revenueData7D: RevenueData[] = [
  { date: "2026-08-04", revenue: 68000 },
  { date: "2026-08-05", revenue: 70000 },
  { date: "2026-08-06", revenue: 72000 },
  { date: "2026-08-07", revenue: 71000 },
  { date: "2026-08-08", revenue: 75000 },
  { date: "2026-08-09", revenue: 82000 },
  { date: "2026-08-10", revenue: 89000 },
];

const revenueData30D: RevenueData[] = [
  { date: "2026-07-12", revenue: 42000 },
  { date: "2026-07-17", revenue: 48000 },
  { date: "2026-07-22", revenue: 46000 },
  { date: "2026-07-27", revenue: 62000 },
  { date: "2026-08-02", revenue: 70000 },
  { date: "2026-08-10", revenue: 89000 },
];

const revenueDataYTD: RevenueData[] = [
  { date: "2026-01-01", revenue: 210000 },
  { date: "2026-02-01", revenue: 280000 },
  { date: "2026-03-01", revenue: 340000 },
  { date: "2026-04-01", revenue: 310000 },
  { date: "2026-05-01", revenue: 420000 },
  { date: "2026-06-01", revenue: 530000 },
  { date: "2026-07-01", revenue: 690000 },
  { date: "2026-08-01", revenue: 890000 },
];

const sellerDistributionData: SellerDistributionData[] = [
  { category: "Electronics", value: 480, percentage: 40 },
  { category: "Fashion", value: 360, percentage: 30 },
  { category: "Home Goods", value: 360, percentage: 30 },
];


function DashBoardPage() {
  const [period, setPeriod] = useState<string>("30D");


  // Get active revenue data based on selected period
  const activeRevenueData = (() => {
    switch (period) {
      case "7D":
        return revenueData7D;
      case "YTD":
        return revenueDataYTD;
      case "30D":
      default:
        return revenueData30D;
    }
  })();

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString()} EGP`;
  };

  return (
    <main className="p-6">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          High-level view of your admin panel. Monitor key metrics and platform indicators.
        </p>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card
          title="Total Revenue"
          description="Total earnings this month"
          value="124,500 EGP"
          icon={<PoundSterling className="w-5 h-5 text-blue-600" />}
          badges={["+12.5% vs last month"]}
          progress={85}
          variant="default"
        />

        <Card
          title="Active Sellers"
          description="Sellers active on platform"
          value="1,280"
          icon={<Users className="w-5 h-5 text-blue-600" />}
          badges={["+5.4% growth"]}
          progress={68}
          variant="default"
        />

        <Card
          title="KYC Pending"
          description="Seller applications to review"
          value="14"
          icon={<ShieldAlert className="w-5 h-5 text-amber-600" />}
          badges={["14 Pending"]}
          actions={[
            {
              label: "Review All",
              onClick: () => alert("Navigating to KYC Review Queue"),
              variant: "primary",
            },
          ]}
          variant="elevated"
        />

        <Card
          title="Product Approvals"
          description="Products awaiting moderation"
          value="42"
          icon={<PackageCheck className="w-5 h-5 text-emerald-600" />}
          badges={["Action Required"]}
          actions={[
            {
              label: "Approve Queue",
              onClick: () => alert("Navigating to Product Approvals"),
              variant: "outline",
            },
          ]}
          variant="default"
        />
      </div>

      {/* Reusable Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Revenue Growth Line/Area Chart */}
        <RevenueChart
          data={activeRevenueData}
          title="Revenue Growth"
          description="Trailing performance across all marketplace categories."
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

      <ContactCard className="lg:col-span-3 w-full" />
      </div>
    </main>
  );
}

export default DashBoardPage;
