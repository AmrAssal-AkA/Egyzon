

export enum AnalyticalDateTimeframe {
    SEVEN_DAYS = "7days",
    THIRTY_DAYS = "30days",
    twelve_MONTHS = "12months",
}


export interface AnalyticalDataPoint {
    label: string;
    date: string;
    revenue: number;
    orders: number;
}



export interface AnalyticalData {
    timeframe: AnalyticalDateTimeframe;
    totalRevenue: number;
    totalOrders: number;
    AverageOrderValue: number;
    revenueChangePercent: number;
    series: AnalyticalDataPoint[];
    peak: {
        label: string;
        date: string;
        revenue: number;
    };
}