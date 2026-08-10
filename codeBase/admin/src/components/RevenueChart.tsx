import React, { useId } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RevenueChartProps } from "../types/charts";

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  title,
  description,
  valueFormatter = (value) => `${value.toLocaleString()} EGP`,
  period,
  onPeriodChange,
  height = 300,
  className = "",
  ariaLabel,
}) => {
  const chartId = useId();

  // Find latest value to display clearly
  const latestValue =
    data && data.length > 0 ? data[data.length - 1].revenue : 0;
  const formattedLatestValue = valueFormatter(latestValue);

  // Render period selector buttons
  const periods = ["7D", "30D", "YTD"];

  return (
    <div
      className={`bg-white border border-gray-200/80 shadow-sm rounded-xl p-5 flex flex-col justify-between ${className}`}
      role="region"
      aria-label={ariaLabel || title}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          )}
          <div className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">
            {data && data.length > 0 ? formattedLatestValue : "No data"}
          </div>
        </div>

        {/* Period selection controls */}
        {onPeriodChange && (
          <div
            className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50/50 self-start sm:self-center"
            role="group"
            aria-label="Filter chart period"
          >
            {periods.map((p) => {
              const isActive = period === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPeriodChange(p)}
                  aria-pressed={isActive}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                    isActive
                      ? "bg-white text-blue-600 shadow-xs border border-gray-200/50"
                      : "text-gray-500 hover:text-gray-900 bg-transparent border border-transparent"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div style={{ width: "100%", height }}>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`gradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
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
                    if (isNaN(date.getTime())) return tick;
                    // Return localized compact representation (e.g. Aug 10)
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
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
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
                    const date = new Date(label as any);
                    if (isNaN(date.getTime())) return String(label);
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
                formatter={(value: any) => [
                  <span className="font-semibold text-gray-900">{valueFormatter(Number(value))}</span>,
                  "Revenue",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#gradient-${chartId})`}
                activeDot={{
                  r: 6,
                  style: { fill: "#2563eb", strokeWidth: 2, stroke: "#ffffff" },
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50 p-4">
            <span className="text-sm font-medium text-gray-400">
              No revenue data available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
