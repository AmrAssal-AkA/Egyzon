import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SellerDistributionChartProps } from "../types/charts";

// Modern colors for the donut slices
const COLORS = [
  "#2563eb", // Blue
  "#10b981", // Emerald
  "#6366f1", // Indigo
  "#f59e0b", // Amber
  "#8b5cf6", // Violet
  "#ec4899", // Pink
];

export const SellerDistributionChart: React.FC<SellerDistributionChartProps> = ({
  data,
  totalLabel = "Total Sellers",
  valueFormatter = (value) => value.toLocaleString(),
  title,
  description,
  height = 240,
  className = "",
  ariaLabel,
}) => {
  // Sum of all values for the center display
  const totalSum = useMemo(() => {
    if (!data) return 0;
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  return (
    <div
      className={`bg-white border border-gray-200/80 shadow-sm rounded-xl p-5 flex flex-col justify-between ${className}`}
      role="region"
      aria-label={ariaLabel || title}
    >
      {/* Header */}
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
      )}

      {/* Main Content Area */}
      {data && data.length > 0 ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Donut Chart with absolute overlay center label */}
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{ width: height, height }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  }}
                  itemStyle={{
                    fontSize: "12px",
                    padding: "0",
                  }}
                  formatter={(value: any, name: any, props: any) => {
                    const pct = props.payload.percentage;
                    return [
                      <span className="font-semibold text-gray-900">
                        {valueFormatter(Number(value))} ({pct}%)
                      </span>,
                      name,
                    ];
                  }}
                />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="90%"
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="category"
                >
                  {data.map((_, index) => (
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

            {/* Absolute overlay for the center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {valueFormatter(totalSum)}
              </span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase mt-0.5 tracking-wider">
                {totalLabel}
              </span>
            </div>
          </div>

          {/* Custom Accessible Legend */}
          <div className="flex-1 w-full flex flex-col gap-2.5">
            {data.map((item, index) => {
              const color = COLORS[index % COLORS.length];
              return (
                <div
                  key={item.category}
                  className="flex items-center justify-between text-sm py-0.5"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <span className="font-medium text-gray-600 truncate max-w-[120px] sm:max-w-none">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-right flex items-center gap-2 pl-2">
                    <span className="font-semibold text-gray-900">
                      {valueFormatter(item.value)}
                    </span>
                    <span className="text-xs text-gray-400 font-medium bg-gray-50 border border-gray-100 rounded-md px-1.5 py-0.5">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          style={{ height }}
          className="w-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50 p-4"
        >
          <span className="text-sm font-medium text-gray-400">
            No seller distribution data available
          </span>
        </div>
      )}
    </div>
  );
};

export default SellerDistributionChart;
