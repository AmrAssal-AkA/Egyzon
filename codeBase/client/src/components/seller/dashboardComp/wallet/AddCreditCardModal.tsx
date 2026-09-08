"use client";

import React, { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const emptySubscribe = () => () => {};
import {
  X,
  CreditCard as CreditCardIcon,
  ShieldCheck,
  Lock,
  User,
  Calendar,
  AlertCircle,
  Wifi,
  Landmark,
  Building,
} from "lucide-react";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import { AddCreditCardDto, CardBrand } from "@/types/wallet";
import { sellerService } from "@/services/sellerService";

const EGYPTIAN_BANKS = [
  { code: "CIB", name: "CIB - Commercial International Bank (البنك التجاري الدولي)" },
  { code: "NBE", name: "NBE - National Bank of Egypt (البنك الأهلي المصري)" },
  { code: "BM", name: "BM - Banque Misr (بنك مصر)" },
  { code: "BDC", name: "BDC - Banque Du Caire (بنك القاهرة)" },
  { code: "QNB", name: "QNB - QNB Al Ahli (قطر الوطني الأهلي)" },
  { code: "AAIB", name: "AAIB - Arab African International Bank (العربي الأفريقي)" },
  { code: "ALEX", name: "Bank of Alexandria (بنك الإسكندرية)" },
  { code: "FAB", name: "FAB - First Abu Dhabi Bank (بنك أبوظبي الأول)" },
  { code: "HSBC", name: "HSBC Egypt (إتش إس بي سي مصر)" },
  { code: "ADIB", name: "ADIB - Abu Dhabi Islamic Bank (مصرف أبوظبي الإسلامي)" },
  { code: "MEEZA", name: "Meeza Bank Card (بطاقة ميزة البنكية)" },
];

interface AddCreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard?: (card: AddCreditCardDto & { colorVariant?: "blue" | "dark" | "emerald" | "purple" }) => Promise<boolean> | boolean;
  onBankAccountAdded?: () => void;
  defaultTab?: "bank_account" | "credit_card";
}

