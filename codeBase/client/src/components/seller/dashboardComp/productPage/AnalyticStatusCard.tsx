"use client"

import React, { useMemo } from 'react'
import { TrendingUp, CircleCheckBig, AlertTriangleIcon } from "lucide-react";

interface AnalyticStatusCardProps {
    title?: string;
    totalInventoryVal?: number;
    InStockRate?: number;
    ReOrderRequired?: number;
}

export default function AnalyticStatusCard({totalInventoryVal, InStockRate, ReOrderRequired }: AnalyticStatusCardProps) {
    const statusData = useMemo(() => {
        const items = [];

        if (totalInventoryVal !== undefined) {
            items.push({
                label: "Total Inventory Value",
                value: new Intl.NumberFormat('en-EG', {
                    style: 'currency',
                    currency: 'EGP',
                    minimumFractionDigits: 1,
                }).format(totalInventoryVal),
                icon: (
                    <div className="w-14 h-14 rounded-full bg-blue-50/80 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                )
            });
        }

        if (InStockRate !== undefined) {
            items.push({
                label: "In Stock Rate",
                value: `${InStockRate}%`,
                icon: (
                    <div className="w-14 h-14 rounded-full bg-emerald-50/80 flex items-center justify-center shrink-0">
                        <CircleCheckBig className="w-6 h-6 text-emerald-600" />
                    </div>
                )
            });
        }

        if (ReOrderRequired !== undefined) {
            items.push({
                label: "Re-Order Required",
                value: ReOrderRequired.toString(),
                icon: (
                    <div className="w-14 h-14 rounded-full bg-amber-50/80 flex items-center justify-center shrink-0">
                        <AlertTriangleIcon className="w-6 h-6 text-amber-600" />
                    </div>
                )
            });
        }

        return items;
    }, [totalInventoryVal, InStockRate, ReOrderRequired]);

    return (
        <div className="flex flex-col gap-4">
            {statusData.map((item, index) => (
                <div 
                    key={index} 
                    className="flex items-center gap-4 p-5  border border-gray-200/70 dark:border-gray-600/70 rounded-2xl shadow-xs"
                >
                    {item.icon}
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase">
                            {item.label}
                        </span>
                        <span className="text-2xl font-bold text-gray-900 tracking-tight dark:text-gray-50">
                            {item.value}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

