"use client";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { LoginSchema, TLoginDTO } from "../schema/auth.schema";
import { TUserDTO } from "@/features/user/schema/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AUTH_KEYS } from "../constants/auth.keys";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/features/user/store/user.store";

export const useLogin = () => {
	const router = useRouter();
	const { setUser } = useUserStore();
	const { mutate, isPending } = useApiMutation<TUserDTO, TLoginDTO>({
		endpointURL: "/auth/login",
		method: "post",
		showSuccessToast: true,
		successMsg: "Logged in successfully",
		invalidatedKeys: [AUTH_KEYS.USER, ["user", "me"]],
		invalidateExact: false,
		onSuccess: data => {
			if (!data.data.verified) {
				router.push("/verify-email");
			} else {
				// Refresh server components to fetch new user data
				// router.refresh();
				setUser(data.data);
				router.push("/");
			}
		},
	});

	const LoginForm = useForm<TLoginDTO>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onLogin = (values: TLoginDTO) => {
		mutate(values);
	};

	return { LoginForm, onLogin, isLoginPending: isPending };
};
