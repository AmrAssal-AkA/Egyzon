"use client";

import React from "react";
import Link from "next/link";

import { ClipboardList, LogIn } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { OrderCard } from "@/components/order/orderCard";
import { useCustomerOrderHistory } from "@/hooks/useCustomer";
import { useAuth } from "@/hooks/useAuth";

export default function OrderHolderComponent() {
  const { user } = useAuth();
  const { orders, isLoading } = useCustomerOrderHistory();

  if (!user) {
    return (
      <Empty className="py-24 border border-dashed border-border rounded-2xl bg-muted/20">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="mb-4">
            <LogIn className="w-8 h-8 text-muted-foreground/50" />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-bold text-foreground">
            Sign In Required
          </EmptyTitle>
          <EmptyDescription className="text-muted-foreground text-sm mt-2 max-w-md px-4">
            Please log in to your account to view your order history and manage your purchases.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link
            href="/login"
            className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer inline-block"
          >
            Log In
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6">
        <div className="h-8 w-32 bg-muted animate-pulse rounded-lg" />
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 w-full bg-muted/40 animate-pulse rounded-xl border border-border"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Empty className="py-24 border border-dashed border-border rounded-2xl bg-muted/20">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="mb-4">
            <ClipboardList className="w-8 h-8 text-muted-foreground/50" />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-bold text-foreground">
            No orders found
          </EmptyTitle>
          <EmptyDescription className="text-muted-foreground text-sm mt-2 max-w-md px-4">
            You haven&apos;t placed any orders yet. Once you place an order, it will appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link
            href="/"
            className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer inline-block"
          >
            Start Shopping
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">My Orders</h2>
        <span className="text-sm font-normal text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order, idx) => (
          <OrderCard
            key={order._id || order.orderNumber || `order-${idx}`}
            order={order}
          />
        ))}
      </div>
    </div>
  );
}
