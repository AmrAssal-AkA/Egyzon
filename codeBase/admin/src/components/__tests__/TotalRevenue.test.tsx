import React from "react";
import { render, screen } from "@testing-library/react";
import TotalRevenue from "../totalRevenue";
import { useTotalRevenue } from "../../hooks/useAnalytics";

jest.mock("../../hooks/useAnalytics");

describe("TotalRevenue Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state correctly", () => {
    (useTotalRevenue as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refresh: jest.fn(),
    });

    render(<TotalRevenue />);

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("renders revenue amount with currency when data is loaded", () => {
    (useTotalRevenue as jest.Mock).mockReturnValue({
      data: 154000,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    render(<TotalRevenue />);

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("154,000 EGP")).toBeInTheDocument();
    expect(screen.getByText("Platform Total")).toBeInTheDocument();
  });

  it("renders fallback dash when there is an error", () => {
    (useTotalRevenue as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Failed to fetch total platform revenue",
      refresh: jest.fn(),
    });

    render(<TotalRevenue />);

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
