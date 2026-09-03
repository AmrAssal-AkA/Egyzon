import React, { useContext, useEffect, useState } from "react";
import {
  Landmark,
  Percent,
  Receipt,
  Info,
  Save,
  CheckCircle2,
} from "lucide-react";
import { AlertContext } from "../../context/AlertContext";

interface FinancialParametersFormProps {
  initialBaseFee?: number | string | null;
  initialTaxRate?: number | string | null;
  isSaving?: boolean;
  onSubmit?: (data: {
    baseFee: number;
    taxRate: number;
  }) => Promise<void> | void;
  className?: string;
}

export default function FinancialParametersForm({
  initialBaseFee = 5.0,
  initialTaxRate = 14.0,
  isSaving = false,
  onSubmit,
  className = "",
}: FinancialParametersFormProps) {
  const [baseFee, setBaseFee] = useState<string>(
    initialBaseFee !== null && initialBaseFee !== undefined
      ? String(initialBaseFee)
      : "5.0",
  );
  const [taxRate, setTaxRate] = useState<string>(
    initialTaxRate !== null && initialTaxRate !== undefined
      ? String(initialTaxRate)
      : "14.0",
  );
  const [localSaving, setLocalSaving] = useState<boolean>(false);

  const alertContext = useContext(AlertContext);

  useEffect(() => {
    if (initialBaseFee !== null && initialBaseFee !== undefined) {
      setBaseFee(String(initialBaseFee));
    }
  }, [initialBaseFee]);

  useEffect(() => {
    if (initialTaxRate !== null && initialTaxRate !== undefined) {
      setTaxRate(String(initialTaxRate));
    }
  }, [initialTaxRate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedBaseFee = isNaN(Number(baseFee)) ? 0 : Number(baseFee);
    const parsedTaxRate = isNaN(Number(taxRate)) ? 0 : Number(taxRate);

    if (onSubmit) {
      await onSubmit({ baseFee: parsedBaseFee, taxRate: parsedTaxRate });
    } else {
      setLocalSaving(true);
      setTimeout(() => {
        setLocalSaving(false);
        if (alertContext) {
          alertContext.showSuccess("Financial parameters saved successfully.");
        }
      }, 400);
    }
  };

  const currentlySaving = isSaving || localSaving;

  return (
    <div
      className={`bg-white border border-gray-200/80 shadow-sm rounded-xl overflow-hidden transition-all duration-200 ${className}`}
    >
      {/* Card Header */}
      <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/80 shrink-0">
            <Landmark className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Financial Parameters
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Configure your store's transaction fees, commission rates, and tax
              calculations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Active Parameters
          </span>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
        {/* Responsive Grid: side by side on md+ screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Base Platform Fee Input Box */}
          <div className="flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50/80 hover:border-gray-200 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="basePlatformFee"
                  className="text-sm font-semibold text-gray-800"
                >
                  Base Platform Fee
                </label>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                  Percentage
                </span>
              </div>

              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Percent className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  id="basePlatformFee"
                  name="basePlatformFee"
                  step="any"
                  min="0"
                  max="100"
                  value={baseFee}
                  onChange={(e) => setBaseFee(e.target.value)}
                  placeholder="5.0"
                  className="w-full pl-10 pr-12 py-2.5 bg-white text-gray-900 text-sm border border-gray-200 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-semibold text-gray-400">
                  %
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 flex items-start gap-1.5 mt-3 pt-3 border-t border-gray-100/80">
              <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
              <span>
                The base fee percentage charged by the platform for each
                completed transaction (e.g. 0.5% or 5.0%).
              </span>
            </p>
          </div>

          {/* Tax Configuration Input Box */}
          <div className="flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50/80 hover:border-gray-200 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="taxConfiguration"
                  className="text-sm font-semibold text-gray-800"
                >
                  Tax Configuration
                </label>
                <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  VAT / Sales Tax
                </span>
              </div>

              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Receipt className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  id="taxConfiguration"
                  name="taxConfiguration"
                  step="any"
                  min="0"
                  max="100"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="14.0"
                  className="w-full pl-10 pr-12 py-2.5 bg-white text-gray-900 text-sm border border-gray-200 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-semibold text-gray-400">
                  %
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 flex items-start gap-1.5 mt-3 pt-3 border-t border-gray-100/80">
              <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
              <span>
                The statutory tax rate applied to calculate transaction tax
                across all orders (e.g. 14.0%).
              </span>
            </p>
          </div>
        </div>

        {/* Form Actions Footer */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-gray-400">
            Updated financial rates take effect immediately on subsequent
            orders.
          </span>
          <button
            type="submit"
            disabled={currentlySaving}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer shrink-0"
          >
            <Save className="w-4 h-4" />
            {currentlySaving ? "Saving..." : "Save Financial Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
