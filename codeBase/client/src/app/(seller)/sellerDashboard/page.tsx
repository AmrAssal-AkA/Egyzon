import React from 'react'

import AverageOrderValueCard from '@/components/seller/dashboardComp/AverageOrderValueCard'
import TotalRevenueCard from '@/components/seller/dashboardComp/TotalRevenueCard'
import TotalOrdersCard from '@/components/seller/dashboardComp/TotalOrdersCard'
import TotalProductsCard from '@/components/seller/dashboardComp/TotalProductsCard'
import AnalyticsGraph from '@/components/seller/dashboardComp/AnalyticsGraph'
import TopProduct from '@/components/seller/dashboardComp/topProduct'
import TopOrders from '@/components/seller/dashboardComp/topOrders'

function SellerDashboard() {
  return (
    <main className="w-full min-w-0 flex flex-col gap-5 sm:gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <TotalRevenueCard change="+5.2%" description="Increase in revenue compared to last month" />
        <TotalOrdersCard change="+3.1%" description="Increase in orders compared to last month" />
        <TotalProductsCard change="-1.2%" description="Total products listed in store" />
        <AverageOrderValueCard description="Improvement in conversion rate" />
      </div>

      <AnalyticsGraph />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <TopProduct />
        <TopOrders />
      </div>
    </main>
  )
}

export default SellerDashboard