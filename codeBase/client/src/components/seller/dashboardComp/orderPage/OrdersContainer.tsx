"use client";

import React, { useState, useMemo } from "react";

import OrdersTopBar from "./OrdersTopBar";
import OrdersMetrics from "./OrdersMetrics";
import OrdersTabs, { OrderStatusTab } from "./OrdersTabs";
import OrdersTable from "./OrdersTable";
import OrderDetailsModal from "./OrderDetailsModal";
import { useSellerOrders, useTotalOrders, useTotalRevenue } from "@/hooks/useSeller";
import { SellerOrder } from "@/types/seller";
import { toast } from "sonner";

export default function OrdersContainer() {
  const [activeTab, setActiveTab] = useState<OrderStatusTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");
  const [selectedOrder, setSelectedOrder] = useState<SellerOrder | null>(null);

  // SWR API Hook calls directly to backend endpoints
  const { orders: apiOrders, isLoading: isOrdersLoading } = useSellerOrders();
  const { totalOrders: apiTotalOrders } = useTotalOrders();
  const { totalRevenue: apiTotalRevenue } = useTotalRevenue();

  // Orders data straight from getAllOrders API
  const ordersData: SellerOrder[] = useMemo(() => {
    return Array.isArray(apiOrders) ? apiOrders : [];
  }, [apiOrders]);

  // Tab counts calculation from live API orders
  const counts = useMemo<Record<OrderStatusTab, number>>(() => {
    const res: Record<OrderStatusTab, number> = {
      all: ordersData.length,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    ordersData.forEach((order) => {
      const s = (order.orderStatus || order.status || "").toLowerCase();
      if (s === "pending" || s === "placed") res.pending++;
      else if (s === "processing" || s === "in-progress") res.processing++;
      else if (s === "shipped") res.shipped++;
      else if (s === "delivered" || s === "completed" || s === "confirmed") res.delivered++;
      else if (s === "cancelled" || s === "canceled") res.cancelled++;
    });

    return res;
  }, [ordersData]);

  // Filtered & Sorted orders list from API data
  const filteredOrders = useMemo(() => {
    let result = [...ordersData];

    // Status Tab filter
    if (activeTab !== "all") {
      result = result.filter((order) => {
        const s = (order.orderStatus || order.status || "").toLowerCase();
        if (activeTab === "pending") return s === "pending" || s === "placed";
        if (activeTab === "processing") return s === "processing" || s === "in-progress";
        if (activeTab === "shipped") return s === "shipped";
        if (activeTab === "delivered") return s === "delivered" || s === "completed" || s === "confirmed";
        if (activeTab === "cancelled") return s === "cancelled" || s === "canceled";
        return true;
      });
    }

    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter((order) => {
        const idMatch = (order.orderNumber || String(order._id || order.id || "")).toLowerCase().includes(q);
        const name =
          order.customerName ||
          (typeof order.customer === "object" && order.customer !== null
            ? order.customer.name || `${order.customer.FirstName || ""} ${order.customer.LastName || ""}`
            : String(order.customer || ""));
        const nameMatch = (name || "").toLowerCase().includes(q);
        return idMatch || nameMatch;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "date-desc") {
        const dateA = new Date(a.orderDate || a.createdAt || 0).getTime();
        const dateB = new Date(b.orderDate || b.createdAt || 0).getTime();
        return dateB - dateA;
      }
      if (sortBy === "date-asc") {
        const dateA = new Date(a.orderDate || a.createdAt || 0).getTime();
        const dateB = new Date(b.orderDate || b.createdAt || 0).getTime();
        return dateA - dateB;
      }
      if (sortBy === "amount-desc") {
        const amtA = Number(a.totalAmount || a.subTotal || 0);
        const amtB = Number(b.totalAmount || b.subTotal || 0);
        return amtB - amtA;
      }
      if (sortBy === "amount-asc") {
        const amtA = Number(a.totalAmount || a.subTotal || 0);
        const amtB = Number(b.totalAmount || b.subTotal || 0);
        return amtA - amtB;
      }
      return 0;
    });

    return result;
  }, [ordersData, activeTab, searchQuery, sortBy]);

  // Overall metrics derived directly from APIs
  const totalOrdersCount = apiTotalOrders || ordersData.length;
  const pendingFulfillmentCount = counts.pending;
  const totalRevenueVal =
    apiTotalRevenue ||
    ordersData.reduce((sum, ord) => sum + Number(ord.totalAmount || ord.subTotal || 0), 0);

  // CSV Export handler
  const handleExport = () => {
    if (filteredOrders.length === 0) {
      toast.error("No orders available to export");
      return;
    }

    const headers = ["Order ID", "Customer", "Date", "Amount (EGP)", "Status", "Items Count"];
    const rows = filteredOrders.map((o) => [
      o.orderNumber || o._id || o.id,
      o.customerName || (typeof o.customer === "object" ? o.customer?.name : "Customer"),
      o.orderDate || o.createdAt || "",
      o.totalAmount || o.subTotal || 0,
      o.orderStatus || o.status || "Pending",
      Array.isArray(o.orderItems) ? o.orderItems.length : 0,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.map((cell) => `"${cell}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `seller_orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Orders exported successfully!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Bar Header */}
      <OrdersTopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onExport={handleExport}
      />

      {/* Metrics Summary Cards */}
      <OrdersMetrics
        totalOrders={totalOrdersCount}
        pendingCount={pendingFulfillmentCount}
        totalRevenue={totalRevenueVal}
        isLoading={isOrdersLoading}
      />

      {/* Status Filter Tabs */}
      <OrdersTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      {/* Orders Data Table */}
      <OrdersTable
        orders={filteredOrders}
        isLoading={isOrdersLoading}
        onSelectOrder={(order) => setSelectedOrder(order)}
        itemsPerPage={10}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
