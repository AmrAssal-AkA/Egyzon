import React, { useId, useState } from "react";

import {
  Activity,
  Calendar,
  Loader2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { usePlatformRevenueGrowth } from "../hooks/useAnalytics";
import type { AnalyticalTimeframe } from "../types/analytics";
import type { RevenueChartProps, RevenueData } from "../types/charts";

function periodToTimeframe(p: string): AnalyticalTimeframe {
  if (p === "7D" || p === "7days") return "7days";
  if (p === "30D" || p === "30days") return "30days";
  if (p === "12M" || p === "12months" || p === "YTD") return "12months";
  return "7days";
}

function timeframeToPeriod(t: AnalyticalTimeframe): string {
  if (t === "7days") return "7D";
  if (t === "30days") return "30D";
  if (t === "12months") return "12M";
  return "7D";
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data: propData,
  title = "Revenue Growth",
  description = "Real-time platform revenue and trend performance across marketplace.",
  valueFormatter = (value) => `${value.toLocaleString()} EGP`,
  period: propPeriod,
  onPeriodChange: propOnPeriodChange,
  timeframe: propTimeframe,
  onTimeframeChange: propOnTimeframeChange,
  height = 320,
  className = "",
  ariaLabel,
  isLoading: propIsLoading,
}) => {
  const chartId = useId();
  const [internalPeriod, setInternalPeriod] = useState<string>("7D");

  const currentPeriod = propPeriod ?? (propTimeframe ? timeframeToPeriod(propTimeframe) : internalPeriod);
  const currentTimeframe = propTimeframe ?? periodToTimeframe(currentPeriod);

  const isControlledData = Array.isArray(propData);

  const {
    data: liveGrowthData,
    isLoading: isLiveLoading,
    error: liveError,
  } = usePlatformRevenueGrowth(isControlledData ? undefined : currentTimeframe);

  const isLoading = propIsLoading ?? (!isControlledData && isLiveLoading);

  const chartData: RevenueData[] = isControlledData
    ? propData
    : (liveGrowthData?.series ?? []).map((point) => ({
        date: point.date,
        revenue: point.revenue,
        orders: point.orders,
        label: point.label,
      }));

  const latestValue =
    chartData.length > 0 ? chartData[chartData.length - 1].revenue : 0;
  const totalRevenue = liveGrowthData?.totalRevenue ?? latestValue;
  const formattedHeadlineValue = valueFormatter(
    isControlledData ? latestValue : totalRevenue
  );

  const periods = [
    { label: "7D", timeframe: "7days" as AnalyticalTimeframe },
    { label: "30D", timeframe: "30days" as AnalyticalTimeframe },
    { label: "12M", timeframe: "12months" as AnalyticalTimeframe },
  ];

  const handlePeriodClick = (selectedPeriod: string, targetTimeframe: AnalyticalTimeframe) => {
    if (propOnPeriodChange) {
      propOnPeriodChange(selectedPeriod);
    } else {
      setInternalPeriod(selectedPeriod);
    }

    if (propOnTimeframeChange) {
      propOnTimeframeChange(targetTimeframe);
    }
  };

  const revenueChange = liveGrowthData?.revenueChangePercent;
  const isPositiveGrowth = typeof revenueChange === "number" && revenueChange >= 0;

  return (
    <div
      className={`bg-white border border-gray-200/80 shadow-xs rounded-xl p-5 flex flex-col justify-between ${className}`}
      role="region"
      aria-label={ariaLabel || title}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {title}
            </h3>
            {!isControlledData && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            )}
          </div>

          {description && (
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          )}

          <div className="mt-2 flex flex-wrap items-baseline gap-2.5">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              {isLoading && chartData.length === 0 ? (
                <span className="text-gray-400 text-lg font-normal">Loading...</span>
              ) : chartData.length > 0 ? (
                formattedHeadlineValue
              ) : (
                "No data"
              )}
            </div>

            {typeof revenueChange === "number" && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isPositiveGrowth
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
                title="Revenue change percentage"
              >
                {isPositiveGrowth ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>
                  {isPositiveGrowth ? `+${revenueChange}%` : `${revenueChange}%`}
                </span>
              </span>
            )}
          </div>

          {/* Additional KPIs from endpoint */}
          {liveGrowthData && (
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1 font-medium text-gray-600">
                <Activity className="w-3.5 h-3.5 text-blue-500" />
                {liveGrowthData.totalOrders.toLocaleString()} orders
              </span>
              <span className="text-gray-300">•</span>
              <span>
                AOV: <strong className="text-gray-700 font-semibold">{valueFormatter(liveGrowthData.AverageOrderValue)}</strong>
              </span>
              {liveGrowthData.peak && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500">
                    Peak: <strong className="text-gray-700 font-semibold">{valueFormatter(liveGrowthData.peak.revenue)}</strong>
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Period selection controls */}
        <div
          className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50/70 self-start sm:self-center shrink-0"
          role="group"
          aria-label="Filter chart period"
        >
          {periods.map(({ label, timeframe }) => {
            const isActive =
              currentPeriod === label ||
              currentPeriod === timeframe ||
              (label === "12M" && currentPeriod === "YTD");

            return (
              <button
                key={label}
                type="button"
                onClick={() => handlePeriodClick(label, timeframe)}
                aria-pressed={isActive}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                  isActive
                    ? "bg-white text-blue-600 shadow-xs border border-gray-200/60 font-semibold"
                    : "text-gray-500 hover:text-gray-900 bg-transparent border border-transparent"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Container */}
      <div style={{ width: "100%", height }}>
        {isLoading && chartData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50 p-4">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin mb-2" />
            <span className="text-xs text-gray-400">Loading revenue analytics...</span>
          </div>
        ) : liveError && chartData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-rose-200 rounded-lg bg-rose-50/30 p-4">
            <span className="text-sm font-medium text-rose-600">
              {liveError}
            </span>
          </div>
        ) : chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`gradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
                tickFormatter={(tick) => {
                  try {
                    const date = new Date(tick);
                    if (Number.isNaN(date.getTime())) return tick;
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  } catch {
                    return tick;
                  }
                }}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => {
                  if (val >= 1000000) {
                    return `${(val / 1000000).toFixed(1)}M`;
                  }
                  if (val >= 1000) {
                    return `${(val / 1000).toFixed(0)}k`;
                  }
                  return val.toString();
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e2e8f0",
                  borderRadius: "8px",
                  boxShadow:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                }}
                labelStyle={{
                  color: "#64748b",
                  fontSize: "11px",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
                itemStyle={{
                  color: "#1e293b",
                  fontSize: "12px",
                  padding: "0",
                }}
                labelFormatter={(label) => {
                  if (label === undefined || label === null) return "";
                  try {
                    const date = new Date(label as string);
                    if (Number.isNaN(date.getTime())) return String(label);
                    return date.toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  } catch {
                    return String(label);
                  }
                }}
                formatter={(value: unknown, name: string) => {
                  if (name === "revenue") {
                    return [
                      <span key="rev" className="font-semibold text-gray-900">
                        {valueFormatter(Number(value))}
                      </span>,
                      "Revenue",
                    ];
                  }
                  return [String(value), name];
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="revenue"
                stroke="#2563eb"
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#gradient-${chartId})`}
                activeDot={{
                  r: 5,
                  style: { fill: "#2563eb", strokeWidth: 2, stroke: "#ffffff" },
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50 p-4">
            <Calendar className="w-8 h-8 text-gray-300 mb-1.5" />
            <span className="text-sm font-medium text-gray-500">
              No revenue data available
            </span>
            <span className="text-xs text-gray-400 mt-0.5">
              Try selecting a different timeframe.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
