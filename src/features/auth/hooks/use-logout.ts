"use client";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { TUserDTO } from "@/features/user/schema/user.schema";
import { AUTH_KEYS } from "../constants/auth.keys";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/features/user/store/user.store";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearUser = useUserStore((state) => state.clearUser);

  const { mutate, isPending } = useApiMutation<TUserDTO, void>({
    endpointURL: "/auth/logout",
    method: "post",
    showSuccessToast: true,
    successMsg: "Logged out successfully",
    invalidatedKeys: [AUTH_KEYS.USER, ["user", "me"]],
    invalidateExact: false,
    onSuccess: () => {
      // Clear all queries to ensure fresh state
      queryClient.clear();
      // Clear Zustand store
      clearUser();
      router.push("/login");
    },
  });

  const onLogout = () => {
    mutate();
  };

  return { onLogout, isLogoutPending: isPending };
};
