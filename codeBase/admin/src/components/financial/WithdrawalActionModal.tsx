import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  X,
  CreditCard,
  User,
  Store,
  Lock,
} from "lucide-react";
import type { WithdrawalRequest } from "../../types/financial";

export type ModalActionType = "approve" | "reject" | null;

interface WithdrawalActionModalProps {
  request: WithdrawalRequest | null;
  actionType: ModalActionType;
  isOpen: boolean;
  isProcessing: boolean;
  onClose: () => void;
  onConfirmApprove: (requestId: string) => Promise<void>;
  onConfirmReject: (requestId: string, reason: string) => Promise<void>;
}

const COMMON_REJECTION_REASONS = [
  "Bank account details / IBAN mismatch with registered seller name",
  "Commercial registration / tax card expired or requires verification",
  "Pending customer return requests or open chargeback disputes",
  "Requested amount exceeds eligible cleared escrow balance",
  "Other administrative or compliance issue",
];

export function WithdrawalActionModal({
  request,
  actionType,
  isOpen,
  isProcessing,
  onClose,
  onConfirmApprove,
  onConfirmReject,
}: WithdrawalActionModalProps): React.ReactElement | null {
  const [selectedReason, setSelectedReason] = useState<string>(
    COMMON_REJECTION_REASONS[0]
  );
  const [customReason, setCustomReason] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setSelectedReason(COMMON_REJECTION_REASONS[0]);
      setCustomReason("");
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isProcessing) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen || !request || !actionType) return null;

  const isApprove = actionType === "approve";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    if (isApprove) {
      await onConfirmApprove(request.id);
    } else {
      const finalReason =
        selectedReason === "Other administrative or compliance issue"
          ? customReason.trim() || "Administrative compliance hold"
          : selectedReason;
      await onConfirmReject(request.id, finalReason);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="withdrawal-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 flex items-center justify-between border-b ${
            isApprove
              ? "bg-emerald-50/70 border-emerald-100"
              : "bg-rose-50/70 border-rose-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl shrink-0 ${
                isApprove
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {isApprove ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3
                id="withdrawal-modal-title"
                className="text-base font-bold text-gray-900"
              >
                {isApprove
                  ? "Confirm Payout Approval"
                  : "Confirm Withdrawal Rejection"}
              </h3>
              <p className="text-xs text-gray-500">
                Request ID: <span className="font-mono font-medium">{request.id}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-black/5 disabled:opacity-40 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Amount and Destination Summary Card */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 space-y-3">
            <div className="flex items-baseline justify-between border-b border-gray-200/60 pb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Payout Amount
              </span>
              <span className="text-xl font-bold text-gray-900 font-mono">
                {request.requestedAmount.toLocaleString()} EGP
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-400 flex items-center gap-1 mb-0.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  Seller
                </span>
                <p className="font-semibold text-gray-800 truncate">
                  {request.sellerName}
                </p>
                <p className="text-[11px] text-gray-400 truncate">
                  {request.sellerEmail}
                </p>
              </div>

              <div>
                <span className="text-gray-400 flex items-center gap-1 mb-0.5">
                  <Store className="w-3.5 h-3.5 text-gray-400" />
                  Store
                </span>
                <p className="font-semibold text-gray-800 truncate">
                  {request.storeName}
                </p>
                <p className="text-[11px] text-gray-400">ID: {request.sellerId}</p>
              </div>
            </div>

            {/* Account Details */}
            <div className="pt-2 border-t border-gray-200/60 text-xs">
              <span className="text-gray-400 flex items-center gap-1 mb-1">
                <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                Payment Method: <strong className="text-gray-700">{request.paymentMethod}</strong>
              </span>

              {request.accountDetails.bankName && (
                <div className="bg-white p-2.5 rounded-lg border border-gray-200/70 space-y-1 mt-1 font-mono text-[11px]">
                  <div className="text-gray-800 font-medium font-sans">
                    {request.accountDetails.bankName}
                  </div>
                  {request.accountDetails.accountHolderName && (
                    <div className="text-gray-600 font-sans">
                      Beneficiary: {request.accountDetails.accountHolderName}
                    </div>
                  )}
                  {request.accountDetails.iban && (
                    <div className="text-gray-700 truncate" title={request.accountDetails.iban}>
                      IBAN: {request.accountDetails.iban}
                    </div>
                  )}
                  {request.accountDetails.accountNumber && !request.accountDetails.iban && (
                    <div className="text-gray-700">
                      Account: {request.accountDetails.accountNumber}
                    </div>
                  )}
                </div>
              )}

              {request.accountDetails.instantHandle && (
                <div className="bg-white p-2.5 rounded-lg border border-gray-200/70 mt-1 font-mono text-xs">
                  <span className="text-gray-500 font-sans">InstaPay Handle: </span>
                  <span className="font-semibold text-gray-900">{request.accountDetails.instantHandle}</span>
                </div>
              )}

              {request.accountDetails.walletNumber && (
                <div className="bg-white p-2.5 rounded-lg border border-gray-200/70 mt-1 font-mono text-xs">
                  <span className="text-gray-500 font-sans">Wallet Number: </span>
                  <span className="font-semibold text-gray-900">{request.accountDetails.walletNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Approve Warning / Confirmation */}
          {isApprove ? (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Controlled Financial Action:</strong> Approving this
                transaction marks the payout as completed and deducts{" "}
                <strong className="font-semibold">
                  {request.requestedAmount.toLocaleString()} EGP
                </strong>{" "}
                from the seller's cleared marketplace escrow balance. Please ensure
                the banking transfer has been initiated.
              </div>
            </div>
          ) : (
            /* Rejection reason selection */
            <div className="space-y-2">
              <label
                htmlFor="rejectionReasonSelect"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Select Rejection Audit Reason
              </label>
              <select
                id="rejectionReasonSelect"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              >
                {COMMON_REJECTION_REASONS.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>

              {selectedReason === "Other administrative or compliance issue" && (
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Provide detailed explanation for this rejection..."
                  rows={3}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 placeholder:text-gray-400"
                  required
                />
              )}

              <p className="text-[11px] text-gray-400">
                The reason will be communicated to the seller and recorded in the audit log.
              </p>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 text-xs font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>

            {isApprove ? (
              <button
                type="submit"
                disabled={isProcessing}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60 shadow-sm transition-all"
              >
                {isProcessing ? "Processing Approval..." : "Confirm & Approve Payout"}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isProcessing}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-60 shadow-sm transition-all"
              >
                {isProcessing ? "Processing Rejection..." : "Confirm Rejection"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default WithdrawalActionModal;
