"use client";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { TUserDTO } from "@/entities/user/api/user.dto";
import { TVerifyOTPSchema, VerifyOTPSchema } from "../schema/auth.schema";
import { authService } from "@/services/auth/auth.service";
import { authMapper } from "../lib/auth-mapper.lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/entities/user/model/user.store";
import { useRouter } from "next/navigation";
import { USER_KEYS } from "@/entities/user/api/user.key";

export const useVerifyEmailOTP = () => {
	const { user } = useUserStore();
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<TUserDTO, TVerifyOTPSchema>({
		mutationFn: data => authService.verifyEmailOTP(authMapper.toVerifyOtpDto(data)),
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: true,
		successMsg: "Email verified successfully",
		onSuccess: () => {
			router.push("/");
		},
	});

	const verifyEmailOTPForm = useForm<TVerifyOTPSchema>({
		resolver: zodResolver(VerifyOTPSchema),
		defaultValues: {
			email: user?.email ?? "",
			code: "",
		},
	});

	const onVerifyEmailOTP = (values: TVerifyOTPSchema) => {
		mutate(values);
	};

	return {
		verifyEmailOTPForm,
		onVerifyEmailOTP,
		isVerifyEmailOTPPending: isPending,
	};
};
