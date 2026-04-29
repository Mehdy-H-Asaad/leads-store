"use client";

import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { USER_KEYS } from "@/entities/user/api/user.key";
import {
	TVerifyEmailChangeSchema,
	verifyEmailChangeSchema,
} from "../schema/user-settings.schema";
import { TUser } from "@/entities/user/model/user.model";
import { userService } from "@/entities/user/api/user.service";
import { userFormMapper } from "../lib/user-form.mapper";

export const useVerifyEmailChange = () => {
	const router = useRouter();

	const { mutate, isPending } = useApiMutation<TUser, TVerifyEmailChangeSchema>(
		{
			mutationFn: data =>
				userService.verifyEmailChange(
					userFormMapper.toVerifyEmailChangeDTO(data)
				),
			successMsg: "Email updated successfully",
			invalidatedKeys: [USER_KEYS.ME()],
			invalidateExact: false,
			onSuccess: () => {
				router.push("/dashboard");
			},
		}
	);

	const VerifyEmailChangeForm = useForm<TVerifyEmailChangeSchema>({
		resolver: zodResolver(verifyEmailChangeSchema),
		defaultValues: {
			token: "",
		},
	});

	const onVerifyEmailChange = (values: TVerifyEmailChangeSchema) => {
		mutate(values);
	};

	return {
		VerifyEmailChangeForm,
		onVerifyEmailChange,
		isVerifyEmailChangePending: isPending,
	};
};
