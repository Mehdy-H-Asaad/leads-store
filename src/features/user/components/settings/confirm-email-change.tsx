"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { USER_KEYS } from "@/entities/user/api/user.key";
import { Button } from "@/shared/components/ui/button";
import { TUser } from "@/entities/user/model/user.model";
import { userService } from "@/entities/user/api/user.service";
import { userFormMapper } from "../../lib/user-form.mapper";
import { TVerifyEmailChangeSchema } from "../../schema/user-settings.schema";

export const ConfirmEmailChange = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get("token");

	const { mutate, isPending, isSuccess, isError, error } = useApiMutation<
		TUser,
		TVerifyEmailChangeSchema
	>({
		mutationFn: data =>
			userService.verifyEmailChange(
				userFormMapper.toVerifyEmailChangeDTO(data)
			),
		successMsg: "Email updated successfully",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: false,
		onSuccess: () => {
			setTimeout(() => router.push("/dashboard"), 2000);
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
					{/* <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10"> */}
					<XCircle className="size-8 text-destructive" />
					{/* </div> */}
					<div className="flex flex-col gap-2">
						<h1 className="text-xl font-semibold">Invalid Link</h1>
						<p className="text-sm text-muted-foreground">
							This verification link is invalid or missing. Please request a new
							email change from your settings.
						</p>
					</div>
					<Button onClick={() => router.push("/dashboard/settings")}>
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
					<Loader2 className="size-4  animate-spin" />
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
					<XCircle className="size-8 text-destructive" />
					<div className="flex flex-col gap-2">
						<h1 className="text-xl font-semibold">Verification Failed</h1>
						<p className="text-sm text-muted-foreground">
							{error?.message ??
								"The link may have expired or already been used. Please request a new email change."}
						</p>
					</div>
					<Button onClick={() => router.push("/dashboard/settings")}>
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
					<CheckCircle2 className="size-8 text-green-500" />
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
