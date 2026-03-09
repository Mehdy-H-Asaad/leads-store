"use client";
import { toast } from "sonner";
import {
	MutationKey,
	QueryKey,
	useMutation,
	useQueryClient,
	UseMutationOptions,
} from "@tanstack/react-query";
import { TApiResponse } from "@/shared/lib/fetcher";

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
	onSuccess: callerOnSuccess,
	onError: callerOnError,
	...mutationOptions
}: TUseApiMutationProps<TData, TVariables>) => {
	const queryClient = useQueryClient();

	const mutation = useMutation<TApiResponse<TData>, Error, TVariables>({
		mutationKey,
		mutationFn,
		onSuccess: (data, variables, context) => {
			if (successMsg) {
				toast.success(successMsg);
			}
			for (const key of invalidatedKeys) {
				queryClient.invalidateQueries({
					queryKey: key,
					exact: invalidateExact,
				});
			}
			callerOnSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			toast.error(error.message);
			callerOnError?.(error, variables, context);
		},
		...mutationOptions,
	});

	return { ...mutation };
};
