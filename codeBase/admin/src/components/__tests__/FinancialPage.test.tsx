import React from "react";
import { AxiosError } from "axios";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AlertProvider } from "../../context/AlertContext";
import FinancialPage from "../../pages/(dashboard)/financial";
import FinancialSummary from "../financial/FinancialSummary";
import PlatformFeeCard from "../financial/PlatformFeeCard";
import SalesOverviewChart from "../financial/SalesOverviewChart";
import WithdrawalRequestsTable from "../financial/WithdrawalRequestsTable";

// Mock react-router-dom for CRA/Jest compatibility
jest.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useNavigate: () => jest.fn(),
}));
import { serverClient } from "../../lib/serverClient";
import {
  getSalesOverviewLast30Days,
  getTotalSales,
  getWithdrawalRequests,
} from "../../services/financial.services";
import type {
  FinancialSummaryMetrics,
  MonthlySalesDataPoint,
  PlatformFeeData,
  SalesOverviewLast30DaysData,
  WithdrawalRequest,
} from "../../types/financial";

// Mock ResponsiveContainer for Recharts in jsdom
jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe("Financial Page and Components Suite", () => {
  const mockSummary: FinancialSummaryMetrics = {
    totalSales: {
      value: 54140000,
      currency: "EGP",
      changePercentage: 16.4,
      trend: "up",
      periodLabel: "Last 12 Months",
    },
    totalPlatformFees: {
      value: 2707000,
      currency: "EGP",
      changePercentage: 16.4,
      trend: "up",
      feeRate: 5,
    },
    pendingWithdrawals: {
      totalAmount: 177950,
      currency: "EGP",
      count: 5,
      changePercentage: 5,
    },
    completedWithdrawals: {
      totalAmount: 309500,
      currency: "EGP",
      count: 5,
      changePercentage: 24.8,
      trend: "up",
    },
  };

  const mockFeeData: PlatformFeeData = {
    feePercentage: 5,
    totalPlatformFees: 2707000,
    totalMarketplaceSales: 54140000,
    lastUpdated: "2026-09-01T00:00:00Z",
    description:
      "Egyzon retains this percentage from all completed marketplace customer transactions across all stores.",
  };

  const mockSalesData: MonthlySalesDataPoint[] = [
    {
      month: "Oct 2025",
      shortMonth: "Oct",
      fullDate: "2025-10-01",
      sales: 3120000,
      platformFees: 156000,
      ordersCount: 4120,
      growthRate: 5.2,
    },
    {
      month: "Nov 2025",
      shortMonth: "Nov",
      fullDate: "2025-11-01",
      sales: 3450000,
      platformFees: 172500,
      ordersCount: 4680,
      growthRate: 10.6,
    },
  ];

  const mockRequests: WithdrawalRequest[] = [
    {
      id: "WDR-8901",
      sellerId: "SEL-101",
      sellerName: "Tarek Mansour",
      sellerEmail: "tarek@cairotech.eg",
      storeName: "Cairo Tech Hub",
      requestedAmount: 48500,
      currency: "EGP",
      requestDate: "2026-09-05T14:30:00Z",
      paymentMethod: "Bank Transfer",
      accountDetails: {
        bankName: "Commercial International Bank (CIB)",
        accountNumber: "100048291039",
        iban: "EG380010004829103900018273645",
      },
      status: "pending",
    },
    {
      id: "WDR-8906",
      sellerId: "SEL-106",
      sellerName: "Youssef Badawi",
      sellerEmail: "youssef@gizagaming.com",
      storeName: "Giza Gaming Gear",
      requestedAmount: 92000,
      currency: "EGP",
      requestDate: "2026-08-31T10:00:00Z",
      paymentMethod: "InstaPay",
      accountDetails: {
        instantHandle: "youssef@instapay",
      },
      status: "approved",
    },
  ];

  describe("Section 4: FinancialSummary Component", () => {
    it("renders all 4 marketplace-wide financial summary metric cards with formatted amounts", () => {
      render(<FinancialSummary summary={mockSummary} />);

      expect(screen.getByText("Total Sales")).toBeInTheDocument();
      expect(screen.getByText("54,140,000 EGP")).toBeInTheDocument();

      expect(screen.getByText("Total Platform Fees")).toBeInTheDocument();
      expect(screen.getByText("2,707,000 EGP")).toBeInTheDocument();

      expect(screen.getByText("Pending Withdrawals")).toBeInTheDocument();
      expect(screen.getByText("177,950 EGP")).toBeInTheDocument();
      expect(screen.getByText("5 requests awaiting review")).toBeInTheDocument();

      expect(screen.getByText("Completed Withdrawals")).toBeInTheDocument();
      expect(screen.getByText("309,500 EGP")).toBeInTheDocument();
      expect(screen.getByText("5 payouts settled")).toBeInTheDocument();
    });

    it("renders custom totalSales value when totalSales prop is provided", () => {
      render(<FinancialSummary summary={mockSummary} totalSales={125430.5} />);

      expect(screen.getByText("Total Sales")).toBeInTheDocument();
      expect(screen.getByText("125,430.5 EGP")).toBeInTheDocument();
    });

    it("renders loading state for Total Sales when isTotalSalesLoading is true", () => {
      render(
        <FinancialSummary
          summary={mockSummary}
          isTotalSalesLoading={true}
        />
      );

      expect(screen.getByText("Total Sales")).toBeInTheDocument();
      expect(screen.queryByText("54,140,000 EGP")).not.toBeInTheDocument();
    });

    it("renders custom completedWithdrawalCount value when completedWithdrawalCount prop is provided", () => {
      render(
        <FinancialSummary
          summary={mockSummary}
          completedWithdrawalCount={24}
        />
      );

      expect(screen.getByText("Completed Withdrawals")).toBeInTheDocument();
      expect(screen.getByText("24 payouts settled")).toBeInTheDocument();
    });

    it("renders loading state for Completed Withdrawals count when isCompletedWithdrawalCountLoading is true", () => {
      render(
        <FinancialSummary
          summary={mockSummary}
          isCompletedWithdrawalCountLoading={true}
        />
      );

      expect(screen.getByText("Completed Withdrawals")).toBeInTheDocument();
      expect(screen.queryByText("5 payouts settled")).not.toBeInTheDocument();
    });

    it("renders error state when totalSalesError is provided and totalSales is null", () => {
      render(
        <FinancialSummary
          summary={mockSummary}
          totalSales={null}
          totalSalesError="Failed to fetch total sales"
        />
      );

      expect(screen.getByText("Total Sales")).toBeInTheDocument();
      expect(screen.getByText("Failed to load total sales")).toBeInTheDocument();
    });
  });

  describe("Section 2: PlatformFeeCard Component", () => {
    it("renders the 5% platform fee percentage and explanation", () => {
      render(<PlatformFeeCard data={mockFeeData} />);

      expect(screen.getByText("Platform Fee")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("%")).toBeInTheDocument();
      expect(
        screen.getByText(/represents the fixed marketplace commission Egyzon takes/i)
      ).toBeInTheDocument();
    });
  });

  describe("Section 1: SalesOverviewChart Component", () => {
    it("renders the 12-month sales overview chart with title, total sales, and trend indicator", () => {
      render(<SalesOverviewChart data={mockSalesData} />);

      expect(screen.getByText("Sales Overview")).toBeInTheDocument();
      expect(screen.getByText("Entire Marketplace")).toBeInTheDocument();
      expect(screen.getByText("6,570,000 EGP")).toBeInTheDocument(); // 3120000 + 3450000
      expect(screen.getByText(/Overall Trend/i)).toBeInTheDocument();
      expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    });

    it("renders the 30-day sales overview chart with overview prop, AOV, orders, and peak metrics", () => {
      const mock30DaysOverview: SalesOverviewLast30DaysData = {
        timeframe: "30days",
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
        ],
        peak: {
          label: "2026-08-25",
          date: "2026-08-25",
          revenue: 21000,
        },
      };

      render(<SalesOverviewChart overview={mock30DaysOverview} />);

      expect(screen.getByText("Sales Overview")).toBeInTheDocument();
      expect(screen.getByText("154,000.5 EGP")).toBeInTheDocument();
      expect(screen.getByText("+12.5% vs previous 30 days")).toBeInTheDocument();
      expect(screen.getByText("440 EGP")).toBeInTheDocument();
      expect(screen.getByText("350")).toBeInTheDocument();
      expect(screen.getByText("Last 30 Days")).toBeInTheDocument();
    });
  });

  describe("Section 3: WithdrawalRequestsTable Component", () => {
    it("renders table columns, seller information, payment method, and status badges", () => {
      render(
        <WithdrawalRequestsTable
          requests={mockRequests}
          pagination={{ page: 1, limit: 6, total: 2, totalPages: 1 }}
          counts={{ all: 2, pending: 1, approved: 1, rejected: 0 }}
          isLoading={false}
          error={null}
          filters={{ status: "all", searchQuery: "" }}
          onFilterChange={jest.fn()}
          onApprove={jest.fn()}
          onReject={jest.fn()}
          onRefresh={jest.fn()}
          actionInProgressId={null}
        />
      );

      // Check column headers
      expect(screen.getByText("Seller")).toBeInTheDocument();
      expect(screen.getByText("Store Name")).toBeInTheDocument();
      expect(screen.getByText("Requested Amount")).toBeInTheDocument();
      expect(screen.getByText("Request Date")).toBeInTheDocument();
      expect(screen.getByText("Payment Method")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();

      // Check request data
      expect(screen.getByText("Tarek Mansour")).toBeInTheDocument();
      expect(screen.getByText("Cairo Tech Hub")).toBeInTheDocument();
      expect(screen.getByText("48,500 EGP")).toBeInTheDocument();
      expect(screen.getByText("Pending Review")).toBeInTheDocument();

      expect(screen.getByText("Youssef Badawi")).toBeInTheDocument();
      expect(screen.getByText("Giza Gaming Gear")).toBeInTheDocument();
      expect(screen.getByText("92,000 EGP")).toBeInTheDocument();
      expect(screen.getAllByText("Approved").length).toBeGreaterThanOrEqual(1);
    });

    it("displays the exact required message 'No withdrawal requests' when empty", () => {
      render(
        <WithdrawalRequestsTable
          requests={[]}
          pagination={{ page: 1, limit: 6, total: 0, totalPages: 1 }}
          counts={{ all: 0, pending: 0, approved: 0, rejected: 0 }}
          isLoading={false}
          error={null}
          filters={{ status: "all", searchQuery: "nonexistent-seller" }}
          onFilterChange={jest.fn()}
          onApprove={jest.fn()}
          onReject={jest.fn()}
          onRefresh={jest.fn()}
          actionInProgressId={null}
        />
      );

      expect(screen.getByText("No withdrawal requests")).toBeInTheDocument();
    });

    it("opens the confirmation modal when clicking Approve on a pending request", async () => {
      const handleApprove = jest.fn().mockResolvedValue(true);

      render(
        <WithdrawalRequestsTable
          requests={mockRequests}
          pagination={{ page: 1, limit: 6, total: 2, totalPages: 1 }}
          counts={{ all: 2, pending: 1, approved: 1, rejected: 0 }}
          isLoading={false}
          error={null}
          filters={{ status: "all", searchQuery: "" }}
          onFilterChange={jest.fn()}
          onApprove={handleApprove}
          onReject={jest.fn()}
          onRefresh={jest.fn()}
          actionInProgressId={null}
        />
      );

      const approveButton = screen.getByRole("button", {
        name: "Approve request WDR-8901",
      });
      fireEvent.click(approveButton);

      // Modal should appear
      expect(screen.getByText("Confirm Payout Approval")).toBeInTheDocument();
      expect(
        screen.getByText(/Controlled Financial Action:/i)
      ).toBeInTheDocument();

      const confirmButton = screen.getByRole("button", {
        name: "Confirm & Approve Payout",
      });
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(handleApprove).toHaveBeenCalledWith("WDR-8901");
      });
    });

    it("opens the rejection modal with reason selection when clicking Reject", async () => {
      const handleReject = jest.fn().mockResolvedValue(true);

      render(
        <WithdrawalRequestsTable
          requests={mockRequests}
          pagination={{ page: 1, limit: 6, total: 2, totalPages: 1 }}
          counts={{ all: 2, pending: 1, approved: 1, rejected: 0 }}
          isLoading={false}
          error={null}
          filters={{ status: "all", searchQuery: "" }}
          onFilterChange={jest.fn()}
          onApprove={jest.fn()}
          onReject={handleReject}
          onRefresh={jest.fn()}
          actionInProgressId={null}
        />
      );

      const rejectButton = screen.getByRole("button", {
        name: "Reject request WDR-8901",
      });
      fireEvent.click(rejectButton);

      expect(
        screen.getByText("Confirm Withdrawal Rejection")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Select Rejection Audit Reason")
      ).toBeInTheDocument();

      const confirmRejectBtn = screen.getByRole("button", {
        name: "Confirm Rejection",
      });
      fireEvent.click(confirmRejectBtn);

      await waitFor(() => {
        expect(handleReject).toHaveBeenCalled();
      });
    });
  });

  describe("Complete Financial Page Container", () => {
    it("renders the Financial page header and all primary sections", async () => {
      render(
        <AlertProvider>
          <FinancialPage />
        </AlertProvider>
      );

      // Page Header
      expect(
        screen.getByRole("heading", { name: "Financial Management" })
      ).toBeInTheDocument();
      expect(screen.getByText("Admin Executive Center")).toBeInTheDocument();
      expect(screen.getByText("Live Marketplace Sync")).toBeInTheDocument();
      expect(screen.getByText("Export Report")).toBeInTheDocument();

      // Section 4
      expect(
        screen.getByRole("region", {
          name: "Marketplace Financial Summary",
        })
      ).toBeInTheDocument();

      // Section 1
      expect(
        screen.getByRole("region", { name: "Sales Overview Chart" })
      ).toBeInTheDocument();

      // Section 2
      expect(
        screen.getByRole("region", { name: "Marketplace Platform Fee" })
      ).toBeInTheDocument();

      // Section 3
      expect(
        screen.getByRole("region", { name: "Seller Withdrawal Requests" })
      ).toBeInTheDocument();
    });
  });

  describe("getWithdrawalRequests API integration", () => {
    it("calls /getAllSellerWithdrawlRequests with page, bounded limit, and mapped status param", async () => {
      const getSpy = jest.spyOn(serverClient, "get").mockResolvedValueOnce({
        data: {
          success: true,
          message: "Request completed successfully",
          data: {
            withdrawalRequests: [
              {
                _id: "66d1f2e3a4b5c6d7e8f9a0b1",
                seller: {
                  _id: "66d1f2e3a4b5c6d7e8f9a0b2",
                  FirstName: "Ahmed",
                  LastName: "Ali",
                  email: "seller@example.com",
                  storeName: "Cairo Tech",
                  bankAccount: {
                    issuer: "bank_card",
                    fullName: "Ahmed Hassan",
                    last4: "3456",
                    BankCode: "CIB",
                    status: "pending_verification",
                  },
                },
                balance: 8500,
                status: "completed",
              },
            ],
            pagination: {
              page: 1,
              limit: 10,
              total: 1,
              totalPages: 1,
            },
          },
        },
      });

      const res = await getWithdrawalRequests({
        page: 1,
        limit: 150, // should be clamped to 100 max
        status: "approved", // maps to "completed" for backend
      });

      expect(getSpy).toHaveBeenCalledWith("/getAllSellerWithdrawlRequests", {
        params: {
          page: 1,
          limit: 100,
          status: "completed",
        },
      });

      expect(res.success).toBe(true);
      expect(res.data?.requests).toHaveLength(1);
      expect(res.data?.requests[0].sellerName).toBe("Ahmed Ali");
      expect(res.data?.requests[0].requestedAmount).toBe(8500);
      expect(res.data?.requests[0].status).toBe("approved");

      getSpy.mockRestore();
    });
  });

  describe("getTotalSales API integration", () => {
    it("calls /getTotalSales and returns total sales data from backend without mock fallback", async () => {
      const getSpy = jest.spyOn(serverClient, "get").mockResolvedValueOnce({
        data: {
          success: true,
          message: "Request completed successfully",
          data: {
            totalSales: 125430.5,
          },
        },
      });

      const res = await getTotalSales();

      expect(getSpy).toHaveBeenCalledWith("/getTotalSales");
      expect(res.success).toBe(true);
      expect(res.message).toBe("Request completed successfully");
      expect(res.data?.totalSales).toBe(125430.5);

      getSpy.mockRestore();
    });

    it("handles error response and does not return mock or dummy data", async () => {
      const axiosError = new AxiosError(
        "Request failed with status code 401",
        "401",
        undefined,
        undefined,
        {
          status: 401,
          statusText: "Unauthorized",
          headers: {},
          config: {} as any,
          data: {
            success: false,
            message: "Something went wrong",
            error: "Unauthorized",
          },
        }
      );

      const getSpy = jest.spyOn(serverClient, "get").mockRejectedValueOnce(axiosError);

      const res = await getTotalSales();

      expect(getSpy).toHaveBeenCalledWith("/getTotalSales");
      expect(res.success).toBe(false);
      expect(res.message).toBe("Something went wrong");
      expect(res.data).toBeUndefined();

      getSpy.mockRestore();
    });
  });

  describe("getSalesOverviewLast30Days API integration", () => {
    it("calls /get-salesOverview-last30days and returns 30-day analytics data without mock fallback", async () => {
      const mockOverview: SalesOverviewLast30DaysData = {
        timeframe: "30days",
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
        ],
        peak: {
          label: "2026-08-25",
          date: "2026-08-25",
          revenue: 21000,
        },
      };

      const getSpy = jest.spyOn(serverClient, "get").mockResolvedValueOnce({
        data: {
          success: true,
          message: "Sales overview for the last 30 days retrieved successfully",
          data: mockOverview,
        },
      });

      const res = await getSalesOverviewLast30Days();

      expect(getSpy).toHaveBeenCalledWith("/get-salesOverview-last30days");
      expect(res.success).toBe(true);
      expect(res.data?.totalRevenue).toBe(154000.5);
      expect(res.data?.totalOrders).toBe(350);
      expect(res.data?.AverageOrderValue).toBe(440);

      getSpy.mockRestore();
    });

    it("handles error response and does not return mock or dummy data", async () => {
      const axiosError = new AxiosError(
        "Request failed with status code 401",
        "401",
        undefined,
        undefined,
        {
          status: 401,
          statusText: "Unauthorized",
          headers: {},
          config: {} as any,
          data: {
            success: false,
            message: "Something went wrong",
            error: "Unauthorized",
          },
        }
      );

      const getSpy = jest.spyOn(serverClient, "get").mockRejectedValueOnce(axiosError);

      const res = await getSalesOverviewLast30Days();

      expect(getSpy).toHaveBeenCalledWith("/get-salesOverview-last30days");
      expect(res.success).toBe(false);
      expect(res.message).toBe("Something went wrong");
      expect(res.data).toBeUndefined();

      getSpy.mockRestore();
    });
  });
});
