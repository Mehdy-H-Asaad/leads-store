"use client";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { LoginSchema, TLoginSchema } from "../schema/auth.schema";
import { TUserDTO } from "@/entities/user/api/user.dto";
import { authService } from "@/services/auth/auth.service";
import { authMapper } from "../lib/auth-mapper.lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/entities/user/model/user.store";
import { USER_KEYS } from "@/entities/user/api/user.key";

export const useLogin = () => {
	const router = useRouter();
	const { setUser } = useUserStore();
	const { mutate, isPending } = useApiMutation<TUserDTO, TLoginSchema>({
		mutationFn: data => authService.login(authMapper.toLoginDto(data)),
		successMsg: "Logged in successfully",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: false,
		onSuccess: data => {
			if (!data.data.isEmailVerified) {
				router.push("/verify-email");
			} else {
				// Refresh server components to fetch new user data
				// router.refresh();
				setUser(data.data);
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
