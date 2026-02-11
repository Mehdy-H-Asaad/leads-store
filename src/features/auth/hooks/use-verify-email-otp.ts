"use client";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { TUserDTO } from "@/features/user/schema/user.schema";
import { TVerifyOTPDTO, VerifyOTPSchema } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AUTH_KEYS } from "../constants/auth.keys";
import { useUserStore } from "@/features/user/store/user.store";
import { useRouter } from "next/navigation";

export const useVerifyEmailOTP = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const { mutate, isPending } = useApiMutation<TUserDTO, TVerifyOTPDTO>({
    endpointURL: "/auth/verify-email",
    method: "post",
    invalidatedKeys: [AUTH_KEYS.USER],
    invalidateExact: true,
    successMsg: "Email verified successfully",
    onSuccess: () => {
      router.push("/");
    },
  });

  const verifyEmailOTPForm = useForm<TVerifyOTPDTO>({
    resolver: zodResolver(VerifyOTPSchema),
    defaultValues: {
      email: user?.email ?? "",
      otp: "",
    },
  });

  const onVerifyEmailOTP = (values: TVerifyOTPDTO) => {
    mutate(values);
  };

  return {
    verifyEmailOTPForm,
    onVerifyEmailOTP,
    isVerifyEmailOTPPending: isPending,
  };
};
