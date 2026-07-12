import React from 'react'
import Link from 'next/link'

import Notfoundicon from '@/components/ui/404'

function notfound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Notfoundicon />
        <h1 className="mt-6 text-4xl font-bold">404 - Page Not Found</h1>

        <div className="mt-10 text-lg text-muted-foreground">
        <p className="mt-3 text-2xl">
          Oops! The page you are looking for does not exist.
        </p>
        <div className="mt-6">
          <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-950 rounded-md hover:bg-blue-700">
            <Link href="/">Go Back Home</Link>
          </button>
        </div>
        </div>
      </div>

    </main>
  )
}

export default notfound
