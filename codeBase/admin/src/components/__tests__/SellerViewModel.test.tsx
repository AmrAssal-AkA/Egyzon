import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SellerViewModel from "../sellers/sellerViewModel";
import type { Seller } from "../../types/seller";
import {
  approveSellerBankAccount,
  rejectSellerBankAccount,
} from "../../services/seller.services";

jest.mock("../../services/seller.services", () => ({
  ...jest.requireActual("../../services/seller.services"),
  approveSellerBankAccount: jest.fn(),
  rejectSellerBankAccount: jest.fn(),
}));

describe("SellerViewModel Component - Bank Account Integration", () => {
  const mockSellerWithBank: Seller = {
    id: "seller-123",
    storeName: "Tech Hub Store",
    businessId: "CR-98765",
    ownerName: "Amr Assal",
    ownerEmail: "amr@egyzon.com",
    submittedAt: "Sep 6, 2026",
    submittedRelative: "Today",
    riskScore: 92,
    status: "pending",
    commercialRegisterNumber: "CR-98765",
    taxCardNumber: "TX-43210",
    bankAccount: {
      bankName: "Commercial International Bank (CIB)",
      accountHolderName: "Amr Assal",
      accountNumber: "100029384756",
      iban: "EG380010002938475600000000000",
      swiftCode: "CIBEEGCA",
      status: "pending",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Bank Account tab and displays banking credentials", () => {
    render(
      <SellerViewModel
        seller={mockSellerWithBank}
        isOpen={true}
        onClose={jest.fn()}
      />,
    );

    // Overview shows linked bank account card
    expect(screen.getByText("Linked Bank Account")).toBeInTheDocument();
    expect(
      screen.getByText("Commercial International Bank (CIB)"),
    ).toBeInTheDocument();

    // Switch to Bank Account tab
    const bankTabButton = screen.getByRole("button", { name: /Bank Account/i });
    fireEvent.click(bankTabButton);

    // Verifies credentials are shown
    expect(
      screen.getByText("Banking Credentials & Payout Information"),
    ).toBeInTheDocument();
    expect(screen.getByText("100029384756")).toBeInTheDocument();
    expect(
      screen.getByText("EG380010002938475600000000000"),
    ).toBeInTheDocument();
    expect(screen.getByText("CIBEEGCA")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Approve Bank Account/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reject Bank Account/i }),
    ).toBeInTheDocument();
  });

  it("calls onApproveBankAccount prop when provided", async () => {
    const handleApproveBank = jest.fn().mockResolvedValue(undefined);

    render(
      <SellerViewModel
        seller={mockSellerWithBank}
        isOpen={true}
        onClose={jest.fn()}
        onApproveBankAccount={handleApproveBank}
      />,
    );

    const bankTabButton = screen.getByRole("button", { name: /Bank Account/i });
    fireEvent.click(bankTabButton);

    const approveButton = screen.getByRole("button", {
      name: /Approve Bank Account/i,
    });
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(handleApproveBank).toHaveBeenCalledWith(mockSellerWithBank);
      expect(
        screen.getByText(
          "Seller bank account verified and approved successfully.",
        ),
      ).toBeInTheDocument();
    });
  });

  it("calls approveSellerBankAccount service when no callback prop is passed", async () => {
    (approveSellerBankAccount as jest.Mock).mockResolvedValue({
      success: true,
      message: "Seller bank account status updated successfully",
    });

    render(
      <SellerViewModel
        seller={mockSellerWithBank}
        isOpen={true}
        onClose={jest.fn()}
      />,
    );

    const bankTabButton = screen.getByRole("button", { name: /Bank Account/i });
    fireEvent.click(bankTabButton);

    const approveButton = screen.getByRole("button", {
      name: /Approve Bank Account/i,
    });
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(approveSellerBankAccount).toHaveBeenCalledWith("seller-123");
      expect(
        screen.getByText(
          "Seller bank account verified and approved successfully.",
        ),
      ).toBeInTheDocument();
    });
  });

  it("handles bank account rejection workflow with confirmation", async () => {
    (rejectSellerBankAccount as jest.Mock).mockResolvedValue({
      success: true,
      message: "Seller bank account status updated successfully",
    });

    render(
      <SellerViewModel
        seller={mockSellerWithBank}
        isOpen={true}
        onClose={jest.fn()}
      />,
    );

    const bankTabButton = screen.getByRole("button", { name: /Bank Account/i });
    fireEvent.click(bankTabButton);

    const rejectButton = screen.getByRole("button", {
      name: /Reject Bank Account/i,
    });
    fireEvent.click(rejectButton);

    // Confirm prompt is displayed
    expect(screen.getByText("Reject this bank account?")).toBeInTheDocument();
    const confirmRejectButton = screen.getByRole("button", {
      name: /Yes, Reject Account/i,
    });
    fireEvent.click(confirmRejectButton);

    await waitFor(() => {
      expect(rejectSellerBankAccount).toHaveBeenCalledWith("seller-123");
      expect(
        screen.getByText("Seller bank account has been rejected."),
      ).toBeInTheDocument();
    });
  });

  it("does not show dummy data when seller has no bank account", () => {
    const mockSellerWithoutBank: Seller = {
      ...mockSellerWithBank,
      id: "seller-no-bank",
      bankAccount: undefined,
    };

    render(
      <SellerViewModel
        seller={mockSellerWithoutBank}
        isOpen={true}
        onClose={jest.fn()}
      />,
    );

    // Overview shows fallback message instead of dummy bank data
    expect(screen.getByText("Linked Bank Account")).toBeInTheDocument();
    expect(
      screen.getByText("No Bank Account Added right now"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Commercial International Bank (CIB)"),
    ).not.toBeInTheDocument();

    // Switch to Bank Account tab
    const bankTabButton = screen.getByRole("button", { name: /Bank Account/i });
    fireEvent.click(bankTabButton);

    // Verifies empty state is shown and no dummy actions/data appear
    expect(screen.getByText("No Bank Account Linked")).toBeInTheDocument();
    expect(
      screen.queryByText("Commercial International Bank (CIB)"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Approve Bank Account/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Reject Bank Account/i }),
    ).not.toBeInTheDocument();
  });
});
