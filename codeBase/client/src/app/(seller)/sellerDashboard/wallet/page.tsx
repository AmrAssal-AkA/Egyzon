import React from "react";

import BalanceWallet from "@/components/seller/dashboardComp/wallet/BalanceWallet";
import TransactionTable from "@/components/seller/dashboardComp/wallet/transactionTable";

export const metadata = {
  title: "Egyzon - Seller Wallet",
  description: "Manage your wallet and view transaction history",
  meta: {
    viewport: "width=device-width, initial-scale=1",
    robots: "noindex, nofollow",
  },
}


function WalletPage() {
  return (
    <main className="min-h-screen flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2 px-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 font-serif">
          Wallet
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your wallet and view transaction history
        </p>
      </div>
      <div className="flex flex-col gap-4 px-4">
        <BalanceWallet />
        <TransactionTable />
      </div>
    </main>
  );
}

export default WalletPage;
