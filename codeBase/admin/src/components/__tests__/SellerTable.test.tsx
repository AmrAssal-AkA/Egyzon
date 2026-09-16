import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SellerTable from "../sellers/SellerTable";
import type { Seller } from "../../types/seller";

describe("SellerTable Component", () => {
  const mockSellers: Seller[] = [
    {
      id: "app-1",
      storeName: "Egyzon Store",
      businessId: "CR-123456",
      ownerName: "Mohamed Hassan",
      ownerEmail: "mohamed@example.com",
      phoneNumber: "+201001234567",
      submittedAt: "Sep 16, 2026",
      submittedRelative: "Today",
      riskScore: 0,
      status: "pending",
      commercialRegisterNumber: "CR-123456",
      taxCardNumber: "TC-987654",
    },
    {
      id: "app-2",
      storeName: "Alpha Store",
      businessId: "CR-789012",
      ownerName: "Sara Ali",
      ownerEmail: "sara@example.com",
      submittedAt: "Sep 15, 2026",
      submittedRelative: "Yesterday",
      riskScore: 65,
      status: "active",
      commercialRegisterNumber: "CR-789012",
      taxCardNumber: "TC-112233",
    },
  ];

  it("renders seller details including business name, owner name, email, and phone number", () => {
    render(<SellerTable sellers={mockSellers} />);

    expect(screen.getByText("Egyzon Store")).toBeInTheDocument();
    expect(screen.getByText("ID: CR-123456")).toBeInTheDocument();
    expect(screen.getByText("Mohamed Hassan")).toBeInTheDocument();
    expect(screen.getByText("mohamed@example.com")).toBeInTheDocument();
    expect(screen.getByText("+201001234567")).toBeInTheDocument();
    expect(screen.getByText("Sep 16, 2026")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("triggers onSellerAction when an action menu item is clicked", () => {
    const handleSellerAction = jest.fn();
    render(<SellerTable sellers={mockSellers} onSellerAction={handleSellerAction} />);

    const menuButtons = screen.getAllByRole("button", {
      name: /Actions for/i,
    });
    fireEvent.click(menuButtons[0]);

    const viewButton = screen.getByRole("menuitem", { name: /View Application/i });
    fireEvent.click(viewButton);

    expect(handleSellerAction).toHaveBeenCalledWith("view", mockSellers[0]);
  });
});
