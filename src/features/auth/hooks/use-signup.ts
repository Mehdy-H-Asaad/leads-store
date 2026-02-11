"use client";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { SignupSchema, TSignupDTO } from "../schema/auth.schema";
import { TUserDTO } from "@/features/user/schema/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AUTH_KEYS } from "../constants/auth.keys";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/features/user/store/user.store";

export const useSignup = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { mutate, isPending } = useApiMutation<TUserDTO, TSignupDTO>({
    endpointURL: "/auth/register",
    method: "post",
    showSuccessToast: true,
    successMsg: "Welcome to ZennHR! Please check your email for verification.",
    invalidatedKeys: [AUTH_KEYS.USER],
    invalidateExact: true,
    onSuccess: (data) => {
      setUser(data.data);
      router.push("/verify-email");
    },
  });

  const SignupForm = useForm<TSignupDTO>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: undefined,
    },
  });

  const onSignup = (values: TSignupDTO) => {
    mutate(values);
  };

  return { SignupForm, onSignup, isRegistering: isPending };
};
