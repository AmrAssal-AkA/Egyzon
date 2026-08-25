import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FinancialParametersForm from "../settings/FinaincailParamtersForm";

describe("FinancialParametersForm", () => {
  it("renders form titles, labels, and float inputs correctly", () => {
    render(<FinancialParametersForm initialBaseFee={0.5} initialTaxRate={14.0} />);

    expect(screen.getByText("Financial Parameters")).toBeInTheDocument();
    expect(screen.getByLabelText(/Base Platform Fee/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tax Configuration/i)).toBeInTheDocument();

    const baseFeeInput = screen.getByLabelText(/Base Platform Fee/i) as HTMLInputElement;
    const taxRateInput = screen.getByLabelText(/Tax Configuration/i) as HTMLInputElement;

    expect(baseFeeInput.value).toBe("0.5");
    expect(taxRateInput.value).toBe("14");
  });

  it("handles form submission with float percentage values", () => {
    const handleSubmit = jest.fn();
    render(<FinancialParametersForm onSubmit={handleSubmit} />);

    const baseFeeInput = screen.getByLabelText(/Base Platform Fee/i);
    const taxRateInput = screen.getByLabelText(/Tax Configuration/i);
    const submitButton = screen.getByRole("button", { name: /Save Financial Settings/i });

    fireEvent.change(baseFeeInput, { target: { value: "0.5" } });
    fireEvent.change(taxRateInput, { target: { value: "14" } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      baseFee: 0.5,
      taxRate: 14,
    });
  });
});
