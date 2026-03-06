import { useEffect } from "react";
import { useUserStore } from "../model/user.store";
import { useApiQuery } from "@/hooks/use-api-query";
import { TUserDTO } from "./user.dto";
import { USER_KEYS } from "./user.key";
import { userService } from "./user.service";

export const useGetMe = ({ enabled }: { enabled: boolean }) => {
	const { setUser, clearUser, setStatus } = useUserStore();

	const { data, isLoading, isError, error } = useApiQuery<TUserDTO>({
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
		user: data?.data,
		isGettingCurrentUser: isLoading,
		isError,
		error,
	};
};
