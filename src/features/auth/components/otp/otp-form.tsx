"use client";

import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/shared/components/ui/card";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	InputOTPSeparator,
} from "@/shared/components/ui/input-otp";

import { Controller, UseFormReturn } from "react-hook-form";

import { useEffect, useState } from "react";
import { MainButton } from "@/shared/components/common/main-button";
import { TVerifyOTPDTO } from "../../schema/auth.schema";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";

type OTPFormProps = {
	form: UseFormReturn<TVerifyOTPDTO>;
	onSubmit: (values: TVerifyOTPDTO) => void;
	isPending: boolean;
};

export const OTPForm = ({ form, onSubmit, isPending }: OTPFormProps) => {
	const [timeLeft, setTimeLeft] = useState<number>(5 * 60);

	useEffect(() => {
		if (!timeLeft) return;

		const timer = setInterval(() => {
			setTimeLeft(prev => {
				if (prev <= 0) {
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft]);

	const handleResendOtp = () => {
		onSubmit({ email: form.getValues("email"), code: form.getValues("code") });
		setTimeLeft(5 * 60);
	};

	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${m}:${s} ${parseInt(m) > 0 ? "min" : "sec"}`;
	};

	return (
		<div className="flex flex-col gap-6 items-center justify-center w-full h-screen bg-muted">
			<Card className="w-full max-w-sm ">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">OTP Verification</CardTitle>
					<CardDescription>
						Enter the code sent to your email address
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-6">
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup className="grid place-content-center gap-6">
							<Controller
								control={form.control}
								name="code"
								render={({ field }) => (
									<Field>
										<FieldLabel htmlFor="code">OTP</FieldLabel>
										<InputOTP {...field} maxLength={6}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</Field>
								)}
							/>
							<MainButton
								isLoading={isPending}
								type="submit"
								disabled={isPending || form.formState.isSubmitting}
								loadingText="Verifying..."
							>
								Verify
							</MainButton>
						</FieldGroup>
					</form>

					<div className="text-sm">
						Didn&apos;t receive the code?{" "}
						<Button
							variant="link"
							className="p-0 underline font-semibold"
							onClick={handleResendOtp}
							disabled={isPending || timeLeft > 0}
						>
							{isPending ? "Resending..." : "Resend OTP"}
						</Button>
						{isPending || !timeLeft ? null : timeLeft > 0 ? (
							<p className="text-sm text-gray-500">
								OTP will expire in{" "}
								<span className="text-black">{formatTime(timeLeft)}</span>{" "}
							</p>
						) : timeLeft <= 0 ? (
							<p className="text-sm text-red-600 font-medium">OTP expired</p>
						) : null}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
