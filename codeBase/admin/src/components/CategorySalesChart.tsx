import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CategorySalesChartProps } from "../types/charts";

export const CategorySalesChart: React.FC<CategorySalesChartProps> = ({
  data,
  title,
  description,
  valueFormatter = (value) => `${value.toLocaleString()} EGP`,
  orientation = "horizontal",
  height = 300,
  className = "",
  ariaLabel,
}) => {
  const isVertical = orientation === "vertical";

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

      {/* Chart */}
      <div style={{ width: "100%", height }}>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={isVertical ? "vertical" : "horizontal"}
              margin={
                isVertical
                  ? { top: 5, right: 20, left: 15, bottom: 5 }
                  : { top: 10, right: 10, left: -10, bottom: 0 }
              }
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={isVertical ? true : false}
                horizontal={isVertical ? false : true}
                stroke="#f1f5f9"
              />

              {isVertical ? (
                <>
                  <XAxis
                    type="number"
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
                  <YAxis
                    dataKey="category"
                    type="category"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey="category"
                    type="category"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    type="number"
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
                </>
              )}

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
                formatter={(value: any) => [
                  <span className="font-semibold text-gray-900">{valueFormatter(Number(value))}</span>,
                  "Sales",
                ]}
              />

              <Bar
                dataKey="sales"
                fill="#2563eb"
                radius={isVertical ? [0, 6, 6, 0] : [6, 6, 0, 0]}
                maxBarSize={isVertical ? 20 : 40}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50 p-4">
            <span className="text-sm font-medium text-gray-400">
              No sales data available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};


export default CategorySalesChart;
