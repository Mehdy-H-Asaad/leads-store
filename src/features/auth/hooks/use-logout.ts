"use client";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { authService } from "../api/auth.service";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/entities/user/model/user.store";
import { USER_KEYS } from "@/entities/user/api/user.key";

export const useLogout = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const clearUser = useUserStore(state => state.clearUser);

	const { mutate, isPending } = useApiMutation<void, void>({
		mutationFn: () => authService.logout(),
		successMsg: "Logged out successfully",
		invalidatedKeys: [USER_KEYS.ME()],
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
