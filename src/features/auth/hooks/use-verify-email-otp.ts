"use client";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { TVerifyOTPSchema, VerifyOTPSchema } from "../schema/auth.schema";
import { authService } from "../api/auth.service";
import { authMapper } from "../lib/auth.mapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/entities/user/model/user.store";
import { useRouter, useSearchParams } from "next/navigation";
import { USER_KEYS } from "@/entities/user/api/user.key";
import { TUser } from "@/entities/user/model/user.model";

export const useVerifyEmailOTP = () => {
	const { user } = useUserStore();
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = user?.email ?? searchParams.get("email") ?? "";
	const { mutate, isPending } = useApiMutation<TUser, TVerifyOTPSchema>({
		mutationFn: data =>
			authService.verifyEmailOTP(authMapper.toVerifyOtpDto(data)),
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: true,
		successMsg: "Email verified successfully",
		onSuccess: () => {
			router.push("/user-onboarding");
		},
	});

	const verifyEmailOTPForm = useForm<TVerifyOTPSchema>({
		resolver: zodResolver(VerifyOTPSchema),
		defaultValues: {
			email,
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
