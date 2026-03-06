"use client";

import { useApiMutation } from "@/hooks/use-api-mutation";
import {
	requestEmailChangeSchema,
	TRequestEmailChangeSchema,
} from "../schema/auth.schema";
import { authService } from "@/services/auth/auth.service";
import { authMapper } from "../lib/auth-mapper.lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRequestEmailChange = () => {
	const { mutate, isPending } = useApiMutation<
		{ message: string },
		TRequestEmailChangeSchema
	>({
		mutationFn: data => authService.requestEmailChange(authMapper.toRequestEmailChangeDto(data)),
		successMsg: "Verification link sent to your new email",
	});

	const RequestEmailChangeForm = useForm<TRequestEmailChangeSchema>({
		resolver: zodResolver(requestEmailChangeSchema),
		defaultValues: {
			newEmail: "",
			password: "",
		},
	});

	const onRequestEmailChange = (values: TRequestEmailChangeSchema) => {
		mutate(values);
	};

	return {
		RequestEmailChangeForm,
		onRequestEmailChange,
		isRequestEmailChangePending: isPending,
	};
};
