import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../_components/Card";

describe("Card Component", () => {
  it("renders title, description, and value correctly", () => {
    render(
      <Card
        title="Total Revenue"
        description="Monthly overview"
        value="$100,000"
      />,
    );

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("Monthly overview")).toBeInTheDocument();
    expect(screen.getByText("$100,000")).toBeInTheDocument();
  });

  it("renders badges when provided", () => {
    render(
      <Card
        title="Active Sellers"
        value="150"
        badges={["+10% growth", "Active"]}
      />,
    );

    expect(screen.getByText("+10% growth")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders progress bar when progress prop is passed", () => {
    render(<Card title="KYC Pending" value="5" progress={75} />);

    expect(screen.getByText("Progress")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("handles card click and action click events", () => {
    const handleCardClick = jest.fn();
    const handleActionClick = jest.fn();

    render(
      <Card
        title="Product Approvals"
        value="20"
        onClick={handleCardClick}
        actions={[{ label: "Review", onClick: handleActionClick }]}
      />,
    );

    const actionBtn = screen.getByRole("button", { name: "Review" });
    fireEvent.click(actionBtn);
    expect(handleActionClick).toHaveBeenCalledTimes(1);
    expect(handleCardClick).not.toHaveBeenCalled();

    const card = screen.getByRole("button", { name: /Product Approvals/i });
    fireEvent.click(card);
    expect(handleCardClick).toHaveBeenCalledTimes(1);
  });
});
