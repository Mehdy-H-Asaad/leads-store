"use client";
import { useVerifyEmailOTP } from '../../hooks/use-verify-email-otp';
import { OTPForm } from './otp-form';

export const VerifyEmailOTP = () => {
    const { verifyEmailOTPForm, onVerifyEmailOTP, isVerifyEmailOTPPending } = useVerifyEmailOTP();
    return (
        <OTPForm form={verifyEmailOTPForm} onSubmit={onVerifyEmailOTP} isPending={isVerifyEmailOTPPending} />
    )
}
