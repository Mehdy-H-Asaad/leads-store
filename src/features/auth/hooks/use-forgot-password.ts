"use client";

import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import {
	ForgotPasswordSchema,
	TForgotPasswordSchema,
} from "../schema/auth.schema";
import { authService } from "../api/auth.service";
import { authMapper } from "../lib/auth.mapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export const useForgotPassword = () => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<
		{ message: string },
		TForgotPasswordSchema
	>({
		mutationFn: data =>
			authService.forgotPassword(authMapper.toForgotPasswordDto(data)),
		successMsg: "Password reset link sent to your email",
		onSuccess: () => {
			router.push("/reset-password");
		},
	});

	const ForgotPasswordForm = useForm<TForgotPasswordSchema>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onForgotPassword = (values: TForgotPasswordSchema) => {
		mutate(values);
	};

	return {
		ForgotPasswordForm,
		onForgotPassword,
		isForgotPasswordPending: isPending,
	};
};
