

import React from 'react';
import SideMenu from '@/components/userDashboard/sideMenu';
import WelcomeHeader from '@/components/userDashboard/WelcomeHeader';
import DashboardStats from '@/components/userDashboard/DashboardStats';
import RecentOrders from '@/components/userDashboard/RecentOrders';
import QuickActions from '@/components/userDashboard/QuickActions';
import WishlistPreview from '@/components/userDashboard/WishlistPreview';
import {PrivateRoute} from '@/components/auth/PrivateRoute';

export default function UserDashboard() {
  return (
    <PrivateRoute>
      <div className="flex min-h-screen pt-28 md:pt-40 px-4 md:px-8 max-w-7xl mx-auto gap-4 md:gap-6 mb-12 flex-col md:flex-row">
        <div className="md:w-64 shrink-0">
          <SideMenu />
        </div>
      <main className="flex-1 flex flex-col gap-6 w-full">
        <WelcomeHeader />
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <RecentOrders />
          <QuickActions />
        </div>
        
        <WishlistPreview />
      </main>
    </div>
    </PrivateRoute>
  );
}