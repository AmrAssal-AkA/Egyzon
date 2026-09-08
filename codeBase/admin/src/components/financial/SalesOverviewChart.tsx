import React, { useId, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Globe2,
  Calendar,
  Loader2,
  Activity,
  Layers,
  ShoppingBag,
} from "lucide-react";
import type {
  DailySalesDataPoint,
  MonthlySalesDataPoint,
  SalesOverviewLast30DaysData,
} from "../../types/financial";

export interface SalesOverviewChartProps {
  data?: (DailySalesDataPoint | MonthlySalesDataPoint)[];
  overview?: SalesOverviewLast30DaysData | null;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export function SalesOverviewChart({
  data = [],
  overview = null,
  isLoading = false,
  error = null,
  className = "",
}: SalesOverviewChartProps): React.ReactElement {
  const gradientId = useId();

  // Format currency helpers
  const formatFullCurrency = (val: number): string => `${val.toLocaleString()} EGP`;
  const formatCompactCurrency = (val: number): string => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
    return val.toString();
  };

  const formatShortDate = (dateStr?: string): string => {
    if (!dateStr) return "";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
        const monthIdx = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        if (monthIdx >= 0 && monthIdx < 12 && !isNaN(day)) {
          return `${monthNames[monthIdx]} ${day}`;
        }
      }
    } catch {
      // fallback
    }
    return dateStr;
  };

  const {
    isMonthly,
    chartSeries,
    totalSalesAmount,
    averageStat,
    averageStatLabel,
    peakStat,
    ordersCount,
    trendPercent,
    timeframeLabel,
    subtitleText,
  } = useMemo(() => {
    const rawData = overview?.series ?? data;

    if (!rawData || rawData.length === 0) {
      return {
        isMonthly: false,
        chartSeries: [],
        totalSalesAmount: overview?.totalRevenue ?? 0,
        averageStat: overview?.AverageOrderValue ?? 0,
        averageStatLabel: "AOV:",
        peakStat: overview?.peak
          ? {
              label: formatShortDate(overview.peak.date || overview.peak.label),
              amount: overview.peak.revenue,
            }
          : null,
        ordersCount: overview?.totalOrders ?? 0,
        trendPercent: overview?.revenueChangePercent ?? 0,
        timeframeLabel:
          overview?.timeframe === "30days" || !overview?.timeframe
            ? "Last 30 Days"
            : overview.timeframe,
        subtitleText:
          "Daily platform sales analytics, order volume, and revenue trend for the last 30 days.",
      };
    }

    const isMonthly = Boolean(
      rawData.length > 0 && "sales" in rawData[0] && !("revenue" in rawData[0])
    );

    if (isMonthly) {
      const monthlyItems = rawData as MonthlySalesDataPoint[];
      const total = monthlyItems.reduce((acc, curr) => acc + curr.sales, 0);
      const avg = Math.round(total / monthlyItems.length);
      let peak = monthlyItems[0];
      monthlyItems.forEach((item) => {
        if (item.sales > peak.sales) peak = item;
      });
      const firstMonthSales = monthlyItems[0]?.sales || 1;
      const lastMonthSales = monthlyItems[monthlyItems.length - 1]?.sales || 1;
      const overallGrowth =
        ((lastMonthSales - firstMonthSales) / firstMonthSales) * 100;

      const series = monthlyItems.map((item) => ({
        label: item.shortMonth || item.month,
        fullLabel: item.month,
        revenue: item.sales,
        orders: item.ordersCount,
        platformFees: item.platformFees,
        growthRate: item.growthRate,
      }));

      return {
        isMonthly: true,
        chartSeries: series,
        totalSalesAmount: total,
        averageStat: avg,
        averageStatLabel: "Avg:",
        peakStat: {
          label: peak.shortMonth,
          amount: peak.sales,
        },
        ordersCount: monthlyItems.reduce((acc, curr) => acc + curr.ordersCount, 0),
        trendPercent: Number(overallGrowth.toFixed(1)),
        timeframeLabel: "12 Months",
        subtitleText:
          "Total marketplace gross sales per month across all vendors and transactions (Last 12 Months).",
      };
    }

    // 30-day daily analytics
    const dailyItems = rawData as DailySalesDataPoint[];
    const total =
      overview?.totalRevenue ??
      dailyItems.reduce((acc, curr) => acc + (curr.revenue || 0), 0);
    const totalOrders =
      overview?.totalOrders ??
      dailyItems.reduce((acc, curr) => acc + (curr.orders || 0), 0);
    const aov =
      overview?.AverageOrderValue ??
      (totalOrders > 0 ? total / totalOrders : 0);
    const change = overview?.revenueChangePercent ?? 0;

    const peakItem =
      overview?.peak ??
      (dailyItems.length > 0
        ? dailyItems.reduce(
            (max, curr) => (curr.revenue > max.revenue ? curr : max),
            dailyItems[0]
          )
        : null);

    const series = dailyItems.map((item) => ({
      label: formatShortDate(item.label || item.date),
      fullLabel: item.date || item.label,
      revenue: item.revenue || 0,
      orders: item.orders || 0,
      platformFees: Math.round((item.revenue || 0) * 0.05),
      growthRate: undefined,
    }));

    return {
      isMonthly: false,
      chartSeries: series,
      totalSalesAmount: total,
      averageStat: aov,
      averageStatLabel: "AOV:",
      peakStat: peakItem
        ? {
            label: formatShortDate(peakItem.date || peakItem.label),
            amount: peakItem.revenue,
          }
        : null,
      ordersCount: totalOrders,
      trendPercent: change,
      timeframeLabel:
        overview?.timeframe === "30days" || !overview?.timeframe
          ? "Last 30 Days"
          : overview.timeframe,
      subtitleText:
        "Daily platform sales analytics, order volume, and revenue trend for the last 30 days.",
    };
  }, [data, overview]);

  return (
    <div
      className={`bg-white border border-gray-200/80 shadow-2xs rounded-2xl p-5 sm:p-6 flex flex-col justify-between ${className}`}
      role="region"
      aria-label="Sales Overview Chart"
    >
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Sales Overview
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <Globe2 className="w-3 h-3" />
              Entire Marketplace
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {subtitleText}
          </p>

          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight tabular-nums">
              {isLoading ? "..." : formatFullCurrency(totalSalesAmount)}
            </div>

            {/* Overall Sales Trend Indicator */}
            {isMonthly ? (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                title="Overall 12-month sales expansion trend"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{trendPercent}% Overall Trend (12M)</span>
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  trendPercent >= 0
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
                title="Revenue change compared to previous period"
              >
                {trendPercent >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>
                  {trendPercent >= 0 ? `+${trendPercent}%` : `${trendPercent}%`} vs previous 30 days
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Quick KPI stats badges */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {averageStatLabel}{" "}
              <strong className="font-semibold text-gray-900">
                {formatCompactCurrency(averageStat)}{isMonthly ? "/mo" : " EGP"}
              </strong>
            </span>
          </div>

          {peakStat && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                Peak:{" "}
                <strong className="font-semibold text-gray-900">
                  {peakStat.label} ({formatCompactCurrency(peakStat.amount)})
                </strong>
              </span>
            </div>
          )}

          {!isMonthly && ordersCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Orders:{" "}
                <strong className="font-semibold text-gray-900">
                  {ordersCount.toLocaleString()}
                </strong>
              </span>
            </div>
          )}

          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100/80 text-gray-500 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>{timeframeLabel}</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="w-full h-80 sm:h-96 mt-6">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <Loader2 className="w-7 h-7 text-blue-600 animate-spin mb-2" />
            <span className="text-xs text-gray-500 font-medium">
              Loading marketplace sales data...
            </span>
          </div>
        ) : error && chartSeries.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-rose-200 rounded-xl bg-rose-50/30">
            <span className="text-sm font-medium text-rose-500">
              Failed to load sales overview
            </span>
          </div>
        ) : chartSeries.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <Calendar className="w-8 h-8 text-gray-300 mb-1" />
            <span className="text-sm font-medium text-gray-600">
              No sales data recorded
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartSeries}
              margin={{ top: 12, right: 12, left: 0, bottom: 6 }}
            >
              <defs>
                <linearGradient id={`gradient-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />

              {/* X-Axis: Months / Days */}
              <XAxis
                dataKey="label"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={8}
              />

              {/* Y-Axis: Total sales amount */}
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCompactCurrency}
                dx={-4}
              />

              {/* Tooltip: Exact values */}
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const point = payload[0].payload as typeof chartSeries[0];
                    return (
                      <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-lg min-w-[210px] text-xs">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                          <span className="font-bold text-gray-900 text-sm">
                            {point.fullLabel}
                          </span>
                          {point.growthRate !== undefined && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              +{point.growthRate}% MoM
                            </span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Marketplace Sales:</span>
                            <span className="font-bold text-gray-900 tabular-nums">
                              {formatFullCurrency(point.revenue)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Platform Fees (5%):</span>
                            <span className="font-semibold text-blue-600 tabular-nums">
                              {formatFullCurrency(point.platformFees)}
                            </span>
                          </div>

                          {point.orders > 0 && (
                            <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-gray-400">
                              <span>Completed Orders:</span>
                              <span className="font-medium text-gray-700">
                                {point.orders.toLocaleString()} orders
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                name="Total Marketplace Sales"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#gradient-${gradientId})`}
                activeDot={{
                  r: 6,
                  style: { fill: "#2563eb", strokeWidth: 2.5, stroke: "#ffffff" },
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer disclaimer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-gray-400">
        <span>
          Shows aggregate gross merchandise volume (GMV) across all active categories, stores, and fulfillment channels.
        </span>
        <span className="font-medium text-gray-500 shrink-0">
          Source: Egyzon Ledger & Settlements
        </span>
      </div>
    </div>
  );
}

export default SalesOverviewChart;
