import React, { useMemo } from "react";

import { Loader2 } from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useSellerProductsCategory } from "../hooks/useAnalytics";
import type {
  SellerDistributionChartProps,
  SellerDistributionData,
} from "../types/charts";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#6366f1",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

export const SellerDistributionChart: React.FC<SellerDistributionChartProps> = ({
  data: propData,
  totalLabel = "Total Sellers",
  valueFormatter = (value) => value.toLocaleString(),
  title,
  description,
  height = 300,
  className = "",
  ariaLabel,
  isLoading: propIsLoading,
}): React.ReactElement => {
  const isControlledData = Array.isArray(propData);

  const {
    data: liveData,
    isLoading: isLiveLoading,
    error: liveError,
  } = useSellerProductsCategory();

  const isLoading = propIsLoading ?? (!isControlledData && isLiveLoading);

  const chartData: SellerDistributionData[] = useMemo(() => {
    if (isControlledData) return propData ?? [];
    if (!liveData?.categories) return [];

    return liveData.categories.map((cat) => ({
      category: cat.categoryName,
      value: cat.sellerCount,
      percentage: cat.percentage,
    }));
  }, [isControlledData, propData, liveData]);

  const totalSum = useMemo(() => {
    if (!isControlledData && liveData && typeof liveData.total === "number") {
      return liveData.total;
    }
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [isControlledData, liveData, chartData]);

  const donutHeight = Math.max(140, Math.round(height * 0.55));

  return (
    <div
      className={`bg-white border border-gray-200/80 shadow-sm rounded-xl p-5 flex flex-col justify-between ${className}`}
      role="region"
      aria-label={ariaLabel || title}
    >
      {/* Header */}
      {(title || description || chartData.length > 0 || isLoading) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-gray-400 mt-0.5">{description}</p>
            )}
            <div className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">
              {isLoading && chartData.length === 0 ? (
                <span className="text-gray-400 text-lg font-normal">Loading...</span>
              ) : chartData.length > 0 ? (
                valueFormatter(totalSum)
              ) : (
                "No data"
              )}
            </div>
          </div>

          {totalLabel && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 self-start sm:self-center">
              {totalLabel}
            </span>
          )}
        </div>
      )}

      {/* Chart Container */}
      <div style={{ width: "100%", height }}>
        {isLoading && chartData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50 p-4">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin mb-2" />
            <span className="text-xs text-gray-400">Loading seller distribution...</span>
          </div>
        ) : liveError && !isControlledData && chartData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-rose-200 rounded-lg bg-rose-50/30 p-4">
            <span className="text-sm font-medium text-rose-600">
              {liveError}
            </span>
          </div>
        ) : chartData.length > 0 ? (
          <div className="w-full h-full flex flex-col justify-between">
            <div
              className="relative flex items-center justify-center w-full shrink-0"
              style={{ height: donutHeight }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e2e8f0",
                      borderRadius: "8px",
                      boxShadow:
                        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    }}
                    itemStyle={{
                      fontSize: "12px",
                      padding: "0",
                    }}
                    formatter={(
                      value: number | string,
                      name: string,
                      item: { payload?: { percentage?: number } }
                    ) => {
                      const pct = item.payload?.percentage;
                      return [
                        <span className="font-semibold text-gray-900">
                          {valueFormatter(Number(value))}
                          {pct !== undefined ? ` (${pct}%)` : ""}
                        </span>,
                        name,
                      ];
                    }}
                  />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="65%"
                    outerRadius="90%"
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="category"
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  {valueFormatter(totalSum)}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  {totalLabel}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 pt-3 border-t border-gray-100 overflow-y-auto max-h-[120px]">
              {chartData.map((item, index) => {
                const color = COLORS[index % COLORS.length];
                return (
                  <div
                    key={item.category}
                    className="flex items-center justify-between text-sm py-0.5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                      <span className="font-medium text-gray-600 truncate">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-right flex items-center gap-2 shrink-0 pl-2">
                      <span className="font-semibold text-gray-900">
                        {valueFormatter(item.value)}
                      </span>
                      <span className="text-xs text-gray-500 font-medium bg-gray-50 border border-gray-100 rounded px-1.5 py-0.5">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50 p-4">
            <span className="text-sm font-medium text-gray-400">
              No seller distribution data available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDistributionChart;
