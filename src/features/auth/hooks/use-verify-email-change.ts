"use client";

import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import {
	TVerifyEmailChangeSchema,
	verifyEmailChangeSchema,
} from "../schema/auth.schema";
import { TUserDTO } from "@/entities/user/api/user.dto";
import { authService } from "../api/auth.service";
import { authMapper } from "../lib/auth.mapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { USER_KEYS } from "@/entities/user/api/user.key";

export const useVerifyEmailChange = () => {
	const router = useRouter();

	const { mutate, isPending } = useApiMutation<
		TUserDTO,
		TVerifyEmailChangeSchema
	>({
		mutationFn: data =>
			authService.verifyEmailChange(authMapper.toVerifyEmailChangeDto(data)),
		successMsg: "Email updated successfully",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: false,
		onSuccess: () => {
			router.push("/");
		},
	});

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
