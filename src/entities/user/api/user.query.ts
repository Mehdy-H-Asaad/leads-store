import { useEffect } from "react";
import { useUserStore } from "../model/user.store";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { USER_KEYS } from "./user.key";
import { userService } from "./user.service";
import { TUser } from "../model/user.model";
import { TApiResponse } from "@/shared/lib/fetcher";

export const useGetMe = ({ enabled }: { enabled: boolean }) => {
	const { setUser, clearUser, setStatus } = useUserStore();

	const { data, isLoading, isError, error } = useApiQuery<
		TApiResponse<TUser | null>
	>({
		queryKey: USER_KEYS.ME(),
		queryFn: () => userService.getMe(),
		retry: false,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled,
	});

	useEffect(() => {
		if (isLoading) {
			setStatus("loading");
		} else if (data) {
			setUser(data.data);
			setStatus("authenticated");
		} else if (isError) {
			clearUser();
			setStatus("unauthenticated");
		}
	}, [data, isLoading, isError, setUser, clearUser, setStatus]);

	return {
		user: data?.data ? data.data : undefined,
		isGettingCurrentUser: isLoading,
		isError,
		error,
	};
};
