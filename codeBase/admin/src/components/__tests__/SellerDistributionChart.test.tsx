import React from "react";
import { render, screen } from "@testing-library/react";
import SellerDistributionChart from "../SellerDistributionChart";
import { useSellerProductsCategory } from "../../hooks/useAnalytics";
import type { SellerProductsCategoryData } from "../../types/analytics";

jest.mock("../../hooks/useAnalytics", () => ({
  ...jest.requireActual("../../hooks/useAnalytics"),
  useSellerProductsCategory: jest.fn(),
}));

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe("SellerDistributionChart Component", () => {
  const mockCategoryData: SellerProductsCategoryData = {
    total: 45,
    categories: [
      {
        categoryId: "66a1f2f3d4c5b6a7c8d9e0f1",
        categoryName: "Electronics",
        sellerCount: 12,
        percentage: 26.67,
      },
      {
        categoryId: "66a1f2f3d4c5b6a7c8d9e0f2",
        categoryName: "Fashion",
        sellerCount: 18,
        percentage: 40.0,
      },
      {
        categoryId: "66a1f2f3d4c5b6a7c8d9e0f3",
        categoryName: "Home Goods",
        sellerCount: 15,
        percentage: 33.33,
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders live data with categories, counts, and percentages", () => {
    (useSellerProductsCategory as jest.Mock).mockReturnValue({
      data: mockCategoryData,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    render(
      <SellerDistributionChart
        title="Seller Distribution"
        description="Active sellers grouped by category."
      />
    );

    expect(screen.getByText("Seller Distribution")).toBeInTheDocument();
    expect(screen.getByText("Active sellers grouped by category.")).toBeInTheDocument();
    expect(screen.getAllByText("45").length).toBeGreaterThan(0);
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("26.67%")).toBeInTheDocument();
    expect(screen.getByText("Fashion")).toBeInTheDocument();
    expect(screen.getByText("Home Goods")).toBeInTheDocument();
  });

  it("renders controlled data when passed explicitly via data prop", () => {
    (useSellerProductsCategory as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    render(
      <SellerDistributionChart
        data={[
          { category: "Books", value: 50, percentage: 100 },
        ]}
        title="Custom Distribution"
      />
    );

    expect(screen.getByText("Custom Distribution")).toBeInTheDocument();
    expect(screen.getByText("Books")).toBeInTheDocument();
    expect(screen.getAllByText("50").length).toBeGreaterThan(0);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders loading state when fetching live data", () => {
    (useSellerProductsCategory as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refresh: jest.fn(),
    });

    render(<SellerDistributionChart title="Seller Distribution" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByText("Loading seller distribution...")).toBeInTheDocument();
  });

  it("renders error state when fetch fails", () => {
    (useSellerProductsCategory as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Failed to fetch seller products category distribution",
      refresh: jest.fn(),
    });

    render(<SellerDistributionChart title="Seller Distribution" />);

    expect(
      screen.getByText("Failed to fetch seller products category distribution")
    ).toBeInTheDocument();
  });

  it("renders empty state when no categories are present", () => {
    (useSellerProductsCategory as jest.Mock).mockReturnValue({
      data: {
        total: 0,
        categories: [],
      },
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    render(<SellerDistributionChart title="Seller Distribution" />);

    expect(screen.getByText("No seller distribution data available")).toBeInTheDocument();
  });
});
