import { userService } from "@/entities/user/api/user.service";
import { USER_KEYS } from "@/entities/user/api/user.key";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { useRouter } from "next/navigation";

export const useDeleteAccount = () => {
	const router = useRouter();
	const { mutate, isPending, isSuccess } = useApiMutation<void, void>({
		mutationFn: () => userService.deleteAccount(),
		successMsg: "Account deleted successfully",
		invalidatedKeys: [USER_KEYS.ME()],
		invalidateExact: true,
		onSuccess: () => {
			router.push("/login");
		},
	});

	const onDeleteAccount = () => {
		mutate();
	};

	return {
		onDeleteAccount,
		isDeleteAccountPending: isPending,
		isDeleteAccountSuccess: isSuccess,
	};
};
