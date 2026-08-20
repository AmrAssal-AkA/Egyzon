"use client"

import * as React from "react"
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

const categoryData = [
  { category: "Electronics", value: 60, color: "#0052CC" },
  { category: "Home", value: 25, color: "#B0CAE6" },
  { category: "Fashion", value: 15, color: "#DDE9F8" },
]

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ payload: (typeof categoryData)[0] }>
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded-xl border border-slate-100 bg-white/95 p-2.5 shadow-lg backdrop-blur-xs dark:border-slate-700 dark:bg-slate-900/95">
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            {data.category}:
          </span>
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
            {data.value}%
          </span>
        </div>
      </div>
    )
  }
  return null
}

export function ChartPieDonutText() {
  return (
    <Card className="w-full rounded-2xl border border-slate-100/80 bg-[#f8fbff] shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
      <CardHeader className="px-6 pt-6 pb-2">
        <h2 className="font-serif text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
          Sales by Category
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-6 pt-2 pb-6">
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
                      )
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
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

