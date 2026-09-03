import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RevenueChart from "../RevenueChart";
import { usePlatformRevenueGrowth } from "../../hooks/useAnalytics";
import type { PlatformRevenueGrowthData } from "../../types/analytics";

jest.mock("../../hooks/useAnalytics", () => ({
  ...jest.requireActual("../../hooks/useAnalytics"),
  usePlatformRevenueGrowth: jest.fn(),
}));

// Mock ResponsiveContainer and AreaChart to prevent recharts sizing warnings in jsdom
jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe("RevenueChart Component", () => {
  const mockRevenueGrowthData: PlatformRevenueGrowthData = {
    timeframe: "7days",
    totalRevenue: 154000.5,
    totalOrders: 350,
    AverageOrderValue: 440,
    revenueChangePercent: 12.5,
    series: [
      {
        label: "2026-08-25",
        date: "2026-08-25",
        revenue: 2100,
        orders: 5,
      },
      {
        label: "2026-08-26",
        date: "2026-08-26",
        revenue: 3500,
        orders: 8,
      },
    ],
    peak: {
      label: "2026-08-26",
      date: "2026-08-26",
      revenue: 21000,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders live data with KPIs, badges, and orders correctly", () => {
    (usePlatformRevenueGrowth as jest.Mock).mockReturnValue({
      data: mockRevenueGrowthData,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    render(<RevenueChart />);

    expect(screen.getByText("Revenue Growth")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByText("154,000.5 EGP")).toBeInTheDocument();
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
    expect(screen.getByText("350 orders")).toBeInTheDocument();
    expect(screen.getByText("440 EGP")).toBeInTheDocument();
    expect(screen.getByText("21,000 EGP")).toBeInTheDocument();
  });

  it("renders controlled data when passed explicitly via prop", () => {
    (usePlatformRevenueGrowth as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    render(
      <RevenueChart
        data={[
          { date: "2026-08-01", revenue: 50000 },
          { date: "2026-08-02", revenue: 75000 },
        ]}
        period="7D"
      />
    );

    expect(screen.getByText("75,000 EGP")).toBeInTheDocument();
    expect(screen.queryByText("Live")).not.toBeInTheDocument();
  });

  it("renders loading state when fetching live data", () => {
    (usePlatformRevenueGrowth as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refresh: jest.fn(),
    });

    render(<RevenueChart />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByText("Loading revenue analytics...")).toBeInTheDocument();
  });

  it("renders empty fallback when data has no points", () => {
    (usePlatformRevenueGrowth as jest.Mock).mockReturnValue({
      data: {
        ...mockRevenueGrowthData,
        series: [],
      },
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    render(<RevenueChart />);

    expect(screen.getByText("No revenue data available")).toBeInTheDocument();
  });

  it("calls onPeriodChange when a timeframe button is clicked", () => {
    (usePlatformRevenueGrowth as jest.Mock).mockReturnValue({
      data: mockRevenueGrowthData,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    const handlePeriodChange = jest.fn();
    render(<RevenueChart period="7D" onPeriodChange={handlePeriodChange} />);

    const thirtyDayButton = screen.getByRole("button", { name: "30D" });
    fireEvent.click(thirtyDayButton);

    expect(handlePeriodChange).toHaveBeenCalledWith("30D");
  });
});
