import React from "react";

import BalanceWallet from "@/components/seller/dashboardComp/wallet/BalanceWallet";
import TransactionTable from "@/components/seller/dashboardComp/wallet/transactionTable";
import SellerCreditCards from "@/components/seller/dashboardComp/wallet/SellerCreditCards";

export const metadata = {
  title: "Egyzon - Seller Wallet",
  description: "Manage your wallet and view transaction history",
  meta: {
    viewport: "width=device-width, initial-scale=1",
    robots: "noindex, nofollow",
  },
};

function WalletPage() {
  return (
    <main className="w-full min-w-0 flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 font-serif tracking-tight">
          Wallet
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Manage your wallet and view transaction history
        </p>
      </div>
      <div className="flex flex-col gap-5 sm:gap-6">
        <BalanceWallet />
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-7 2xl:col-span-8 min-w-0">
            <TransactionTable />
          </div>
          <div className="xl:col-span-5 2xl:col-span-4 min-w-0 xl:sticky xl:top-6">
            <SellerCreditCards />
          </div>
        </div>
      </div>
    </main>
  );
}

export default WalletPage;

