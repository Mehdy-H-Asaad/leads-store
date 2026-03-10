import { Suspense } from "react";
import { VerifyEmailOTP } from '@/features/auth/components/otp/verify-email-otp';

const page = () => {
    return (
        <Suspense>
            <VerifyEmailOTP />
        </Suspense>
    )
}

export default page