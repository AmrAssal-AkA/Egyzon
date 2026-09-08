import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ShieldCheck,
  Ban,
  FileText,
  User,
  Building,
  Mail,
  Calendar,
  AlertTriangle,
  Send,
  Globe,
  MapPin,
  Store,
  CreditCard,
  Loader2,
  Eye,
  ExternalLink,
  Landmark,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  approveSellerBankAccount,
  rejectSellerBankAccount,
} from "../../services/seller.services";
import type { Seller } from "../../types/seller";
import { BusinessAvatar } from "./_components/BusinessAvatar";
import { StatusBadge } from "./_components/StatusBadge";

/// *** Model Context ****///
export interface SellerViewModelProps {
  seller: Seller | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (seller: Seller) => Promise<void>;
  onReject?: (seller: Seller) => Promise<void>;
  onRequestDocs?: (seller: Seller, message: string) => Promise<void>;
  onApproveBankAccount?: (seller: Seller) => Promise<void>;
  onRejectBankAccount?: (seller: Seller) => Promise<void>;
}

type ModalTab = "overview" | "store" | "bank" | "request";

export function SellerViewModel({
  seller,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onRequestDocs,
  onApproveBankAccount,
  onRejectBankAccount,
}: SellerViewModelProps): React.ReactElement | null {
  const [activeTab, setActiveTab] = useState<ModalTab>("overview");
  const [requestMessage, setRequestMessage] = useState<string>(
    "Please upload a clearer tax card image and add your business address."
  );
  const [submittingAction, setSubmittingAction] = useState<
    "approve" | "reject" | "request" | "approve_bank" | "reject_bank" | null
  >(null);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showRejectBankConfirm, setShowRejectBankConfirm] = useState(false);
  const [localBankStatus, setLocalBankStatus] = useState<string | null>(null);
  const [bankActionMessage, setBankActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [previewDocument, setPreviewDocument] = useState<{
    title: string;
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setActiveTab("overview");
      setShowRejectConfirm(false);
      setShowRejectBankConfirm(false);
      setSubmittingAction(null);
      setPreviewDocument(null);
      setLocalBankStatus(null);
      setBankActionMessage(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        if (previewDocument) {
          setPreviewDocument(null);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, previewDocument]);

  if (!isOpen || !seller) {
    return null;
  }

  const handleApproveClick = async (): Promise<void> => {
    if (!onApprove) return;
    try {
      setSubmittingAction("approve");
      await onApprove(seller);
      onClose();
    } finally {
      setSubmittingAction(null);
    }
  };

  const handleRejectClick = async (): Promise<void> => {
    if (!onReject) return;
    try {
      setSubmittingAction("reject");
      await onReject(seller);
      onClose();
    } finally {
      setSubmittingAction(null);
    }
  };

  const handleSendDocsRequest = async (): Promise<void> => {
    if (!onRequestDocs || !requestMessage.trim()) return;
    try {
      setSubmittingAction("request");
      await onRequestDocs(seller, requestMessage.trim());
      setActiveTab("overview");
    } finally {
      setSubmittingAction(null);
    }
  };

  const openCommercialRegisterImage = (): void => {
    const imageUrl =
      seller.sellerDocuments?.commercialRegisterUrl!

    setPreviewDocument({
      title: `${seller.businessName} - Commercial Registration Certificate`,
      imageUrl,
    });
  };

  const openTaxCardImage = (): void => {
    const imageUrl =
      seller.sellerDocuments?.taxCardUrl!
      
    setPreviewDocument({
      title: `${seller.businessName} - Tax Registration Card`,
      imageUrl,
    });
  };

  const handleApproveBankClick = async (): Promise<void> => {
    if (!seller) return;
    try {
      setSubmittingAction("approve_bank");
      setBankActionMessage(null);

      if (onApproveBankAccount) {
        await onApproveBankAccount(seller);
      } else {
        const response = await approveSellerBankAccount(seller.id);
        if (!response.success) {
          throw new Error(response.message || "Failed to approve bank account");
        }
      }

      setLocalBankStatus("verified");
      setBankActionMessage({
        type: "success",
        text: "Seller bank account verified and approved successfully.",
      });
    } catch (err: unknown) {
      setBankActionMessage({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "Failed to approve seller bank account.",
      });
    } finally {
      setSubmittingAction(null);
    }
  };

  const handleRejectBankClick = async (): Promise<void> => {
    if (!seller) return;
    try {
      setSubmittingAction("reject_bank");
      setBankActionMessage(null);

      if (onRejectBankAccount) {
        await onRejectBankAccount(seller);
      } else {
        const response = await rejectSellerBankAccount(seller.id);
        if (!response.success) {
          throw new Error(response.message || "Failed to reject bank account");
        }
      }

      setLocalBankStatus("rejected");
      setShowRejectBankConfirm(false);
      setBankActionMessage({
        type: "success",
        text: "Seller bank account has been rejected.",
      });
    } catch (err: unknown) {
      setBankActionMessage({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "Failed to reject seller bank account.",
      });
    } finally {
      setSubmittingAction(null);
    }
  };

  const bankAccount = seller.bankAccount;
  const currentBankStatus =
    localBankStatus ||
    bankAccount?.status ||
    bankAccount?.verificationStatus ||
    (bankAccount?.isVerified ? "verified" : "pending");
  const isBankVerified =
    currentBankStatus === "verified" ||
    currentBankStatus === "active" ||
    bankAccount?.isVerified === true;
  const isBankRejected = currentBankStatus === "rejected";

  const storeManagement = seller.storeManagement;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seller-view-modal-title"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <BusinessAvatar name={seller.businessName} />
            <div>
              <div className="flex items-center gap-3">
                <h2
                  id="seller-view-modal-title"
                  className="text-xl font-bold text-gray-900"
                >
                  {seller.businessName}
                </h2>
                <StatusBadge status={seller.status} />
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                <span>
                  CR / Business ID:{" "}
                  <strong className="text-gray-700 font-mono">
                    {seller.businessId || seller.commercialRegisterNumber || "N/A"}
                  </strong>
                </span>
                <span>•</span>
                <span>
                  Applicant:{" "}
                  <strong className="text-gray-700">{seller.ownerName}</strong>
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 px-6 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`py-3.5 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <FileText className="w-4 h-4" />
            Applicant & Credentials
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("store")}
            className={`py-3.5 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "store"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Store className="w-4 h-4" />
            Store Profile
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bank")}
            className={`py-3.5 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "bank"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Landmark className="w-4 h-4" />
            Bank Account
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("request")}
            className={`py-3.5 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "request"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Send className="w-4 h-4" />
            Request Documents
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Credentials Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase text-gray-400 mb-2">
                      <span className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-blue-500" />
                        Commercial Register (CR) Number
                      </span>
                    </div>
                    <p className="text-base font-semibold font-mono text-gray-900">
                      {seller.commercialRegisterNumber || seller.businessId || "Not Provided"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={openCommercialRegisterImage}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> View CR Certificate Image
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase text-gray-400 mb-2">
                      <span className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-emerald-500" />
                        Tax Registration Card Number
                      </span>
                    </div>
                    <p className="text-base font-semibold font-mono text-gray-900">
                      {seller.taxCardNumber || "Not Provided"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={openTaxCardImage}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Tax Card Image
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between sm:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400 mb-1">
                        <Landmark className="w-4 h-4 text-indigo-500" />
                        Linked Bank Account
                      </div>
                      <p className="text-base font-semibold text-gray-900">
                        {bankAccount?.bankName || "Commercial International Bank (CIB)"}
                      </p>
                      <p className="text-xs font-mono text-gray-500 mt-0.5">
                        {bankAccount?.iban
                          ? `IBAN: ${bankAccount.iban}`
                          : bankAccount?.accountNumber
                          ? `Account: ${bankAccount.accountNumber}`
                          : `Account Holder: ${bankAccount?.accountHolderName || seller.ownerName}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          isBankVerified
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : isBankRejected
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {isBankVerified
                          ? "Verified"
                          : isBankRejected
                          ? "Rejected"
                          : "Verification Pending"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveTab("bank")}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        Manage &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner Info */}
              <div className="p-4 rounded-xl border border-gray-200 space-y-3 bg-white">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  Applicant Principal Owner Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-sm">
                  <div>
                    <span className="text-xs text-gray-400 block">Full Name</span>
                    <span className="font-medium text-gray-800">{seller.ownerName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Contact Email</span>
                    <span className="font-medium text-gray-800 flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {seller.ownerEmail}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Submitted Date</span>
                    <span className="font-medium text-gray-800 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {seller.submittedAt} ({seller.submittedRelative})
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Risk Assessment</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-20 h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full ${
                            seller.riskScore >= 80
                              ? "bg-emerald-500"
                              : seller.riskScore >= 50
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${seller.riskScore || 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">
                        {seller.riskScore || 100} / 100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {seller.notes && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                  <h3 className="text-xs font-semibold uppercase text-amber-800 flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Application Notes / Remarks
                  </h3>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {seller.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "store" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-gray-200 space-y-4 bg-white">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Store className="w-4 h-4 text-gray-500" />
                  Store Identity Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-gray-400 block">Store Name</span>
                    <span className="font-semibold text-gray-900">{seller.businessName}</span>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400 block">Store Type</span>
                    <span className="font-medium capitalize text-gray-800">
                      {storeManagement?.storeType || "Online & Physical"}
                    </span>
                  </div>

                  {storeManagement?.storephysicalAddress && (
                    <div className="col-span-full">
                      <span className="text-xs text-gray-400 block">Physical Address</span>
                      <span className="font-medium text-gray-800 flex items-start gap-1.5 mt-0.5">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        {storeManagement.storephysicalAddress}
                      </span>
                    </div>
                  )}

                  {storeManagement?.storeOnlineAddress && (
                    <div className="col-span-full">
                      <span className="text-xs text-gray-400 block">Online Store URL</span>
                      <a
                        href={storeManagement.storeOnlineAddress}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-blue-600 hover:underline flex items-center gap-1.5 mt-0.5"
                      >
                        <Globe className="w-4 h-4 shrink-0" />
                        {storeManagement.storeOnlineAddress}
                      </a>
                    </div>
                  )}
                </div>

                {storeManagement?.storeDescription && (
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-400 block mb-1">Store Description</span>
                    <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
                      {storeManagement.storeDescription}
                    </p>
                  </div>
                )}
              </div>

              {/* Document verification status checklist */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                <h3 className="text-xs font-semibold uppercase text-gray-500">
                  Verification Checklist (Click item to inspect certificate)
                </h3>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={openCommercialRegisterImage}
                    className="w-full flex items-center justify-between text-xs p-3 bg-white hover:bg-blue-50/60 rounded-xl border border-gray-200 transition-colors text-left group"
                  >
                    <span className="text-gray-900 font-medium group-hover:text-blue-700 flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-500" />
                      Commercial Registration Certificate
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 group-hover:border-blue-200">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      View Image
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={openTaxCardImage}
                    className="w-full flex items-center justify-between text-xs p-3 bg-white hover:bg-emerald-50/60 rounded-xl border border-gray-200 transition-colors text-left group"
                  >
                    <span className="text-gray-900 font-medium group-hover:text-emerald-700 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-500" />
                      Tax Identification Card
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 group-hover:border-emerald-200">
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      View Image
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bank" && (
            <div className="space-y-6">
              {/* Bank Verification Status Banner */}
              <div
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isBankVerified
                    ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                    : isBankRejected
                    ? "bg-red-50/60 border-red-200 text-red-900"
                    : "bg-amber-50/60 border-amber-200 text-amber-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 ${
                      isBankVerified
                        ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                        : isBankRejected
                        ? "bg-red-100 text-red-700 border-red-300"
                        : "bg-amber-100 text-amber-700 border-amber-300"
                    }`}
                  >
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">
                      {isBankVerified
                        ? "Verified Bank Account"
                        : isBankRejected
                        ? "Bank Account Rejected"
                        : "Bank Account Verification Pending"}
                    </h3>
                    <p className="text-xs opacity-85 mt-0.5">
                      {isBankVerified
                        ? "This seller's bank account has been verified and approved for payout disbursements."
                        : isBankRejected
                        ? "This bank account was rejected. The seller must provide corrected banking credentials."
                        : "Review linked banking details below and approve or reject this payout account."}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border shrink-0 self-start sm:self-center ${
                    isBankVerified
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : isBankRejected
                      ? "bg-red-100 text-red-800 border-red-300"
                      : "bg-amber-100 text-amber-800 border-amber-300"
                  }`}
                >
                  {isBankVerified
                    ? "Verified"
                    : isBankRejected
                    ? "Rejected"
                    : "Pending Verification"}
                </span>
              </div>

              {/* Bank Action Message Alert */}
              {bankActionMessage && (
                <div
                  className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
                    bankActionMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                >
                  {bankActionMessage.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                  )}
                  <span className="font-medium">{bankActionMessage.text}</span>
                </div>
              )}

              {/* Bank Account Details Card */}
              <div className="p-4 rounded-xl border border-gray-200 space-y-4 bg-white">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-gray-500" />
                  Banking Credentials & Payout Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-xs text-gray-400 block font-medium">Bank Name</span>
                    <span className="font-semibold text-gray-900 mt-0.5 block">
                      {bankAccount?.bankName || "Commercial International Bank (CIB)"}
                    </span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-xs text-gray-400 block font-medium">Account Holder Name</span>
                    <span className="font-semibold text-gray-900 mt-0.5 block">
                      {bankAccount?.accountHolderName || seller.ownerName || "—"}
                    </span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-xs text-gray-400 block font-medium">Account Number</span>
                    <span className="font-mono font-semibold text-gray-900 mt-0.5 block">
                      {bankAccount?.accountNumber || "—"}
                    </span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-xs text-gray-400 block font-medium">IBAN</span>
                    <span className="font-mono font-semibold text-gray-900 mt-0.5 block break-all">
                      {bankAccount?.iban || "—"}
                    </span>
                  </div>

                  {bankAccount?.swiftCode && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="text-xs text-gray-400 block font-medium">SWIFT / BIC</span>
                      <span className="font-mono font-semibold text-gray-900 mt-0.5 block">
                        {bankAccount.swiftCode}
                      </span>
                    </div>
                  )}

                  {bankAccount?.routingNumber && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="text-xs text-gray-400 block font-medium">Routing Number</span>
                      <span className="font-mono font-semibold text-gray-900 mt-0.5 block">
                        {bankAccount.routingNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bank Account Verification Actions Card */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-3">
                <h3 className="text-xs font-semibold uppercase text-gray-500">
                  Bank Account Decision Actions
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Admins can verify or reject linked banking credentials for this seller. Approving allows platform payout disbursements to be processed to this account.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {!isBankVerified && (
                    <button
                      type="button"
                      onClick={handleApproveBankClick}
                      disabled={submittingAction !== null}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm"
                    >
                      {submittingAction === "approve_bank" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      Approve Bank Account
                    </button>
                  )}

                  {showRejectBankConfirm ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-600 font-semibold">
                        Reject this bank account?
                      </span>
                      <button
                        type="button"
                        onClick={handleRejectBankClick}
                        disabled={submittingAction !== null}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-1.5"
                      >
                        {submittingAction === "reject_bank" && (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        )}
                        Yes, Reject Account
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowRejectBankConfirm(false)}
                        className="px-3.5 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    !isBankRejected && (
                      <button
                        type="button"
                        onClick={() => setShowRejectBankConfirm(true)}
                        disabled={submittingAction !== null}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 disabled:opacity-50 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject Bank Account
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "request" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-800">
                <p className="font-semibold text-blue-900 mb-1">
                  Request Additional Documents
                </p>
                Specify what documents or details the seller needs to clarify or re-upload. This will notify the seller applicant and transition their application status.
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="request-message-input"
                  className="block text-xs font-semibold text-gray-700 uppercase"
                >
                  Message to Applicant
                </label>
                <textarea
                  id="request-message-input"
                  rows={4}
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="e.g. Please upload a clearer tax card image and add your business address."
                  className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSendDocsRequest}
                  disabled={!requestMessage.trim() || submittingAction !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
                >
                  {submittingAction === "request" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Send Document Request
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Review Action Bar */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {showRejectConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-600 font-semibold">Confirm Reject?</span>
                <button
                  type="button"
                  onClick={handleRejectClick}
                  disabled={submittingAction !== null}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-1.5"
                >
                  {submittingAction === "reject" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Yes, Reject
                </button>
                <button
                  type="button"
                  onClick={() => setShowRejectConfirm(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              seller.status !== "banned" && (
                <button
                  type="button"
                  onClick={() => setShowRejectConfirm(true)}
                  disabled={submittingAction !== null}
                  className="px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 disabled:opacity-50 transition-colors flex items-center gap-1.5"
                >
                  <Ban className="w-4 h-4" />
                  Reject
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => setActiveTab("request")}
              disabled={submittingAction !== null}
              className="px-3.5 py-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 disabled:opacity-50 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              Request Docs
            </button>

            {seller.status !== "active" && (
              <button
                type="button"
                onClick={handleApproveClick}
                disabled={submittingAction !== null}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm flex items-center gap-1.5"
              >
                {submittingAction === "approve" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                Approve Seller
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Document Image Preview Lightbox Overlay */}
      {previewDocument && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-label={previewDocument.title}
        >
          <div
            className="fixed inset-0"
            onClick={() => setPreviewDocument(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                {previewDocument.title}
              </h3>

              <div className="flex items-center gap-3">
                <a
                  href={previewDocument.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Full
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewDocument(null)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-auto flex items-center justify-center bg-gray-950/80">
              <img
                src={previewDocument.imageUrl}
                alt={previewDocument.title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl border border-gray-800 shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

export default SellerViewModel;

