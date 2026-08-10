import React from 'react'

function WalletPage() {
  return (
    <main className='min-h-screen flex flex-col gap-4 p-4'>
        <div className='flex flex-col gap-2 px-4'>
            <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-200 font-serif'>Wallet</h1>
            <p className='text-gray-600 dark:text-gray-400'>Manage your wallet and view transaction history</p>
        </div>
    </main>
  )
}

export default WalletPage