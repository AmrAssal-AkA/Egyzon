"use client";

import React, { useState } from "react";

import {
  BadgeDollarSign,
  Loader2,
  X,
  Landmark,
  Smartphone,
  Send,
  Calendar,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { FaMoneyBillWave, FaReceipt } from "react-icons/fa";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { BalanceWalletProps } from "@/types/wallet"


export default function BalanceWallet({
  balance,
  pendingBalance = 3500.00,
  lastPayoutAmount = 1200.00,
  lastPayoutDate = "2024-10-18T10:00:00.000Z",
  onWithdrawSubmit,
  onGenerateStatementSubmit,
}: BalanceWalletProps) {
  
  // --- Modals State ---
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isStatementOpen, setIsStatementOpen] = useState(false);

  // --- Withdraw Form State ---
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState<"bank" | "vodafone" | "instapay">("bank");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [vodafoneNumber, setVodafoneNumber] = useState("");
  const [instapayAddress, setInstapayAddress] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");

  // --- Statement Form State ---
  const [statementRange, setStatementRange] = useState<"7days" | "30days" | "90days" | "custom">("30days");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statementFormat, setStatementFormat] = useState<"pdf" | "csv" | "excel">("pdf");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- Formatter Helpers ---
  const formatCurrency = (val: number) => {
    return val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatSimpleDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  // --- Withdrawal Submit Handler ---
  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError("");

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setWithdrawError("Please enter a valid withdrawal amount.");
      return;
    }

    if (amount < 100) {
      setWithdrawError("Minimum withdrawal amount is 100 EGP.");
      return;
    }

    if (amount > balance) {
      setWithdrawError("Insufficient funds in available balance.");
      return;
    }

    // Prepare details based on method
    const details: Record<string, string> = {};
    if (withdrawMethod === "bank") {
      if (!bankName.trim() || !bankAccount.trim() || !accountHolder.trim()) {
        setWithdrawError("Please fill out all bank account fields.");
        return;
      }
      details.bankName = bankName;
      details.bankAccount = bankAccount;
      details.accountHolder = accountHolder;
    } else if (withdrawMethod === "vodafone") {
      const isMobileValid = /^(010|011|012|015)[0-9]{8}$/.test(vodafoneNumber);
      if (!isMobileValid) {
        setWithdrawError("Please enter a valid 11-digit mobile wallet number starting with 010/011/012/015.");
        return;
      }
      details.vodafoneNumber = vodafoneNumber;
    } else if (withdrawMethod === "instapay") {
      if (!instapayAddress.includes("@")) {
        setWithdrawError("Please enter a valid Instapay IPA address (e.g. name@instapay).");
        return;
      }
      details.instapayAddress = instapayAddress;
    }

    setIsWithdrawing(true);

    try {
      if (onWithdrawSubmit) {
        const success = await onWithdrawSubmit(amount, withdrawMethod, details);
        if (success) {
          toast.success(`Successfully requested withdrawal of ${formatCurrency(amount)} EGP!`);
          setIsWithdrawOpen(false);
          resetWithdrawForm();
        } else {
          setWithdrawError("Failed to submit withdrawal. Please try again.");
        }
      } else {
        // Simulated local fallback success
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success(`Successfully requested withdrawal of ${formatCurrency(amount)} EGP!`);
        setIsWithdrawOpen(false);
        resetWithdrawForm();
      }
    } catch {
      setWithdrawError("An unexpected error occurred. Please try again.");
    } finally {
      setIsWithdrawing(false);
    }
  };

  const resetWithdrawForm = () => {
    setWithdrawAmount("");
    setBankName("");
    setBankAccount("");
    setAccountHolder("");
    setVodafoneNumber("");
    setInstapayAddress("");
    setWithdrawError("");
  };

  // --- Statement Submit Handler ---
  const handleStatementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (statementRange === "custom" && (!startDate || !endDate)) {
      toast.error("Please select both start and end dates.");
      return;
    }

    setIsGenerating(true);

    try {
      if (onGenerateStatementSubmit) {
        const customDates = statementRange === "custom" ? { start: startDate, end: endDate } : undefined;
        await onGenerateStatementSubmit(statementRange, statementFormat, customDates);
      } else {
        // Simulated local fallback download
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      
      toast.success(`Statement generated successfully in ${statementFormat.toUpperCase()} format!`);
      setIsStatementOpen(false);
    } catch {
      toast.error("Failed to generate statement. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 p-4">
      
      {/* --- Main Available Balance Card --- */}
      <div className="flex-1 relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-900 via-indigo-950 to-slate-900 p-6 md:p-8 shadow-xl border border-blue-950 dark:border-blue-900/50">
        
        {/* Glow decorative graphics */}
        <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-200/80">
                Egyzon Seller Account
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">Available Balance</h2>
            </div>
            <div className="rounded-full bg-white/10 p-3 backdrop-blur-md border border-white/10">
              <BadgeDollarSign className="h-6 w-6 text-blue-200" />
            </div>
          </div>

          <div className="my-2">
            <p className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight flex items-baseline gap-2">
              {formatCurrency(balance)}
              <span className="text-lg font-sans font-medium text-blue-300">EGP</span>
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={() => setIsWithdrawOpen(true)}
              className="bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:bg-emerald-600 px-5 py-2.5 rounded-xl transition duration-200 font-semibold text-sm cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-950/20"
            >
              <FaMoneyBillWave className="h-4 w-4" />
              Withdraw Funds
            </button>
            <button
              onClick={() => setIsStatementOpen(true)}
              className="bg-white/10 text-white hover:bg-white/15 active:bg-white/20 px-5 py-2.5 rounded-xl border border-white/10 transition duration-200 font-semibold text-sm cursor-pointer flex items-center gap-2 backdrop-blur-sm"
            >
              <FaReceipt className="h-4 w-4" />
              Generate Statement
            </button>
          </div>
        </div>
      </div>

      {/* --- Secondary Metadata Cards --- */}
      <div className="w-full lg:w-80 flex flex-col sm:flex-row lg:flex-col gap-4">
        
        {/* Pending Clearance Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pending Clearance
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {formatCurrency(pendingBalance)} <span className="text-sm font-sans font-medium text-slate-500">EGP</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 opacity-70" />
              Settling within 3-5 business days.
            </p>
          </div>
        </div>

        {/* Last Payout Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Last Withdrawal
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-400">
              <ArrowUpRight className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {formatCurrency(lastPayoutAmount)} <span className="text-sm font-sans font-medium text-slate-500">EGP</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 opacity-70" />
              Processed on {formatSimpleDate(lastPayoutDate)}
            </p>
          </div>
        </div>

      </div>

      {/* --- Withdraw Dialog / Modal --- */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Overlay Backdrop */}
          <div 
            onClick={() => !isWithdrawing && setIsWithdrawOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity cursor-pointer"
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-indigo-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Withdrawal Request</h3>
              </div>
              <button 
                disabled={isWithdrawing}
                onClick={() => setIsWithdrawOpen(false)}
                className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-400 hover:text-slate-600 disabled:opacity-50 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Error Message */}
            {withdrawError && (
              <div className="flex items-start gap-2 p-3 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{withdrawError}</span>
              </div>
            )}

            <form onSubmit={handleWithdrawSubmit} className="flex flex-col gap-4">
              
              {/* Available Bal Helper */}
              <div className="text-xs bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg flex justify-between font-medium">
                <span className="text-slate-500">Available to Withdraw:</span>
                <span className="text-slate-800 dark:text-slate-200">{formatCurrency(balance)} EGP</span>
              </div>

              {/* Amount Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Amount (EGP)
                </label>
                <input
                  type="number"
                  placeholder="Min 100 EGP"
                  min="100"
                  max={balance}
                  step="0.01"
                  required
                  disabled={isWithdrawing}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-700/80 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                />
              </div>

              {/* Method Selector tabs */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Payout Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["bank", "vodafone", "instapay"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      disabled={isWithdrawing}
                      onClick={() => {
                        setWithdrawMethod(m);
                        setWithdrawError("");
                      }}
                      className={cn(
                        "py-2 px-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition duration-200 cursor-pointer capitalize",
                        withdrawMethod === m
                          ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-400"
                          : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 text-slate-500"
                      )}
                    >
                      {m === "bank" && <Landmark className="h-4 w-4" />}
                      {m === "vodafone" && <Smartphone className="h-4 w-4" />}
                      {m === "instapay" && <Send className="h-4 w-4" />}
                      {m === "vodafone" ? "Vodafone Cash" : m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic input sections based on method selection */}
              {withdrawMethod === "bank" && (
                <div className="flex flex-col gap-3 p-3 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 rounded-xl animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Bank Name</label>
                    <input
                      type="text"
                      placeholder="e.g. CIB, QNB, NBE"
                      required
                      disabled={isWithdrawing}
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">IBAN / Account Number</label>
                    <input
                      type="text"
                      placeholder="EG00 0000 ..."
                      required
                      disabled={isWithdrawing}
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Account Holder Full Name</label>
                    <input
                      type="text"
                      placeholder="As registered in your bank"
                      required
                      disabled={isWithdrawing}
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {withdrawMethod === "vodafone" && (
                <div className="flex flex-col gap-2 p-3 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 rounded-xl animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Mobile Wallet Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 01012345678"
                      maxLength={11}
                      required
                      disabled={isWithdrawing}
                      value={vodafoneNumber}
                      onChange={(e) => setVodafoneNumber(e.target.value)}
                      className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              )}

              {withdrawMethod === "instapay" && (
                <div className="flex flex-col gap-2 p-3 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 rounded-xl animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Instapay Handle (IPA)</label>
                    <input
                      type="text"
                      placeholder="e.g. name@instapay"
                      required
                      disabled={isWithdrawing}
                      value={instapayAddress}
                      onChange={(e) => setInstapayAddress(e.target.value)}
                      className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end border-t border-slate-100 dark:border-slate-800 pt-3.5 mt-2">
                <button
                  type="button"
                  disabled={isWithdrawing}
                  onClick={() => setIsWithdrawOpen(false)}
                  className="px-4 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isWithdrawing}
                  className="px-5 py-2 text-xs font-semibold bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 active:bg-emerald-600 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isWithdrawing && <Loader2 className="h-3 w-3 animate-spin" />}
                  Request Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Generate Statement Dialog / Modal --- */}
      {isStatementOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Overlay Backdrop */}
          <div 
            onClick={() => !isGenerating && setIsStatementOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity cursor-pointer"
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Account Statement</h3>
              </div>
              <button 
                disabled={isGenerating}
                onClick={() => setIsStatementOpen(false)}
                className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-400 hover:text-slate-600 disabled:opacity-50 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleStatementSubmit} className="flex flex-col gap-4">
              
              {/* Date Range Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Select Period
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["7days", "30days", "90days", "custom"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      disabled={isGenerating}
                      onClick={() => setStatementRange(r)}
                      className={cn(
                        "py-2 px-3 border text-xs font-semibold rounded-xl text-center cursor-pointer transition duration-150",
                        statementRange === r
                          ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-400"
                          : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 text-slate-500"
                      )}
                    >
                      {r === "7days" && "Last 7 Days"}
                      {r === "30days" && "Last 30 Days"}
                      {r === "90days" && "Last 90 Days"}
                      {r === "custom" && "Custom Range"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Date Inputs */}
              {statementRange === "custom" && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 rounded-xl animate-in fade-in duration-150">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Start Date</label>
                    <input
                      type="date"
                      required
                      disabled={isGenerating}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">End Date</label>
                    <input
                      type="date"
                      required
                      disabled={isGenerating}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Format Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Download Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["pdf", "csv", "excel"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      disabled={isGenerating}
                      onClick={() => setStatementFormat(f)}
                      className={cn(
                        "py-2 px-3 border text-xs font-semibold rounded-xl text-center cursor-pointer transition duration-150 uppercase",
                        statementFormat === f
                          ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-400"
                          : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 text-slate-500"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end border-t border-slate-100 dark:border-slate-800 pt-3.5 mt-2">
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={() => setIsStatementOpen(false)}
                  className="px-4 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-5 py-2 text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl cursor-pointer disabled:opacity-50 flex items-center gap-1.5 transition duration-150"
                >
                  {isGenerating && <Loader2 className="h-3 w-3 animate-spin" />}
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
