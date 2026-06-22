import PartnerRegisterForm from '@/components/partner/PartnerRegisterForm'
import React from 'react'

function RegisterFormPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="w-full max-w-4xl px-4 shadow-2xl shadow-amber-500 dark:shadow-amber-500/50 rounded-lg bg-white dark:bg-gray-800">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-5 mt-5">Partner Registration</h1>

            <PartnerRegisterForm />
        </div>
    </main>
  )
}

export default RegisterFormPage