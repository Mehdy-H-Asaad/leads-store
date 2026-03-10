"use client";
import { toast } from "sonner";
import {
	MutationKey,
	QueryKey,
	useMutation,
	useQueryClient,
	UseMutationOptions,
} from "@tanstack/react-query";
import { ApiError, TApiResponse } from "@/shared/lib/fetcher";

type TUseApiMutationProps<TData, TVariables> = {
	mutationKey?: MutationKey;
	successMsg?: string;
	invalidatedKeys?: QueryKey[];
	invalidateExact?: boolean;
	mutationFn: (variables: TVariables) => Promise<TApiResponse<TData>>;
} & Omit<
	UseMutationOptions<TApiResponse<TData>, Error, TVariables>,
	"mutationKey" | "mutationFn"
>;

export const useApiMutation = <TData = unknown, TVariables = void>({
	mutationKey,
	mutationFn,
	successMsg,
	invalidatedKeys = [],
	invalidateExact = false,
	onSuccess,
	onError,
	...mutationOptions
}: TUseApiMutationProps<TData, TVariables>) => {
	const queryClient = useQueryClient();

	const mutation = useMutation<TApiResponse<TData>, Error, TVariables>({
		mutationKey,
		mutationFn,
		onSuccess: (data, variables, context, mutation) => {
			if (successMsg) {
				toast.success(successMsg);
			}
			for (const key of invalidatedKeys) {
				queryClient.invalidateQueries({
					queryKey: key,
					exact: invalidateExact,
				});
			}
			onSuccess?.(data, variables, context, mutation);
		},
		onError: (error, variables, context, mutation) => {
			toast.error(error.message, {
				description: (error as ApiError).detail as string,
			});
			onError?.(error, variables, context, mutation);
		},
		...mutationOptions,
	});

	return { ...mutation };
};
