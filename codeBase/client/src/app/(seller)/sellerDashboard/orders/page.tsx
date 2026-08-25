import React from "react";
import OrdersContainer from "@/components/seller/dashboardComp/orderPage/OrdersContainer";

export const metadata = {
  title: "Egyzon - Manage Orders",
  description: "Manage and fulfill your customer store orders.",
};

export default function OrderPage() {
  return (
    <main className="w-full min-h-screen">
      <OrdersContainer />
    </main>
  );
}