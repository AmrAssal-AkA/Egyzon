import React, { Suspense } from 'react'

import {Spinner} from '@/components/ui/spinner'
import ResetPasswordForm from '@/components/auth/Forms/resetPasswordForm'

function ResetPasswordPage() {
  return (
    <Suspense fallback={<Spinner className="h-5 w-5" />}>
        <ResetPasswordForm />
    </Suspense>
  )
}

export default ResetPasswordPage