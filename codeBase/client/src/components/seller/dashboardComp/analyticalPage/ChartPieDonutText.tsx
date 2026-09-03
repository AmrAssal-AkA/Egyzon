"use client";

import React, { useMemo } from "react";
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSalesByCategory } from "@/hooks/useSeller";
import { SalesByCategoryData } from "@/types/seller";

const COLOR_PALETTE = [
  "#0052CC",
  "#2684FF",
  "#4C9AFF",
  "#79B3FF",
  "#A3CDFF",
  "#C8E1FF",
  "#4A90E2",
  "#5C6BC0",
];

export interface CategoryChartItem {
  category: string;
  revenue: number;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: CategoryChartItem }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-100 bg-white/95 p-2.5 shadow-lg backdrop-blur-xs dark:border-slate-700 dark:bg-slate-900/95">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {data.category}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {data.value}%
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {data.revenue.toLocaleString()} EGP
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

interface ChartPieDonutTextProps {
  data?: SalesByCategoryData;
}

export function ChartPieDonutText({ data: propData }: ChartPieDonutTextProps) {
  const { salesByCategory, isLoading } = useSalesByCategory();

  const activeData = propData !== undefined ? propData : salesByCategory;

  const categoryData = useMemo<CategoryChartItem[]>(() => {
    if (!activeData || typeof activeData !== "object") return [];

    const entries = Object.entries(activeData).filter(
      ([, revenue]) => typeof revenue === "number" && revenue > 0
    );

    const totalRevenue = entries.reduce((sum, [, rev]) => sum + Number(rev), 0);

    return entries.map(([category, revenue], index) => {
      const numericRevenue = Number(revenue);
      const percentage =
        totalRevenue > 0
          ? Math.round((numericRevenue / totalRevenue) * 100)
          : 0;

      return {
        category,
        revenue: numericRevenue,
        value: percentage,
        color: COLOR_PALETTE[index % COLOR_PALETTE.length],
      };
    });
  }, [activeData]);

  return (
    <Card className="w-full rounded-2xl border border-slate-100/80 bg-[#f8fbff] shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
      <CardHeader className="px-6 pt-6 pb-2">
        <h2 className="font-serif text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
          Sales by Category
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-6 pt-2 pb-6">
        {isLoading && propData === undefined ? (
          <div className="flex flex-col items-center justify-center w-full py-6 space-y-4">
            <div className="h-48 w-48 rounded-full border-8 border-slate-200/80 border-t-blue-500 animate-spin dark:border-slate-800" />
            <div className="w-full space-y-2 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-5 w-full bg-slate-200/60 dark:bg-slate-800 rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : categoryData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
            <PieChartIcon className="h-10 w-10 stroke-1 text-slate-400 mb-2" />
            <p className="text-sm font-medium">No sales by category data found</p>
          </div>
        ) : (
          <>
            <div className="relative h-60 w-full max-w-60 min-w-0 min-h-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="category"
                    innerRadius={68}
                    outerRadius={95}
                    strokeWidth={0}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 6}
                                className="fill-slate-900 text-3xl font-extrabold tracking-tight dark:fill-slate-100"
                              >
                                100%
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 18}
                                className="fill-slate-500 text-[11px] font-medium uppercase tracking-wider dark:fill-slate-400"
                              >
                                TOTAL SHARE
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Legend List */}
            <div className="mt-4 w-full space-y-3.5 px-3">
              {categoryData.map((item) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3.5 w-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.revenue.toLocaleString()} EGP
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

