"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import { MainButton } from "@/shared/components/common/main-button";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { authService } from "@/features/auth/api/auth.service";
import { authMapper } from "@/features/auth/lib/auth.mapper";
import {
	requestEmailChangeSchema,
	TRequestEmailChangeSchema,
} from "@/features/auth/schema/auth.schema";

export const ChangeEmailDialog = () => {
	const [open, setOpen] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	const form = useForm<TRequestEmailChangeSchema>({
		resolver: zodResolver(requestEmailChangeSchema),
		defaultValues: { newEmail: "", password: "" },
	});

	const { mutate, isPending } = useApiMutation<
		{ message: string },
		TRequestEmailChangeSchema
	>({
		mutationFn: data =>
			authService.requestEmailChange(authMapper.toRequestEmailChangeDto(data)),
		onSuccess: () => setEmailSent(true),
	});

	const onSubmit = form.handleSubmit(values => mutate(values));

	const handleOpenChange = (value: boolean) => {
		setOpen(value);
		if (!value) {
			setTimeout(() => {
				setEmailSent(false);
				form.reset();
			}, 300);
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline">Change Email</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				{emailSent ? (
					<div className="flex flex-col items-center gap-4 py-6 text-center">
						<div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
							<CheckCircle2 className="size-7 text-primary" />
						</div>
						<div className="flex flex-col gap-1">
							<h3 className="text-lg font-semibold">Check your email</h3>
							<p className="text-sm text-muted-foreground">
								We sent a verification link to your new email address. Click the
								link in the email to confirm the change.
							</p>
						</div>
						<Button
							variant="outline"
							className="mt-2"
							onClick={() => handleOpenChange(false)}
						>
							Close
						</Button>
					</div>
				) : (
					<>
						<DialogHeader>
							<DialogTitle>Change Email</DialogTitle>
							<DialogDescription>
								Enter your new email address and current password to request an
								email change.
							</DialogDescription>
						</DialogHeader>

						<form onSubmit={onSubmit} className="flex flex-col gap-4">
							<Controller
								control={form.control}
								name="newEmail"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel htmlFor="newEmail">
											New Email Address
										</FieldLabel>
										<Input
											id="newEmail"
											type="email"
											placeholder="new@example.com"
											{...field}
											aria-invalid={!!fieldState.error}
										/>
										{fieldState.error && (
											<p className="text-sm text-destructive">
												{fieldState.error.message}
											</p>
										)}
									</Field>
								)}
							/>

							<Controller
								control={form.control}
								name="password"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel htmlFor="currentPassword">
											Current Password
										</FieldLabel>
										<Input
											id="currentPassword"
											type="password"
											placeholder="••••••••"
											{...field}
											aria-invalid={!!fieldState.error}
										/>
										{fieldState.error && (
											<p className="text-sm text-destructive">
												{fieldState.error.message}
											</p>
										)}
									</Field>
								)}
							/>

							<DialogFooter className="mt-2" showCloseButton>
								<MainButton
									type="submit"
									isLoading={isPending}
									disabled={isPending}
									loadingText="Sending..."
								>
									Send Verification Link
								</MainButton>
							</DialogFooter>
						</form>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};
