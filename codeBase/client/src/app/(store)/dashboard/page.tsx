

import React from 'react';
import WelcomeHeader from '@/components/userDashboard/WelcomeHeader';
import DashboardStats from '@/components/userDashboard/DashboardStats';
import RecentOrders from '@/components/userDashboard/RecentOrders';
import QuickActions from '@/components/userDashboard/QuickActions';
import WishlistPreview from '@/components/userDashboard/WishlistPreview';
import {PrivateRoute} from '@/components/auth/PrivateRoute';

export default function UserDashboard() {
  return (
    <PrivateRoute>
      <div className="flex flex-col md:flex-row gap-6 w-full">
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