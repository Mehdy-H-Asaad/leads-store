"use client";

import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import {
	requestVerifyEmailSchema,
	TRequestVerifyEmailSchema,
} from "../schema/auth.schema";
import { authService } from "../api/auth.service";
import { authMapper } from "../lib/auth-mapper.lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRequestVerifyEmail = () => {
	const { mutate, isPending } = useApiMutation<
		{ message: string },
		TRequestVerifyEmailSchema
	>({
		mutationFn: data =>
			authService.requestVerifyEmail(authMapper.toRequestVerifyEmailDto(data)),
		successMsg: "Verification email sent",
	});

	const RequestVerifyEmailForm = useForm<TRequestVerifyEmailSchema>({
		resolver: zodResolver(requestVerifyEmailSchema),
		defaultValues: {
			email: "",
		},
	});

	const onRequestVerifyEmail = (values: TRequestVerifyEmailSchema) => {
		mutate(values);
	};

	return {
		RequestVerifyEmailForm,
		onRequestVerifyEmail,
		isRequestVerifyEmailPending: isPending,
	};
};
