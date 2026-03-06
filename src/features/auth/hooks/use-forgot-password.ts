"use client";

import { useApiMutation } from "@/hooks/use-api-mutation";
import {
	ForgotPasswordSchema,
	TForgotPasswordSchema,
} from "../schema/auth.schema";
import { authService } from "@/services/auth/auth.service";
import { authMapper } from "../lib/auth-mapper.lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useForgotPassword = () => {
	const { mutate, isPending } = useApiMutation<
		{ message: string },
		TForgotPasswordSchema
	>({
		mutationFn: data => authService.forgotPassword(authMapper.toForgotPasswordDto(data)),
		successMsg: "Password reset link sent to your email",
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
