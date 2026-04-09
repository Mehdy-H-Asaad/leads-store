"use client";
import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Lock, Eye, EyeOff, Mail } from "lucide-react";
import Link from "next/link";
import { useSignup } from "../hooks/use-signup";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/shared/components/ui/field";
import { Controller } from "react-hook-form";
import { MainButton } from "@/shared/components/common/main-button";
import { AuthSplitLayout } from "./auth-split-layout";

export const SignupForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { SignupForm, onSignup, isRegistering } = useSignup();

	return (
		<AuthSplitLayout variant="signup">
			<div className="mb-4 text-center">
				<h1 className="text-3xl font-bold tracking-tight text-foreground">
					Create your account
				</h1>
				<p className="mt-1.5 text-sm text-muted-foreground">
					Join the community and get started for free.
				</p>
			</div>

			<div className="rounded-xl border bg-card p-8 shadow-sm">
				<form onSubmit={SignupForm.handleSubmit(onSignup)}>
					<FieldGroup className="gap-4">
						<Controller
							control={SignupForm.control}
							name="email"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="email">Email</FieldLabel>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
										<Input
											placeholder="Email"
											{...field}
											className="pl-10 pr-10"
											minLength={8}
										/>
									</div>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							control={SignupForm.control}
							name="password"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Password"
											{...field}
											className="pl-10 pr-10"
											minLength={8}
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
										>
											{showPassword ? (
												<EyeOff className="size-5" />
											) : (
												<Eye className="size-5" />
											)}
										</button>
									</div>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							control={SignupForm.control}
							name="confirmPassword"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="confirmPassword">
										Confirm Password
									</FieldLabel>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Confirm Password"
											{...field}
											className="pl-10 pr-10"
											minLength={8}
										/>
									</div>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<div className="space-y-4">
							<MainButton
								type="submit"
								disabled={isRegistering}
								className="w-full bg-neutral-900 hover:bg-neutral-800 text-white border-0"
								isLoading={isRegistering}
								loadingText="Creating account..."
							>
								Create account
							</MainButton>
							<div className="text-sm text-muted-foreground text-center">
								By signing up, you agree to our{" "}
								<Link
									href="/terms"
									className="text-main-green hover:text-[#166534] hover:underline"
								>
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href="/privacy"
									className="text-main-green hover:text-[#166534] hover:underline"
								>
									Privacy Policy
								</Link>
							</div>
						</div>
					</FieldGroup>
				</form>

				<div className="relative my-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-border"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-4 bg-card text-muted-foreground">
							or continue with
						</span>
					</div>
				</div>

				<div className="space-y-3">
					<Button variant="outline" className="w-full" type="button">
						<svg className="size-5 mr-2" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="currentColor"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="currentColor"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="currentColor"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Continue with Google
					</Button>
				</div>
			</div>
		</AuthSplitLayout>
	);
};
