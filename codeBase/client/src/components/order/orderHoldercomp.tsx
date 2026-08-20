"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";


import { ClipboardList, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { useCartStore, LastOrder } from "@/stores/buyer/useCart";
import { OrderCard } from "@/components/order/orderCard";


export default function OrderHolderComponent() {
  const { lastOrder } = useCartStore();
  const [orders, setOrders] = useState<LastOrder[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Rehydrate/load from localstorage
    const savedOrdersStr = localStorage.getItem("egyzon-orders");
    let savedOrders: LastOrder[] = [];
    if (savedOrdersStr) {
      try {
        savedOrders = JSON.parse(savedOrdersStr);
      } catch (e) {
        console.error("Failed to parse orders from localStorage:", e);
      }
    }

    // Sync lastOrder if it exists and is not already in savedOrders
    if (lastOrder && lastOrder.orderNumber) {
      const alreadyExists = savedOrders.some(
        (o) => o.orderNumber === lastOrder.orderNumber
      );
      if (!alreadyExists) {
        savedOrders = [lastOrder, ...savedOrders];
        localStorage.setItem("egyzon-orders", JSON.stringify(savedOrders));
      }
    }

    const timeoutId = window.setTimeout(() => {
      setOrders(savedOrders);
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [lastOrder]);

  const handleRemoveOrder = (orderNumber: string) => {
    if (confirm(`Are you sure you want to remove order ${orderNumber} from your history?`)) {
      const updatedOrders = orders.filter((o) => o.orderNumber !== orderNumber);
      setOrders(updatedOrders);
      localStorage.setItem("egyzon-orders", JSON.stringify(updatedOrders));
      toast.success(`Removed order ${orderNumber} from history.`);
    }
  };

  const handleClearAllOrders = () => {
    if (confirm("Are you sure you want to clear your entire order history?")) {
      setOrders([]);
      localStorage.removeItem("egyzon-orders");
      toast.success("Cleared all order history.");
    }
  };

  if (!mounted) {
    return (
      <div className="w-full flex flex-col gap-6">
        <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
        <div className="flex flex-col gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 w-full bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
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
            className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer"
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
        <span className="text-sm font-normal text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </span>
        <button
          onClick={handleClearAllOrders}
          className="inline-flex items-center justify-center gap-2 bg-destructive/10 hover:bg-destructive hover:text-white text-destructive border border-destructive/25 transition-all text-xs font-semibold px-4 py-2.5 rounded-lg active:scale-[0.99] cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          Clear History
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <OrderCard key={order.orderNumber} order={order} onRemove={handleRemoveOrder} />
        ))}
      </div>
    </div>
  );
}
