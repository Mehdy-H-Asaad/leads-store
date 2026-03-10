"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { authService } from "../api/auth.service";
import { authMapper } from "../lib/auth.mapper";
import { TVerifyEmailChangeSchema } from "../schema/auth.schema";
import { TUserDTO } from "@/entities/user/api/user.dto";
import { USER_KEYS } from "@/entities/user/api/user.key";
import { Button } from "@/shared/components/ui/button";

export const ConfirmEmailChange = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get("token");

	const { mutate, isPending, isSuccess, isError, error } = useApiMutation<
		TUserDTO,
		TVerifyEmailChangeSchema
	>({
		mutationFn: data =>
			authService.verifyEmailChange(authMapper.toVerifyEmailChangeDto(data)),
		successMsg: "Email updated successfully",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: false,
		onSuccess: () => {
			setTimeout(() => router.push("/"), 2000);
		},
	});

	useEffect(() => {
		if (token) {
			mutate({ token });
		}
	}, [token, mutate]);

	if (!token) {
		return (
			<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
				<div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
					<div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
						<XCircle className="size-8 text-destructive" />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-xl font-semibold">Invalid Link</h1>
						<p className="text-sm text-muted-foreground">
							This verification link is invalid or missing. Please request a new
							email change from your settings.
						</p>
					</div>
					<Button onClick={() => router.push("/settings")}>
						Go to Settings
					</Button>
				</div>
			</div>
		);
	}

	if (isPending) {
		return (
			<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
				<div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
					<div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
						<Loader2 className="size-8 text-primary animate-spin" />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-xl font-semibold">Verifying your email...</h1>
						<p className="text-sm text-muted-foreground">
							Please wait while we confirm your new email address.
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
				<div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
					<div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
						<XCircle className="size-8 text-destructive" />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-xl font-semibold">Verification Failed</h1>
						<p className="text-sm text-muted-foreground">
							{error?.message ??
								"The link may have expired or already been used. Please request a new email change."}
						</p>
					</div>
					<Button onClick={() => router.push("/settings")}>
						Go to Settings
					</Button>
				</div>
			</div>
		);
	}

	if (isSuccess) {
		return (
			<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
				<div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
					<div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
						<CheckCircle2 className="size-8 text-primary" />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-xl font-semibold">Email Updated!</h1>
						<p className="text-sm text-muted-foreground">
							Your email has been updated successfully. Redirecting you to the
							dashboard...
						</p>
					</div>
				</div>
			</div>
		);
	}

	return null;
};
