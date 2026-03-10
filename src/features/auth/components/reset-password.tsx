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
import { useResetPassword } from "../hooks/use-reset-password";
import { useState } from "react";
import { EyeOff } from "lucide-react";
import { Controller } from "react-hook-form";

export const ResetPasswordForm = () => {
	const { ResetPasswordForm, onResetPassword, isResetPasswordPending } =
		useResetPassword();

	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="flex flex-col gap-6 items-center justify-center w-full h-screen">
			<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 w-full">
				<div className="flex w-full max-w-sm flex-col gap-6">
					<div className={cn("flex flex-col gap-6")}>
						<Card className="w-full">
							<CardHeader className="text-center">
								<CardTitle className="text-xl">Reset Password</CardTitle>
								<CardDescription>Enter your new password.</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-6">
								<form
									onSubmit={ResetPasswordForm.handleSubmit(onResetPassword)}
									className="space-y-4"
								>
									<Controller
										control={ResetPasswordForm.control}
										name="newPassword"
										render={({ field }) => (
											<Field>
												<FieldLabel htmlFor="newPassword">
													New Password
												</FieldLabel>
												<div className="relative">
													<Input
														{...field}
														placeholder="New Password"
														type={showPassword ? "text" : "password"}
													/>
													<EyeOff
														className="absolute right-2 top-1/2 -translate-y-1/2"
														onClick={() => setShowPassword(!showPassword)}
														size={16}
													/>
												</div>
											</Field>
										)}
									/>

									<MainButton
										type="submit"
										className="w-full"
										isLoading={isResetPasswordPending}
										disabled={
											isResetPasswordPending ||
											!ResetPasswordForm.formState.isValid
										}
										loadingText="Resetting Password..."
									>
										Reset Password
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
