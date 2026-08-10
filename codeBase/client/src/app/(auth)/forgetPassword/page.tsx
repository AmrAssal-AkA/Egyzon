import React from 'react'

import ForgetPasswordForm from '@/components/auth/Forms/forgetPasswordForm'

function ForgetPassword() {
  return (
    <main className="max-w-md mx-auto space-y-2">
        <div className="text-center sm:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Forget Password
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Enter your email address to receive a password reset link.
            </p>
        </div>
        <ForgetPasswordForm />
    </main>
  )
}

export default ForgetPassword