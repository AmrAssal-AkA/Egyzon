"use client";

import React, { useState, useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useTotalRevenue } from "@/hooks/useSeller"

interface RevenueDataPoint {
  date: string
  revenue: number
  hasNode?: boolean
}

const CustomDot = (props: { cx?: number; cy?: number; payload?: RevenueDataPoint }) => {
  const { cx, cy, payload } = props
  if (cx === undefined || cy === undefined || !payload?.hasNode) {
    return <circle cx={0} cy={0} r={0} fill="none" />
  }

  return (
    <g key={`${cx}-${cy}`}>
      <ellipse
        cx={cx}
        cy={cy}
        rx={12}
        ry={7}
        fill="#ffffff"
        stroke="#0052CC"
        strokeWidth={4}
        className="transition-all duration-200 hover:scale-110"
      />
    </g>
  )
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; payload: RevenueDataPoint }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white/95 p-3 shadow-lg backdrop-blur-xs dark:border-slate-700 dark:bg-slate-900/95">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-sm font-bold text-[#0052CC] dark:text-blue-400">
          {payload[0].value.toLocaleString()} EGP
        </p>
      </div>
    )
  }
  return null
}

export default function RevenueGraph() {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly">("daily")
  const { totalRevenue } = useTotalRevenue()

  const currentData = useMemo<RevenueDataPoint[]>(() => {
    const rev = totalRevenue || 0
    if (timeframe === "daily") {
      const days = [
        { date: "Oct 1", weight: 0.08, hasNode: false },
        { date: "Oct 5", weight: 0.11, hasNode: true },
        { date: "Oct 12", weight: 0.14, hasNode: true },
        { date: "Oct 15", weight: 0.10, hasNode: false },
        { date: "Oct 18", weight: 0.18, hasNode: true },
        { date: "Oct 22", weight: 0.15, hasNode: true },
        { date: "Oct 26", weight: 0.10, hasNode: false },
        { date: "Oct 30", weight: 0.14, hasNode: true },
      ]
      return days.map((d) => ({
        date: d.date,
        revenue: Math.round(rev * d.weight),
        hasNode: d.hasNode,
      }))
    } else {
      const weeks = [
        { date: "Week 1", weight: 0.15, hasNode: true },
        { date: "Week 2", weight: 0.20, hasNode: true },
        { date: "Week 3", weight: 0.25, hasNode: true },
        { date: "Week 4", weight: 0.18, hasNode: true },
        { date: "Week 5", weight: 0.22, hasNode: true },
      ]
      return weeks.map((w) => ({
        date: w.date,
        revenue: Math.round(rev * w.weight),
        hasNode: w.hasNode,
      }))
    }
  }, [totalRevenue, timeframe])


  return (
    <Card className="w-full rounded-2xl border border-slate-100/80 bg-[#f8fbff] shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pt-6 pb-2">
        <h2 className="font-serif text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
          Revenue Over Time
        </h2>
        <div className="flex items-center gap-1 rounded-xl bg-slate-100/60 p-1 dark:bg-slate-800/60">
          <button
            type="button"
            onClick={() => setTimeframe("daily")}
            className={`rounded-lg px-3.5 py-1 text-xs font-medium transition-all ${
              timeframe === "daily"
                ? "bg-[#eef4ff] text-[#0052CC] shadow-2xs font-semibold dark:bg-blue-950/80 dark:text-blue-300"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Daily
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("weekly")}
            className={`rounded-lg px-3.5 py-1 text-xs font-medium transition-all ${
              timeframe === "weekly"
                ? "bg-[#eef4ff] text-[#0052CC] shadow-2xs font-semibold dark:bg-blue-950/80 dark:text-blue-300"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Weekly
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 pb-6 sm:px-6">
        <div className="h-64 sm:h-72 w-full min-w-0 min-h-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart
              data={currentData}
              margin={{ top: 20, right: 25, left: 25, bottom: 10 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0052CC" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#0052CC" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
                opacity={0.4}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 400 }}
                dy={12}
                ticks={
                  timeframe === "daily"
                    ? ["Oct 1", "Oct 8", "Oct 15", "Oct 22", "Oct 30"]
                    : undefined
                }
              />
              <YAxis hide domain={["dataMin - 30", "dataMax + 40"]} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0052CC"
                strokeWidth={5}
                fillOpacity={1}
                fill="url(#revenueGradient)"
                dot={<CustomDot />}
                activeDot={{
                  r: 8,
                  stroke: "#0052CC",
                  strokeWidth: 4,
                  fill: "#ffffff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
