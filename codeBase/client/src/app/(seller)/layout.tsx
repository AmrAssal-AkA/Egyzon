import React from 'react'

import SellerSideMenue from '@/components/seller/dashboardComp/sideMenue'
import SellerHeader from '@/components/seller/dashboardComp/header'
import SellerFooter from '@/components/seller/dashboardComp/footer'
import { PrivateRoute } from '@/components/auth/PrivateRoute'
import { Roles } from '@/lib/auth/roles'
import NotificationListener from '@/components/seller/common/NotificationListener'


export const metadata = {
  title: 'Egyzon - Seller Dashboard',
  description: 'Seller Dashboard for managing your store and products',
  meta: {
    viewport: 'width=device-width, initial-scale=1',
    robots: 'noindex, nofollow',
  },
}


export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute allowedRoles={[Roles.SELLER]}>
      <NotificationListener />
      <div className="min-h-screen flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <SellerSideMenue  />
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <SellerHeader />
          <section className="flex-1">{children}</section>
          <SellerFooter />
        </div>
      </div>
    </PrivateRoute>
  );
}