export default function AddCreditCardModal({
  isOpen,
  onClose,
  onAddCard,
  onBankAccountAdded,
  defaultTab = "bank_account",
}: AddCreditCardModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"bank_account" | "credit_card">(defaultTab);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll when modal is open to isolate background
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // --- Bank Account Form State (Local component state only - NEVER in global/persisted state) ---
  const [bankFullName, setBankFullName] = useState("");
  const [bankCode, setBankCode] = useState("CIB");
  const [bankCardNumber, setBankCardNumber] = useState("");

  // --- Credit Card Form State ---
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [colorVariant, setColorVariant] = useState<"blue" | "dark" | "emerald" | "purple">("blue");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detect brand in real-time from card number (for credit card mode)
  const detectedBrand: CardBrand = useMemo(() => {
    const cleanNum = cardNumber.replace(/\D/g, "");
    if (/^4/.test(cleanNum)) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(cleanNum)) return "mastercard";
    if (/^(5078|6051|6052|6053)/.test(cleanNum)) return "meeza";
    if (/^3[47]/.test(cleanNum)) return "amex";
    return "other";
  }, [cardNumber]);

  if (!isOpen || !mounted) return null;

  // --- Bank Account Handlers ---
  const handleBankCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const truncated = rawValue.slice(0, 24);
    // Format in chunks of 4 for readable visual masking
    const formatted = truncated.replace(/(\d{4})(?=\d)/g, "$1 ");
    setBankCardNumber(formatted);
    setError("");
  };

  const handleBankAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanNumber = bankCardNumber.replace(/\s+/g, "");
    if (!bankFullName.trim() || bankFullName.trim().length < 3) {
      setError("Please enter the full account holder name as registered with the bank.");
      return;
    }

    if (!cleanNumber || cleanNumber.length < 10 || cleanNumber.length > 34) {
      setError("Please enter a valid bank card or account number (10 to 34 digits).");
      return;
    }

    if (!bankCode) {
      setError("Please select your bank institution.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Dispatch to service layer without logging sensitive data
      const res = await sellerService.addSellerBankAccount({
        issuer: "bank_card",
        fullName: bankFullName.trim(),
        bankCardNumber: cleanNumber,
        bankCode,
      });

      // Discard raw bank card number from memory immediately after submission
      setBankCardNumber("");

      if (!res.success) {
        setError(res.error || res.message || "Failed to link bank account. Please check details.");
        return;
      }

      toast.success("Bank account linked successfully", {
        description: `Your ${bankCode} account is now submitted and pending verification for payouts.`,
      });

      // Trigger SWR cache revalidation
      onBankAccountAdded?.();

      // Reset fields & close
      setBankFullName("");
      setBankCode("CIB");
      onClose();
    } catch {
      setBankCardNumber("");
      setError("An unexpected error occurred while linking your bank account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Credit Card Handlers ---
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const truncated = rawValue.slice(0, 16);
    const formatted = truncated.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
    setError("");
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const truncated = rawValue.slice(0, 4);
    let formatted = truncated;
    if (truncated.length >= 3) {
      formatted = `${truncated.slice(0, 2)}/${truncated.slice(2)}`;
    }
    setExpiryDate(formatted);
    setError("");
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setCvv(rawValue.slice(0, 4));
    setError("");
  };

  const handleCreditCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!onAddCard) return;

    const cleanNumber = cardNumber.replace(/\s+/g, "");
    if (cleanNumber.length < 15 || cleanNumber.length > 16) {
      setError("Please enter a valid 15 or 16-digit card number.");
      return;
    }

    if (!cardHolder.trim()) {
      setError("Please enter the cardholder name as displayed on the card.");
      return;
    }

    const [monthStr, yearStr] = expiryDate.split("/");
    const month = parseInt(monthStr, 10);
    if (!monthStr || !yearStr || isNaN(month) || month < 1 || month > 12) {
      setError("Please enter a valid expiry date (MM/YY).");
      return;
    }

    if (cvv.length < 3) {
      setError("Please enter a valid 3 or 4-digit security code (CVV).");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onAddCard({
        cardHolder: cardHolder.trim().toUpperCase(),
        cardNumber: cleanNumber,
        expiryDate,
        cvv,
        isDefault,
        colorVariant,
      });

      if (success) {
        setCardNumber("");
        setCardHolder("");
        setExpiryDate("");
        setCvv("");
        setIsDefault(false);
        setColorVariant("blue");
        onClose();
      }
    } catch {
      setError("Failed to add credit card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview formatted helpers
  const previewDigits =
    activeTab === "bank_account"
      ? bankCardNumber.replace(/\s+/g, "")
      : cardNumber.replace(/\s+/g, "");

  const formattedPreviewNumber = () => {
    if (!previewDigits) return "•••• •••• •••• ••••";
    const last4 = previewDigits.slice(-4);
    if (previewDigits.length <= 4) {
      return `•••• •••• •••• ${previewDigits}`;
    }
    return `•••• •••• •••• ${last4}`;
  };

  const getPreviewGradient = () => {
    if (activeTab === "bank_account") {
      return "from-slate-900 via-indigo-950 to-blue-950";
    }
    switch (colorVariant) {
      case "emerald":
        return "from-emerald-900 via-teal-950 to-slate-950";
      case "purple":
        return "from-purple-950 via-indigo-950 to-slate-950";
      case "dark":
        return "from-slate-900 via-zinc-900 to-black";
      case "blue":
      default:
        return "from-blue-900 via-indigo-950 to-slate-950";
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 overflow-y-auto">
      {/* Isolated Backdrop */}
      <div
        onClick={() => !isSubmitting && onClose()}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity cursor-pointer animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-y-auto max-h-[92vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-2xl flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100 z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              {activeTab === "bank_account" ? (
                <Landmark className="h-5 w-5" />
              ) : (
                <CreditCardIcon className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {activeTab === "bank_account" ? "Link Payout Bank Account" : "Add Credit Card"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeTab === "bank_account"
                  ? "Direct withdrawal to Egyptian bank card or account"
                  : "Save a card for store billing and payments"}
              </p>
            </div>
          </div>
          <button
            disabled={isSubmitting}
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-400 hover:text-slate-600 cursor-pointer disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher: Payout Bank Account vs Standard Card */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setActiveTab("bank_account");
              setError("");
            }}
            className={cn(
              "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5",
              activeTab === "bank_account"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Landmark className="h-3.5 w-3.5" />
            <span>Payout Bank Account</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("credit_card");
              setError("");
            }}
            className={cn(
              "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5",
              activeTab === "credit_card"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <CreditCardIcon className="h-3.5 w-3.5" />
            <span>Debit / Credit Card</span>
          </button>
        </div>

        {/* Live Interactive Card Preview */}
        <div className="w-full flex flex-col items-center">
          <div
            className={cn(
              "relative w-full aspect-[1.7/1] max-w-sm rounded-2xl p-5 bg-linear-to-br text-white shadow-xl border border-white/15 overflow-hidden transition-all duration-300 flex flex-col justify-between select-none",
              getPreviewGradient()
            )}
          >
            {/* Gloss circles */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-blue-400/10 blur-xl" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                {/* Chip */}
                <div className="h-7 w-9 rounded-md bg-linear-to-tr from-amber-300 via-amber-200 to-yellow-400 p-0.5 border border-amber-400/40 shadow-inner flex items-center justify-center">
                  <div className="w-full h-full border border-amber-600/30 rounded-[3px] flex flex-col justify-between py-0.5">
                    <div className="w-full h-px bg-amber-600/30" />
                    <div className="w-full h-px bg-amber-600/30" />
                  </div>
                </div>
                <Wifi className="h-4 w-4 rotate-90 text-white/60" />

                {activeTab === "bank_account" && bankCode && (
                  <span className="px-2 py-0.5 rounded bg-white/15 border border-white/20 text-white text-xs font-bold tracking-wider">
                    {bankCode}
                  </span>
                )}
              </div>

              {/* Status or Scheme Logo */}
              <div className="flex items-center gap-1.5">
                {activeTab === "bank_account" ? (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-semibold tracking-wider">
                    Pending Verification
                  </span>
                ) : (
                  <>
                    {detectedBrand === "visa" && (
                      <FaCcVisa className="h-8 w-8 text-white" />
                    )}
                    {detectedBrand === "mastercard" && (
                      <FaCcMastercard className="h-8 w-8 text-amber-400" />
                    )}
                    {detectedBrand === "amex" && (
                      <FaCcAmex className="h-8 w-8 text-sky-400" />
                    )}
                    {detectedBrand === "meeza" && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase">
                        Meeza ميزة
                      </span>
                    )}
                    {detectedBrand === "other" && (
                      <CreditCardIcon className="h-6 w-6 text-white/70" />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Middle: Masked Number */}
            <div className="relative z-10">
              <div className="font-mono text-base sm:text-lg tracking-[0.18em] text-white/95 font-medium">
                {formattedPreviewNumber()}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-end justify-between relative z-10 text-xs">
              <div className="flex flex-col max-w-[65%]">
                <span className="text-[9px] uppercase tracking-widest text-white/50 font-medium">
                  {activeTab === "bank_account" ? "Account Holder" : "Cardholder"}
                </span>
                <span className="font-semibold text-white uppercase tracking-wider truncate text-xs">
                  {activeTab === "bank_account"
                    ? bankFullName.trim() || "AHMED HASSAN"
                    : cardHolder.trim() || "YOUR FULL NAME"}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[9px] uppercase tracking-widest text-white/50 font-medium">
                  {activeTab === "bank_account" ? "Type" : "Expires"}
                </span>
                <span className="font-mono font-medium text-white text-xs">
                  {activeTab === "bank_account"
                    ? "Bank Card"
                    : expiryDate || "MM/YY"}
                </span>
              </div>
            </div>
          </div>

          {/* Color theme selectors (only for standard credit card mode) */}
          {activeTab === "credit_card" && (
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-[11px] font-medium">Card Style:</span>
              <div className="flex items-center gap-1.5">
                {(
                  [
                    { id: "blue", bg: "bg-blue-600" },
                    { id: "dark", bg: "bg-slate-900" },
                    { id: "emerald", bg: "bg-emerald-600" },
                    { id: "purple", bg: "bg-purple-600" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setColorVariant(item.id)}
                    className={cn(
                      "w-5 h-5 rounded-full cursor-pointer transition-all border-2",
                      item.bg,
                      colorVariant === item.id
                        ? "border-blue-500 scale-110 shadow-xs"
                        : "border-transparent opacity-70 hover:opacity-100"
                    )}
                    aria-label={`Select ${item.id} card style`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error notice */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-medium border border-rose-100 dark:border-rose-900/50">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* ========================================================
            TAB 1: Bank Account Form (POST /api/seller/add-bank-account)
            Adheres strictly to Client-Side Security guidelines:
            - local state only, cleared immediately after submit
            - autoComplete="off", inputMode="numeric", name="bankCardNumber"
            - visually masked, zero-logging
           ======================================================== */}
        {activeTab === "bank_account" ? (
          <form onSubmit={handleBankAccountSubmit} className="flex flex-col gap-4">
            {/* Bank Institution Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Egyptian Bank Institution
              </label>
              <div className="relative">
                <select
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pl-10 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                >
                  {EGYPTIAN_BANKS.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <Building className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Account Holder Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Account Holder Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={bankFullName}
                  onChange={(e) => {
                    setBankFullName(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. Ahmed Hassan"
                  required
                  autoComplete="off"
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pl-10 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Bank Card / Account Number with security attributes */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bank Card or Account Number
                </label>
                <span className="text-[10px] text-slate-400">10-24 digits</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  name="bankCardNumber"
                  aria-label="Bank account number"
                  value={bankCardNumber}
                  onChange={handleBankCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={28}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pl-10 text-sm font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <CreditCardIcon className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Security note & verification disclaimer */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-300">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                Your bank details are encrypted and sent securely to Paymob / Egyptian banking network. The account starts in <strong>pending verification</strong> status until confirmed.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                isLoading={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-35"
              >
                Link Bank Account
              </Button>
            </div>
          </form>
        ) : (
             // credit card form
          <form onSubmit={handleCreditCardSubmit} className="flex flex-col gap-4">
            {/* Card Number Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="4532 1234 5678 9012"
                  maxLength={19}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pl-10 text-sm font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <CreditCardIcon className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Cardholder Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => {
                    setCardHolder(e.target.value.toUpperCase());
                    setError("");
                  }}
                  placeholder="AHMED MOHAMED"
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pl-10 text-sm uppercase text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Expiry and CVV Row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Expiry */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Expires (MM/YY)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="08/28"
                    maxLength={5}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pl-10 text-sm font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                  <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* CVV */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    CVV / CVC
                  </label>
                  <span className="text-[10px] text-slate-400">3-4 digits</span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="•••"
                    maxLength={4}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pl-10 text-sm font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Checkbox: Set as Default */}
            <label className="flex items-center gap-2.5 cursor-pointer mt-1 select-none">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Set as default payment & payout method
              </span>
            </label>

            {/* Security note */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>
                Your card is tokenized with 256-bit SSL encryption adhering to PCI-DSS standards.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                isLoading={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-32.5"
              >
                Save Card
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

