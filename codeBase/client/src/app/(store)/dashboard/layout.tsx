import React from 'react'

import {PrivateRoute} from "@/components/auth/PrivateRoute";
import SideMenu from "@/components/userDashboard/sideMenu";
import {Roles} from "@/lib/auth/roles";

export default function CustomerDashBoardLayout({children}: {children: React.ReactNode}) {
  return (
    <PrivateRoute allowedRoles={[Roles.CUSTOMER]}>
      <div className="flex flex-col md:flex-row min-h-screen mt-20 md:mt-40 w-full gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-10">
        <SideMenu />
        <main className="flex-1 bg-background flex flex-col items-center md:py-10 px-0 w-full min-w-0">
          {children}
        </main>
      </div>
    </PrivateRoute>
  )
}
