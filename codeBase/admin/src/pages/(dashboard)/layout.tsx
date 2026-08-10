import React from "react";
import { Outlet } from "react-router-dom";

import SideBarMenu from "../../components/sidebar";
import Header from "../../components/header";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <SideBarMenu />

      <main className="flex-1  overflow-auto">
        <Header />
        <div className="p-2.5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
