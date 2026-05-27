import ForgetPasswordForm from '@/components/authForms/forgetpassword-form'
import React from 'react'

function ForgetPasswordPage() {
  return (
    <div className="min-h-screen ">
        <div className="w-full max-w-md">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-8">
                    Forgot Password?
                </h1>
              <ForgetPasswordForm />
            </div>
        </div>
    </div>
  )
}

export default ForgetPasswordPage