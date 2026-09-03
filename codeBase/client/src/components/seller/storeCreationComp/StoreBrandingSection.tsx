"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Palette,
  UploadCloud,
  X,
  RefreshCw,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { StoreValidationErrors } from "@/types/store";

interface StoreBrandingSectionProps {
  logoFile: File | null;
  logoPreview: string | null;
  bannerFile: File | null;
  bannerPreview: string | null;
  errors: StoreValidationErrors;
  onLogoSelect: (file: File | null, previewUrl: string | null) => void;
  onBannerSelect: (file: File | null, previewUrl: string | null) => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const MAX_LOGO_MB = 5;
const MAX_BANNER_MB = 8;

export default function StoreBrandingSection({
  logoFile,
  logoPreview,
  bannerFile,
  bannerPreview,
  errors,
  onLogoSelect,
  onBannerSelect,
}: StoreBrandingSectionProps) {
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [isDraggingBanner, setIsDraggingBanner] = useState(false);
  const [logoLocalError, setLogoLocalError] = useState<string | null>(null);
  const [bannerLocalError, setBannerLocalError] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Validate File
  const validateFile = (
    file: File,
    maxMB: number,
    setError: (err: string | null) => void
  ): boolean => {
    setError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a supported image format (PNG, JPG, WEBP, or SVG).");
      return false;
    }
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxMB) {
      setError(`This image is larger than the allowed size of ${maxMB}MB.`);
      return false;
    }
    return true;
  };

  // Logo handlers
  const handleLogoFile = (file: File) => {
    if (validateFile(file, MAX_LOGO_MB, setLogoLocalError)) {
      const url = URL.createObjectURL(file);
      onLogoSelect(file, url);
    }
  };

  const handleRemoveLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    onLogoSelect(null, null);
    setLogoLocalError(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  // Banner handlers
  const handleBannerFile = (file: File) => {
    if (validateFile(file, MAX_BANNER_MB, setBannerLocalError)) {
      const url = URL.createObjectURL(file);
      onBannerSelect(file, url);
    }
  };

  const handleRemoveBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    onBannerSelect(null, null);
    setBannerLocalError(null);
    if (bannerInputRef.current) bannerInputRef.current.value = "";
  };

  const activeLogoError = errors.logo || logoLocalError;
  const activeBannerError = errors.banner || bannerLocalError;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Store Branding & Identity
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize your store logo and header banner to welcome customers
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Store Logo Section (Square 1:1) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>Store Logo (Avatar)</span>
              {logoPreview && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Logo Ready
                </span>
              )}
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              1:1 Square Ratio • Max 5MB
            </span>
          </div>

          <input
            ref={logoInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleLogoFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {logoPreview ? (
            <div className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/50">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-md shrink-0 bg-slate-100 dark:bg-slate-800">
                <Image
                  src={logoPreview}
                  alt="Store Logo Preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {logoFile?.name || "store-logo.png"}
                </p>
                <p className="text-[11px] text-slate-400">
                  {logoFile ? `${(logoFile.size / (1024 * 1024)).toFixed(2)} MB` : "Custom Image"}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Change
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => logoInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingLogo(true);
              }}
              onDragLeave={() => setIsDraggingLogo(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingLogo(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleLogoFile(e.dataTransfer.files[0]);
                }
              }}
              className={`relative rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-30 ${
                isDraggingLogo
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-[1.01]"
                  : activeLogoError
                  ? "border-red-400 bg-red-50/30 dark:bg-red-950/20"
                  : "border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-850"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center mb-1.5 pointer-events-none">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 pointer-events-none">
                <span className="text-blue-600 dark:text-blue-400">Click to upload logo</span> or drag and drop
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 pointer-events-none">
                Supported formats: PNG, JPG, WEBP, SVG (max. 5MB)
              </p>
            </div>
          )}

          {activeLogoError && (
            <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{activeLogoError}</span>
            </p>
          )}
        </div>

        {/* Store Banner Section (Wide 16:9 or 3:1) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>Storefront Banner (Header Cover)</span>
              {bannerPreview && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Banner Ready
                </span>
              )}
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Panoramic ~3:1 • Max 8MB
            </span>
          </div>

          <input
            ref={bannerInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleBannerFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {bannerPreview ? (
            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group shadow-sm">
              <div className="relative w-full h-32 sm:h-36 bg-slate-100 dark:bg-slate-800">
                <Image
                  src={bannerPreview}
                  alt="Store Banner Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5 text-xs truncate max-w-50">
                  <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{bannerFile?.name || "store-banner.png"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => bannerInputRef.current?.click()}
                    className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Replace
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveBanner}
                    className="p-1 rounded-lg bg-red-600/80 hover:bg-red-600 backdrop-blur-md text-white transition-all cursor-pointer"
                    title="Remove Banner"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => bannerInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingBanner(true);
              }}
              onDragLeave={() => setIsDraggingBanner(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingBanner(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleBannerFile(e.dataTransfer.files[0]);
                }
              }}
              className={`relative rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-35 ${
                isDraggingBanner
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-[1.01]"
                  : activeBannerError
                  ? "border-red-400 bg-red-50/30 dark:bg-red-950/20"
                  : "border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-850"
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center mb-2 pointer-events-none">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 pointer-events-none">
                <span className="text-blue-600 dark:text-blue-400">Click to upload store banner</span> or drag and drop
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 pointer-events-none">
                Recommended aspect 16:9 or 3:1 (max. 8MB)
              </p>
            </div>
          )}

          {activeBannerError && (
            <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{activeBannerError}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
