"use client";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { SignupSchema, TSignupSchema } from "../schema/auth.schema";
import { TUserDTO } from "@/entities/user/api/user.dto";
import { authService } from "@/services/auth/auth.service";
import { authMapper } from "../lib/auth-mapper.lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/entities/user/model/user.store";
import { USER_KEYS } from "@/entities/user/api/user.key";

export const useSignup = () => {
	const router = useRouter();
	const { setUser } = useUserStore();
	const { mutate, isPending } = useApiMutation<TUserDTO, TSignupSchema>({
		mutationFn: data => authService.signup(authMapper.toSignupDto(data)),
		successMsg: "Welcome to ZennHR! Please check your email for verification.",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: true,
		onSuccess: data => {
			setUser(data.data);
			router.push("/verify-email");
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
