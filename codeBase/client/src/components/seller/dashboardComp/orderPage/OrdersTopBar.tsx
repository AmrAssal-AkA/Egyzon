"use client";

import React from "react";
import { Search, Filter, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface OrdersTopBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
  onSortChange: (value: "date-desc" | "date-asc" | "amount-desc" | "amount-asc") => void;
  onExport: () => void;
}

export default function OrdersTopBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onExport,
}: OrdersTopBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-serif">
          Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage and fulfill your customer orders.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center flex-wrap sm:flex-nowrap gap-2.5 w-full sm:w-auto">
        {/* Search Box */}
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full sm:w-56 md:w-60 shadow-xs"
          />
        </div>

        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 h-10 px-3.5 gap-2 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 shadow-xs shrink-0">
            <Filter className="h-4 w-4 text-slate-500" />
            <span>Filter</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Sort & Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onSortChange("date-desc")}
              className="flex items-center justify-between cursor-pointer text-xs"
            >
              <span>Newest First</span>
              {sortBy === "date-desc" && <Check className="h-4 w-4 text-blue-600" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSortChange("date-asc")}
              className="flex items-center justify-between cursor-pointer text-xs"
            >
              <span>Oldest First</span>
              {sortBy === "date-asc" && <Check className="h-4 w-4 text-blue-600" />}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onSortChange("amount-desc")}
              className="flex items-center justify-between cursor-pointer text-xs"
            >
              <span>Highest Amount</span>
              {sortBy === "amount-desc" && <Check className="h-4 w-4 text-blue-600" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSortChange("amount-asc")}
              className="flex items-center justify-between cursor-pointer text-xs"
            >
              <span>Lowest Amount</span>
              {sortBy === "amount-asc" && <Check className="h-4 w-4 text-blue-600" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Export Button */}
        <Button
          onClick={onExport}
          className="gap-2 h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-xs shadow-blue-500/20 cursor-pointer shrink-0"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
}
