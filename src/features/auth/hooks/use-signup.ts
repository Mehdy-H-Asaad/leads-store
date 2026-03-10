"use client";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { SignupSchema, TSignupSchema } from "../schema/auth.schema";
import { authService } from "../api/auth.service";
import { authMapper } from "../lib/auth.mapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/entities/user/model/user.store";
import { USER_KEYS } from "@/entities/user/api/user.key";
import { TUser } from "@/entities/user/model/user.model";

export const useSignup = () => {
	const router = useRouter();
	const { setUser } = useUserStore();
	const { mutate, isPending } = useApiMutation<TUser, TSignupSchema>({
		mutationFn: data => authService.signup(authMapper.toSignupDto(data)),
		successMsg: "Welcome to ZennHR! Please check your email for verification.",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: true,
		onSuccess: data => {
			setUser(data.data);
			router.push(`/verify-email?email=${encodeURIComponent(data.data.email)}`);
		},
	});

	const SignupForm = useForm<TSignupSchema>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSignup = (values: TSignupSchema) => {
		mutate(values);
	};

	return { SignupForm, onSignup, isRegistering: isPending };
};
