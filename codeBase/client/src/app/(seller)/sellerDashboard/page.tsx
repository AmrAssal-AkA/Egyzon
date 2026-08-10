import React from 'react'


import AnalyticCard from '@/components/seller/dashboardComp/AnalyticCard'
import AnalyticsGraph from '@/components/seller/dashboardComp/AnalyticsGraph'
import TopProduct, { initialProducts } from '@/components/seller/dashboardComp/topProduct'
import TopOrders from '@/components/seller/dashboardComp/topOrders'

const topOrders = [
  {id: 1, orderId: "#5554", customerName: "Amr", totalAmount: 5000, orderDate: "20-06-2026", status: "Delivered"},
  {id: 2, orderId: "#5555", customerName: "Ahmed", totalAmount: 3000, orderDate: "21-06-2026", status: "Pending"},
  {id: 3, orderId: "#5556", customerName: "Ali", totalAmount: 7000, orderDate: "22-06-2026", status: "Delivered"},
  {id: 4, orderId: "#5557", customerName: "Sara", totalAmount: 2000, orderDate: "23-06-2026", status: "Cancelled"},
  
]

function SellerDashboard() {
  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticCard title="Total Revenue" value="12,345 EGP" change="+5.2%" description="Increase in revenue compared to last month" />
        <AnalyticCard title="Total Orders" value="1,234" change="+3.1%" description="Increase in orders compared to last month" />
        <AnalyticCard title="Total Products" value="567" change="-1.2%" description="Decrease in products listed" />
        <AnalyticCard title="Conversion Rate" value="890" change="+4.5%" description="Improvement in conversion rate" />
      </div>

      <AnalyticsGraph />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopProduct topProducts={initialProducts} />
        <TopOrders topOrders={topOrders} />
      </div>
    </main>
  )
}

export default SellerDashboard