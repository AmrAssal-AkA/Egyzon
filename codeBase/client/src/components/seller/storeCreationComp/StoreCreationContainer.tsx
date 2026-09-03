"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import { StorefrontFormData, StoreValidationErrors, StoreType } from "@/types/store";
import { sellerService } from "@/services/sellerService";

import StoreHeader from "./StoreHeader";
import StoreInfoSection from "./StoreInfoSection";
import StoreTypeSection from "./StoreTypeSection";
import StoreAddressSection from "./StoreAddressSection";
import StoreBrandingSection from "./StoreBrandingSection";
import StoreVisualPreview from "./StoreVisualPreview";
import StoreActionButtons from "./StoreActionButtons";

export default function StoreCreationContainer() {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState<StorefrontFormData>({
    storeName: "",
    description: "",
    storeType: "physical",
    address: "",
    city: "Cairo",
    logo: null,
    logoPreview: null,
    banner: null,
    bannerPreview: null,
  });

  const [errors, setErrors] = useState<StoreValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill store name from authenticated user if available
  useEffect(() => {
    if (user?.storeName) {
      setFormData((prev) => ({
        ...prev,
        storeName: prev.storeName || user.storeName || "",
      }));
    } else if (user?.FirstName && !formData.storeName) {
      setFormData((prev) => ({
        ...prev,
        storeName: `${user.FirstName}'s Store`,
      }));
    }
  }, [user]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (formData.logoPreview) URL.revokeObjectURL(formData.logoPreview);
      if (formData.bannerPreview) URL.revokeObjectURL(formData.bannerPreview);
    };
  }, [formData.logoPreview, formData.bannerPreview]);

  // Validation function
  const validate = (currentData = formData): boolean => {
    const newErrors: StoreValidationErrors = {};

    if (!currentData.storeName.trim()) {
      newErrors.storeName = "Store name is required.";
    } else if (currentData.storeName.trim().length < 3) {
      newErrors.storeName = "Store name must be at least 3 characters.";
    }

    if (!currentData.description.trim()) {
      newErrors.description = "Store description is required.";
    } else if (currentData.description.trim().length < 10) {
      newErrors.description = "Please provide a description of at least 10 characters.";
    } else if (currentData.description.length > 500) {
      newErrors.description = "Store description is too long (maximum 500 characters).";
    }

    if (currentData.storeType === "physical") {
      if (!currentData.address.trim()) {
        newErrors.address = "Please enter an address for your physical store.";
      } else if (currentData.address.trim().length < 5) {
        newErrors.address = "Please provide a complete physical street address.";
      }
    }

    if (!currentData.logo) {
      newErrors.logo = "Store logo is required.";
    }

    if (!currentData.banner) {
      newErrors.banner = "Store header banner is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInfoChange = (field: keyof StorefrontFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      if (field === "storeName" && value.trim().length >= 3) {
        setErrors((prev) => ({ ...prev, storeName: undefined }));
      }
      if (field === "description" && value.trim().length >= 10 && value.length <= 500) {
        setErrors((prev) => ({ ...prev, description: undefined }));
      }
    }
  };

  const handleBlur = (field: keyof StorefrontFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "storeName") {
      if (!formData.storeName.trim()) {
        setErrors((prev) => ({ ...prev, storeName: "Store name is required." }));
      } else if (formData.storeName.trim().length < 3) {
        setErrors((prev) => ({ ...prev, storeName: "Store name must be at least 3 characters." }));
      } else {
        setErrors((prev) => ({ ...prev, storeName: undefined }));
      }
    }
    if (field === "description") {
      if (!formData.description.trim()) {
        setErrors((prev) => ({ ...prev, description: "Store description is required." }));
      } else if (formData.description.trim().length < 10) {
        setErrors((prev) => ({ ...prev, description: "Please provide a description of at least 10 characters." }));
      } else if (formData.description.length > 500) {
        setErrors((prev) => ({ ...prev, description: "Store description is too long (maximum 500 characters)." }));
      } else {
        setErrors((prev) => ({ ...prev, description: undefined }));
      }
    }
  };

  const handleSelectType = (type: StoreType) => {
    setFormData((prev) => ({ ...prev, storeType: type }));
    if (type === "online") {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }
  };

  const handleChangeAddress = (address: string, city: string) => {
    setFormData((prev) => ({ ...prev, address, city }));
    if (address.trim().length >= 5) {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }
  };

  const handleLogoSelect = (file: File | null, previewUrl: string | null) => {
    setFormData((prev) => ({ ...prev, logo: file, logoPreview: previewUrl }));
    setErrors((prev) => ({ ...prev, logo: undefined }));
  };

  const handleBannerSelect = (file: File | null, previewUrl: string | null) => {
    setFormData((prev) => ({ ...prev, banner: file, bannerPreview: previewUrl }));
    setErrors((prev) => ({ ...prev, banner: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      storeName: true,
      description: true,
      address: true,
      logo: true,
      banner: true,
    });

    if (!validate()) {
      toast.error("Please fill in all required fields properly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sellerService.createStore(formData);

      if (response.success) {
        toast.success(response.message || "Storefront created successfully!");
        router.push("/sellerDashboard");
      } else {
        toast.error(response.message || "Failed to create store. Please check your data.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/sellerDashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Banner */}
      <StoreHeader />

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Identity, Type, and Address (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <StoreInfoSection
            formData={formData}
            errors={errors}
            onChange={handleInfoChange}
            onBlur={handleBlur}
          />

          <StoreTypeSection
            selectedType={formData.storeType}
            onSelectType={handleSelectType}
          />

          <StoreAddressSection
            storeType={formData.storeType}
            address={formData.address}
            city={formData.city}
            errors={errors}
            onChangeAddress={handleChangeAddress}
            onBlur={() => {
              setTouched((prev) => ({ ...prev, address: true }));
              if (formData.storeType === "physical" && !formData.address.trim()) {
                setErrors((prev) => ({ ...prev, address: "Please enter an address for your physical store." }));
              }
            }}
          />
        </div>

        {/* Right Column: Branding Assets & Live Customer Preview (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          <StoreBrandingSection
            logoFile={formData.logo}
            logoPreview={formData.logoPreview}
            bannerFile={formData.banner}
            bannerPreview={formData.bannerPreview}
            errors={errors}
            onLogoSelect={handleLogoSelect}
            onBannerSelect={handleBannerSelect}
          />

          <StoreVisualPreview formData={formData} />
        </div>
      </div>

      {/* Main Form Actions */}
      <StoreActionButtons
        isSubmitting={isSubmitting}
        onCancel={handleCancel}
      />
    </form>
  );
}
