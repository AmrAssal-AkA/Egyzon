export interface ActiveSellersCountData {
  totalSellersActive: number;
  growth: number;
}

export interface PendingSellersCountData {
  totalSellersPending: number;
}

export type TotalRevenueData = number;

export type AnalyticalTimeframe = "7days" | "30days" | "12months";

export interface RevenueSeriesPoint {
  label: string;
  date: string;
  revenue: number;
  orders?: number;
}

export interface RevenuePeakPoint {
  label: string;
  date: string;
  revenue: number;
}

export interface PlatformRevenueGrowthData {
  timeframe: AnalyticalTimeframe;
  totalRevenue: number;
  totalOrders: number;
  AverageOrderValue: number;
  revenueChangePercent: number;
  series: RevenueSeriesPoint[];
  peak: RevenuePeakPoint;
}
