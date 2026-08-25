import React, { useEffect, useState } from "react";
import { Sliders, Sparkles, Loader2 } from "lucide-react";
import FinancialParametersForm from "../../components/settings/FinaincailParamtersForm";
import {
  setPlatformConfig,
  getPlatformConfig,
} from "../../services/platform.services";
import { useAlert } from "../../hooks/useAlert";

function StoreSetting() {
  const [platformFee, setPlatformFee] = useState<number>(5.0);
  const [taxRate, setTaxRate] = useState<number>(14.0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { showSuccess, showError } = useAlert();

  useEffect(() => {
    document.title = "Store Settings | Egyzon Admin";

    const fetchConfig = async () => {
      setIsLoading(true);
      try {
        const response = await getPlatformConfig();
        if (response.success && response.data) {
          const fetchedFee =
            response.data.feePercentage ??
            response.data.PlatformFeePercentage ??
            response.data.platformFeePercentage ??
            5.0;
          const fetchedTax =
            response.data.taxRate ??
            response.data.TaxRate ??
            response.data.platformTaxRate ??
            14.0;

          setPlatformFee(Number(fetchedFee));
          setTaxRate(Number(fetchedTax));
        } else if (!response.success && response.message) {
          showError(response.message);
        }
      } catch (error) {
        showError("Failed to load platform configuration.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, [showError]);

  const handleSubmit = async (data: { baseFee: number; taxRate: number }) => {
    setIsSaving(true);
    try {
      const response = await setPlatformConfig({
        feePercentage: data.baseFee,
        taxRate: data.taxRate,
      });

      if (response.success) {
        if (response.data) {
          const updatedFee =
            response.data.feePercentage ??
            response.data.PlatformFeePercentage ??
            response.data.platformFeePercentage ??
            data.baseFee;
          const updatedTax =
            response.data.taxRate ??
            response.data.TaxRate ??
            response.data.platformTaxRate ??
            data.taxRate;

          setPlatformFee(Number(updatedFee));
          setTaxRate(Number(updatedTax));
        } else {
          setPlatformFee(data.baseFee);
          setTaxRate(data.taxRate);
        }
        showSuccess(
          response.message || "Financial parameters saved successfully."
        );
      } else {
        showError(response.message || "Failed to save financial parameters.");
      }
    } catch (error) {
      showError("An unexpected error occurred while saving financial parameters.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs shrink-0">
            <Sliders className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Store Settings
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your store configurations, financial parameters, and global marketplace preferences.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            General Configuration
          </span>
        </div>
      </div>

      {/* Financial Parameters Section */}
      {isLoading ? (
        <div className="bg-white border border-gray-200/80 shadow-sm rounded-xl p-12 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
          <p className="text-sm text-gray-500 font-medium">
            Loading platform parameters...
          </p>
        </div>
      ) : (
        <FinancialParametersForm
          initialBaseFee={platformFee}
          initialTaxRate={taxRate}
          isSaving={isSaving}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

export default StoreSetting;