import React from "react";

import { Clock, Package, Truck, CheckCircle2, XCircle } from "lucide-react";

import { Order, orderStatus } from "../../types/order.type";

interface OrderViewTableProps {
  orders: Order[];
  page?: number;
  limit?: number;
  allSelected?: boolean;
  someSelected?: boolean;
  onSelectAll?: (selected: boolean) => void;
  onSelectOne?: (orderNumber: string, selected: boolean) => void;
  selectedIds?: Set<string>;
}

const statusConfig: Record<
  orderStatus,
  {
    label: string;
    className: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200/70",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    className: "bg-blue-50 text-blue-700 border-blue-200/70",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200/70",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200/70",
    icon: XCircle,
  },
};

function OrderStatusBadge({
  status,
}: {
  status: orderStatus;
}): React.ReactElement {
  const config = statusConfig[status] || {
    label: status,
    className: "bg-gray-50 text-gray-600 border-gray-200",
    icon: Clock,
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      {config.label}
    </span>
  );
}

export default function OrderViewTable({
  orders,
  allSelected,
  someSelected,
  onSelectAll,
  onSelectOne,
  selectedIds,
}: OrderViewTableProps): React.ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3.5 pl-5 pr-3 w-10">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400 cursor-pointer"
                checked={allSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = Boolean(someSelected && !allSelected);
                  }
                }}
                onChange={(e) => onSelectAll?.(e.target.checked)}
                aria-label="Select all orders"
              />
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Order Number
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Product
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Customer
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Seller & Store
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Total Amount
            </th>
            <th className="py-3.5 pr-5 pl-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const isItemSelected = selectedIds?.has(
              order.orderNumber.toString(),
            );

            return (
              <tr
                key={order.id}
                className={`border-b border-gray-50 transition-colors ${
                  isItemSelected ? "bg-gray-50" : "hover:bg-gray-50/70"
                }`}
              >
                <td className="py-4 pl-5 pr-3">
                  <input
                    type="checkbox"
                    checked={isItemSelected}
                    aria-label={`Select order ${order.orderNumber}`}
                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400 cursor-pointer"
                    onChange={(e) =>
                      onSelectOne?.(
                        order.orderNumber.toString(),
                        e.target.checked,
                      )
                    }
                  />
                </td>

                <td className="py-4 px-3">
                  <span className="font-mono text-xs font-semibold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                    {order.orderNumber}
                  </span>
                </td>

                <td className="py-4 px-3">
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <img
                      src={order.imageUrl}
                      alt={order.productName}
                      className="w-10 h-10 object-cover rounded-lg border border-gray-200/80 shrink-0 bg-gray-100"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p
                        className="text-sm font-semibold text-gray-900 truncate max-w-[200px]"
                        title={order.productName}
                      >
                        {order.productName}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {order.category}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-3">
                  <div className="min-w-[170px]">
                    <p className="text-sm font-semibold text-gray-900">
                      {order.FirstName} {order.LastName}
                    </p>
                    <p
                      className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]"
                      title={order.email}
                    >
                      {order.email}
                    </p>
                  </div>
                </td>

                <td className="py-4 px-3">
                  <div className="min-w-[150px]">
                    <p className="text-sm font-semibold text-gray-900">
                      {order.seller}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {order.storeName}
                    </p>
                  </div>
                </td>

                <td className="py-4 px-3 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-900 tabular-nums">
                    EGP {order.totalAmount.toLocaleString()}
                  </span>
                </td>

                <td className="py-4 pr-5 pl-3">
                  <OrderStatusBadge status={order.orderStatus} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
