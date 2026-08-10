"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Store,
  FileText,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/button";
import ImageDropzone from "./ImageDropzone";
import { SellerFormData, RegisterAsSellerModalProps } from "@/types/seller";
import { sellerService } from "@/services/sellerService";
import { toast } from "sonner";

export function RegisterAsSellerModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: RegisterAsSellerModalProps) {
  const [formData, setFormData] = useState<SellerFormData>({
    shopName: "",
    commercialRegisterNumber: "",
    taxCardNumber: "",
    commercialRegisterImage: null,
    taxCardImage: null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SellerFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SellerFormData, string>> = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = "Shop name is required";
    } else if (formData.shopName.length < 3) {
      newErrors.shopName = "Shop name must be at least 3 characters";
    }

    if (!formData.commercialRegisterNumber.trim()) {
      newErrors.commercialRegisterNumber =
        "Commercial Register Number is required";
    }

    if (!formData.taxCardNumber.trim()) {
      newErrors.taxCardNumber = "Tax Card Number is required";
    }

    if (!formData.commercialRegisterImage) {
      newErrors.commercialRegisterImage =
        "Commercial Register document is required";
    }

    if (!formData.taxCardImage) {
      newErrors.taxCardImage = "Tax Card document is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SellerFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const response = await sellerService.applyAsSeller(formData);
    console.log("Seller application response:", response);
    setIsSubmitting(false);
    if (response.success) {
      setIsSuccess(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
      toast.success(response.message || "Application submitted successfully!");
      onClose();
    } else {
      console.error(response.message);
      toast.error(response.message || "Failed to apply as seller");
    }
  };

  const handleReset = () => {
    setFormData({
      shopName: "",
      commercialRegisterNumber: "",
      taxCardNumber: "",
      commercialRegisterImage: null,
      taxCardImage: null,
    });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-background rounded-2xl border border-border shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Header decoration bar */}
        <div className="h-1.5 w-full bg-linear-to-r from-blue-600 via-indigo-500 to-emerald-500" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                Apply as Seller
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <Sparkles className="w-3 h-3" /> Quick Setup
                </span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Complete your business details to join the Egyzon vendor
                platform.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[calc(85vh-120px)] overflow-y-auto">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-foreground">
                Application Submitted!
              </h4>
              <p className="text-sm text-muted-foreground max-w-md">
                Your application for{" "}
                <strong className="text-foreground">{formData.shopName}</strong>{" "}
                has been received. Our compliance team will review your
                Commercial Register and Tax Card documents shortly.
              </p>
              <div className="pt-4 flex gap-3">
                <Button
                  variant="default"
                  onClick={handleReset}
                  className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Section: Shop Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Business Details
                </h4>

                {/* Shop Name Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="shopName"
                    className="text-sm font-semibold text-foreground"
                  >
                    Shop / Store Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                      <Store className="w-4 h-4" />
                    </div>
                    <input
                      id="shopName"
                      name="shopName"
                      type="text"
                      placeholder="e.g. Cairo Tech Store"
                      value={formData.shopName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        errors.shopName
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-blue-500"
                      }`}
                    />
                  </div>
                  {errors.shopName && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.shopName}
                    </p>
                  )}
                </div>

                {/* Grid for Commercial Register & Tax Card Numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Commercial Register Number */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="commercialRegisterNumber"
                      className="text-sm font-semibold text-foreground"
                    >
                      Commercial Register No.{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                        <FileText className="w-4 h-4" />
                      </div>
                      <input
                        id="commercialRegisterNumber"
                        name="commercialRegisterNumber"
                        type="text"
                        placeholder="e.g. 1029384"
                        value={formData.commercialRegisterNumber}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          errors.commercialRegisterNumber
                            ? "border-red-500 focus:border-red-500"
                            : "border-border focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.commercialRegisterNumber && (
                      <p className="flex items-center gap-1 text-xs text-red-500 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.commercialRegisterNumber}
                      </p>
                    )}
                  </div>

                  {/* Tax Card Number */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="taxCardNumber"
                      className="text-sm font-semibold text-foreground"
                    >
                      Tax Card No. <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <input
                        id="taxCardNumber"
                        name="taxCardNumber"
                        type="text"
                        placeholder="e.g. 987-654-321"
                        value={formData.taxCardNumber}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          errors.taxCardNumber
                            ? "border-red-500 focus:border-red-500"
                            : "border-border focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.taxCardNumber && (
                      <p className="flex items-center gap-1 text-xs text-red-500 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.taxCardNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Section: Document Uploads */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Verification Documents
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Commercial Register Image Dropzone */}
                  <ImageDropzone
                    id="commercialRegisterImage"
                    label="Commercial Register Document"
                    description="Upload clear image or PDF scan"
                    file={formData.commercialRegisterImage}
                    onFileSelect={(file) => {
                      setFormData((prev) => ({
                        ...prev,
                        commercialRegisterImage: file,
                      }));
                      if (errors.commercialRegisterImage) {
                        setErrors((prev) => ({
                          ...prev,
                          commercialRegisterImage: undefined,
                        }));
                      }
                    }}
                    error={errors.commercialRegisterImage}
                  />

                  {/* Tax Card Image Dropzone */}
                  <ImageDropzone
                    id="taxCardImage"
                    label="Tax Card Document"
                    description="Upload clear image or PDF scan"
                    file={formData.taxCardImage}
                    onFileSelect={(file) => {
                      setFormData((prev) => ({ ...prev, taxCardImage: file }));
                      if (errors.taxCardImage) {
                        setErrors((prev) => ({
                          ...prev,
                          taxCardImage: undefined,
                        }));
                      }
                    }}
                    error={errors.taxCardImage}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 h-11 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterAsSellerModal;
