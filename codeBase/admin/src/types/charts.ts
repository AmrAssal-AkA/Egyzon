import type { AnalyticalTimeframe } from "./analytics";

export type RevenueData = {
  date: string;
  revenue: number;
  orders?: number;
  label?: string;
};

export type SellerDistributionData = {
  category: string;
  value: number;
  percentage: number;
};

export type CategorySalesData = {
  category: string;
  sales: number;
};

export interface RevenueChartProps {
  data?: RevenueData[];
  title?: string;
  description?: string;
  valueFormatter?: (value: number) => string;
  period?: string;
  onPeriodChange?: (period: string) => void;
  timeframe?: AnalyticalTimeframe;
  onTimeframeChange?: (timeframe: AnalyticalTimeframe) => void;
  height?: number;
  className?: string;
  ariaLabel?: string;
  isLoading?: boolean;
}

export interface SellerDistributionChartProps {
  data?: SellerDistributionData[];
  totalLabel?: string;
  valueFormatter?: (value: number) => string;
  title?: string;
  description?: string;
  height?: number;
  className?: string;
  ariaLabel?: string;
  isLoading?: boolean;
}

export interface CategorySalesChartProps {
  data: CategorySalesData[];
  title: string;
  description?: string;
  valueFormatter?: (value: number) => string;
  orientation?: "horizontal" | "vertical";
  height?: number;
  className?: string;
  ariaLabel?: string;
}
