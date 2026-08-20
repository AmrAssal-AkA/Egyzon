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
} from "lucide-react";

import type { Seller, SellerStatus } from "../../types/seller";

export interface SellerViewModelProps {
  seller: Seller | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (seller: Seller) => Promise<void>;
  onReject?: (seller: Seller) => Promise<void>;
  onRequestDocs?: (seller: Seller, message: string) => Promise<void>;
}

type ModalTab = "overview" | "store" | "request";

const avatarColors = [
  "bg-amber-100 text-amber-800 border-amber-200",
  "bg-sky-100 text-sky-800 border-sky-200",
  "bg-emerald-100 text-emerald-800 border-emerald-200",
  "bg-violet-100 text-violet-800 border-violet-200",
];

function BusinessAvatar({ name }: { name: string }): React.ReactElement {
  const initials = name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colorIndex =
    name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    avatarColors.length;

  return (
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border shrink-0 ${avatarColors[colorIndex]}`}
      aria-hidden="true"
    >
      {initials || "SE"}
    </div>
  );
}

function StatusBadge({ status }: { status: SellerStatus }): React.ReactElement {
  const badgeStyles: Record<SellerStatus, string> = {
    pending: "bg-orange-50 text-orange-700 border-orange-200",
    under_review: "bg-blue-50 text-blue-700 border-blue-200",
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    suspended: "bg-amber-50 text-amber-700 border-amber-200",
    banned: "bg-red-50 text-red-700 border-red-200",
  };

  const labels: Record<SellerStatus, string> = {
    pending: "Pending Application",
    under_review: "Under Review",
    active: "Active Seller",
    suspended: "Suspended",
    banned: "Application Rejected",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyles[status]}`}
    >
      {labels[status]}
    </span>
  );
}


export function SellerViewModel({
  seller,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onRequestDocs,
}: SellerViewModelProps): React.ReactElement | null {
  const [activeTab, setActiveTab] = useState<ModalTab>("overview");
  const [requestMessage, setRequestMessage] = useState<string>(
    "Please upload a clearer tax card image and add your business address."
  );
  const [submittingAction, setSubmittingAction] = useState<
    "approve" | "reject" | "request" | null
  >(null);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<{
    title: string;
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setActiveTab("overview");
      setShowRejectConfirm(false);
      setSubmittingAction(null);
      setPreviewDocument(null);
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
