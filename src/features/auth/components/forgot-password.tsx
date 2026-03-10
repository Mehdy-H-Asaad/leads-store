"use client";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/shared/components/ui/card";
import { Field, FieldLabel } from "@/shared/components/ui/field";

import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { MainButton } from "@/shared/components/common/main-button";
import { useForgotPassword } from "../hooks/use-forgot-password";
import { Controller } from "react-hook-form";

export const ForgotPasswordForm = () => {
	const { ForgotPasswordForm, onForgotPassword, isForgotPasswordPending } =
		useForgotPassword();

	return (
		<div className="flex flex-col gap-6 items-center justify-center w-full h-screen bg-muted">
			<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 w-full">
				<div className="flex w-full max-w-sm flex-col gap-6">
					<div className={cn("flex flex-col gap-6")}>
						<Card className="w-full">
							<CardHeader className="text-center">
								<CardTitle className="text-xl">Forgot Password</CardTitle>
								<CardDescription>
									Enter your email address to reset your password.
								</CardDescription>
							</CardHeader>

							<CardContent className="grid gap-6">
								<form
									onSubmit={ForgotPasswordForm.handleSubmit(onForgotPassword)}
									className="space-y-4"
								>
									<Controller
										control={ForgotPasswordForm.control}
										name="email"
										render={({ field }) => (
											<Field>
												<FieldLabel htmlFor="email">Email</FieldLabel>
												<Input {...field} placeholder="Email" />
											</Field>
										)}
									/>

									<MainButton
										type="submit"
										className="w-full"
										isLoading={isForgotPasswordPending}
										disabled={
											isForgotPasswordPending ||
											!ForgotPasswordForm.formState.isValid
										}
										loadingText="Sending OTP..."
									>
										Send OTP
									</MainButton>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};
