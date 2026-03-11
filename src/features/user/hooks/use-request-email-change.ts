"use client";

import { useApiMutation } from "@/shared/hooks/use-api-mutation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TRequestEmailChangeSchema,
	requestEmailChangeSchema,
} from "../schema/user-settings.schema";
import { userService } from "@/entities/user/api/user.service";
import { userFormMapper } from "../lib/user-form.mapper";
import { USER_KEYS } from "@/entities/user/api/user.key";
export const useRequestEmailChange = () => {
	const { mutate, isPending, isSuccess } = useApiMutation<
		void,
		TRequestEmailChangeSchema
	>({
		mutationFn: data =>
			userService.requestEmailChange(
				userFormMapper.toRequestEmailChangeDTO(data)
			),
		successMsg: "Verification link sent to your new email",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: true,
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
		isRequestEmailChangeSuccess: isSuccess,
	};
};
