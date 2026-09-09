"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authServices } from "@/services/authServices";
import { useAuth } from "@/hooks/useAuth";
import InputField from "@/components/ui/common/InputField";
import Button from "@/components/ui/common/Button";
import { Spinner } from "@/components/ui/spinner";
import ErrorIcon  from "@/components/ui/ErrorIcon";

const PHONE_REGEX = /^\+?[1-9]\d{7,14}$/;

type ValidationStatus = "idle" | "loading" | "valid" | "invalid";

export const OnboardingContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const { user, isAuthenticated, loading: authLoading, refreshSession } = useAuth();

  const [validationStatus, setValidationStatus] = useState<ValidationStatus>("loading");
  const [validationError, setValidationError] = useState<string>("");

  const formatAddressAsString = useCallback((addr: unknown): string => {
    if (!addr) return "";
    if (typeof addr === "string") return addr;
    if (typeof addr === "object") {
      const parts = Object.values(addr as Record<string, unknown>).filter(
        (v): v is string | number => (typeof v === "string" && v.trim().length > 0) || typeof v === "number"
      );
      if (parts.length > 0) return parts.join(", ");
    }
    return String(addr);
  }, []);

  const [address, setAddress] = useState<string>(() => formatAddressAsString(user?.address));
  const [countryCode, setCountryCode] = useState("+20");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [addressTouched, setAddressTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (user?.address) setAddress(formatAddressAsString(user.address));
    if (user?.phoneNumber) {
      const phoneStr = typeof user.phoneNumber === "string" ? user.phoneNumber : String(user.phoneNumber);
      const match = phoneStr.match(/^(\+\d{1,4})(.*)$/);
      if (match) {
        setCountryCode(match[1]);
        setPhoneNumber(match[2]);
      } else {
        setPhoneNumber(phoneStr);
      }
    }
  }, [user, formatAddressAsString]);

  const validateToken = useCallback(async (tokenToVerify: string) => {
    if (!tokenToVerify) {
      if (isAuthenticated || user) {
        setValidationStatus("valid");
        return;
      }
      setValidationStatus("invalid");
      setValidationError("Please sign in or use a valid email verification link to complete setup.");
      return;
    }

    setValidationStatus("loading");
    setValidationError("");

    try {
      const res = await authServices.verifyEmail(tokenToVerify);
      if (res.success) {
        setValidationStatus("valid");
      } else {
        setValidationStatus("invalid");
        setValidationError(res.message || "Invalid or expired verification token.");
      }
    } catch (err: unknown) {
      setValidationStatus("invalid");
      setValidationError("Failed to verify token. Please try again.");
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (authLoading) return;
    validateToken(token);
  }, [token, validateToken, authLoading]);

  // Input Validation Logic
  const COUNTRY_CODE_REGEX = /^\+\d{1,4}$/;
  const LOCAL_PHONE_REGEX = /^\d{6,14}$/;

  const safeAddress = formatAddressAsString(address);
  const safeCode = typeof countryCode === "string" ? countryCode : String(countryCode ?? "");
  const safePhone = typeof phoneNumber === "string" ? phoneNumber : String(phoneNumber ?? "");

  const trimmedAddress = safeAddress.trim();
  const trimmedCode = safeCode.trim();
  const trimmedPhone = safePhone.trim();
  const fullPhone = `${trimmedCode}${trimmedPhone}`;

  const isAddressValid = trimmedAddress.length > 0;
  const isCodeValid = COUNTRY_CODE_REGEX.test(trimmedCode);
  const isLocalPhoneValid = LOCAL_PHONE_REGEX.test(trimmedPhone);
  const isPhoneValid = isCodeValid && isLocalPhoneValid && PHONE_REGEX.test(fullPhone);

  const addressError = addressTouched && !isAddressValid ? "Address is required." : "";
  const phoneError =
    phoneTouched && !isPhoneValid
      ? "Please enter a valid country code (e.g. +20) and phone number (e.g. 1000000000)."
      : "";

  const isFormValid = isAddressValid && isPhoneValid;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAddressTouched(true);
    setPhoneTouched(true);

    if (!isFormValid) {
      return;
    }

    setSubmitLoading(true);
    setSubmitError("");

    try {
      const res = await authServices.completeOnboarding({
        address: trimmedAddress,
        phoneNumber: fullPhone,
        ...(token ? { token } : {}),
      });

      if (res.success) {
        toast.success("Profile setup complete!");
        await refreshSession();
        router.push("/dashboard");
      } else {
        const errorMsg = res.message || "Failed to submit onboarding details.";
        setSubmitError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred during onboarding.";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setSubmitLoading(false);
    }
  };

  // 1. Loading state while validating token or auth state
  if (validationStatus === "loading" || authLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <Spinner className="w-8 h-8 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Validating session...</h3>
        <p className="text-sm text-muted-foreground">
          Please wait while we verify your account state.
        </p>
      </div>
    );
  }

  // 2. Invalid token state if verification fails
  if (validationStatus === "invalid") {
    return (
      <div className="space-y-6 py-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-2">
          <ErrorIcon />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Verification Required
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          {validationError || "The verification link is invalid or has expired."}
        </p>
        <div className="pt-4">
          <Button
            type="button"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Return to Sign In
          </Button>
        </div>
      </div>
    );
  }

  // 3. Onboarding Form (only rendered after successful validation or authenticated user)
  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Please fill in your address and phone number to finish setting up your account.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <InputField
          id="address"
          name="address"
          label="Address"
          type="text"
          placeholder="123 Main St, Cairo, Egypt"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            if (!addressTouched) setAddressTouched(true);
          }}
          onBlur={() => setAddressTouched(true)}
          error={addressError}
          required
          disabled={submitLoading}
        />

        <div className="flex gap-2">
          <div className="w-32 shrink-0">
            <InputField
              id="countryCode"
              name="countryCode"
              label="Code"
              type="text"
              placeholder="+20"
              value={countryCode}
              onChange={(e) => {
                setCountryCode(e.target.value);
                if (!phoneTouched) setPhoneTouched(true);
              }}
              onBlur={() => setPhoneTouched(true)}
              required
              disabled
            />
          </div>
          <div className="flex-1">
            <InputField
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="tel"
              placeholder="1000000000"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (!phoneTouched) setPhoneTouched(true);
              }}
              onBlur={() => setPhoneTouched(true)}
              error={phoneError}
              required
              disabled={submitLoading}
            />
          </div>
        </div>

        {submitError && (
          <p className="text-sm text-red-500 font-medium" role="alert">
            {submitError}
          </p>
        )}

        <Button
          type="submit"
          loading={submitLoading}
          disabled={!isFormValid || submitLoading}
          className="w-full"
        >
          {submitLoading ? "Submitting..." : "Complete Setup"}
        </Button>
      </form>
    </div>
  );
};

export default OnboardingContent;
