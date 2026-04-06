"use client";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { LoginSchema, TLoginSchema } from "../schema/auth.schema";
import { TUser } from "@/entities/user/model/user.model";
import { authService } from "../api/auth.service";
import { authMapper } from "../lib/auth.mapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
// import { useUserStore } from "@/entities/user/model/user.store";
import { USER_KEYS } from "@/entities/user/api/user.key";
import { USER_STEP } from "@/shared/contracts/user/user.contract";

export const useLogin = () => {
	const router = useRouter();
	// const { setUser } = useUserStore();
	const { mutate, isPending } = useApiMutation<TUser, TLoginSchema>({
		mutationFn: data => authService.login(authMapper.toLoginDto(data)),
		successMsg: "Logged in successfully",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: false,
		onSuccess: data => {
			if (!data) return;
			if (!data.data.isEmailVerified) {
				router.push(
					`/verify-email?email=${encodeURIComponent(data.data.email)}`
				);
			} else if (data.data.step === USER_STEP.ONE) {
				router.push("/user-onboarding");
			} else {
				// Refresh server components to fetch new user data
				// router.refresh();
				// setUser(data.data);
				router.push("/");
			}
		},
	});

	const LoginForm = useForm<TLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onLogin = (values: TLoginSchema) => {
		mutate(values);
	};

	return { LoginForm, onLogin, isLoginPending: isPending };
};
