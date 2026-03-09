"use client";

import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import {
	resetPasswordSchema,
	TResetPasswordSchema,
} from "../schema/auth.schema";
import { TUserDTO } from "@/entities/user/api/user.dto";
import { authService } from "../api/auth.service";
import { authMapper } from "../lib/auth-mapper.lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { USER_KEYS } from "@/entities/user/api/user.key";

export const useResetPassword = () => {
	const router = useRouter();

	const { mutate, isPending } = useApiMutation<TUserDTO, TResetPasswordSchema>({
		mutationFn: data =>
			authService.resetPassword(authMapper.toResetPasswordDto(data)),
		successMsg: "Password reset successfully",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: false,
		onSuccess: () => {
			router.push("/login");
		},
	});

	const ResetPasswordForm = useForm<TResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: "",
			newPassword: "",
			token: "",
		},
	});

	const onResetPassword = (values: TResetPasswordSchema) => {
		mutate(values);
	};

	return {
		ResetPasswordForm,
		onResetPassword,
		isResetPasswordPending: isPending,
	};
};
