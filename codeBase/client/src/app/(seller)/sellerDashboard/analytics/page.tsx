import React from 'react'
import {} from "lucide-react";

import AnalyticCard from '@/components/seller/dashboardComp/AnalyticCard'
import { ChartPieDonutText } from '@/components/seller/dashboardComp/analyticalPage/pieChart'
import RevenueGraph from '@/components/seller/dashboardComp/analyticalPage/RevenueGraph'
import TopProduct from '@/components/seller/dashboardComp/topProduct';

function AnalyticsPage() {
  return (
   <main className='min-h-screen flex flex-col gap-4 p-4'>
    <div className='flex flex-col gap-2'>
      <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-200 font-serif'>Analytics Overview</h1>
      <p className='text-gray-600 dark:text-gray-400'>comprehensive Insights into your store&apos;s performance</p>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <AnalyticCard title='Total Revenue' value='12,345 EGP' change='+5.20' description='Increase in revenue compared to last month' />
      <AnalyticCard title='Total Orders' value='1,234' change='-1.1%' description='Decrease in orders compared to last month' />
      <AnalyticCard title='Total Products' value='567' change='+1.2%' description='Increase in products listed' />
      <AnalyticCard title='Conversion Rate' value='890' change='+4.5%' description='Improvement in conversion rate' />
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <RevenueGraph />
      <ChartPieDonutText />
    </div>
    <TopProduct variant="analytical" />
   </main>
  )
}

export default AnalyticsPage