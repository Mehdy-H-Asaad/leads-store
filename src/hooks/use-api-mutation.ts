"use client";
import { toast } from "sonner";
import {
	MutationKey,
	QueryKey,
	useMutation,
	useQueryClient,
	UseMutationOptions,
} from "@tanstack/react-query";
import { TServerResponse } from "@/lib/fetcher";

type TUseApiMutationProps<TData, TVariables> = {
	mutationKey?: MutationKey;
	successMsg?: string;
	invalidatedKeys?: QueryKey[];
	invalidateExact?: boolean;
	mutationFn: (variables: TVariables) => Promise<TServerResponse<TData>>;
} & Omit<
	UseMutationOptions<TServerResponse<TData>, Error, TVariables>,
	"mutationKey" | "mutationFn"
>;

export const useApiMutation = <TData = unknown, TVariables = void>({
	mutationKey,
	mutationFn,
	successMsg,
	invalidatedKeys = [],
	invalidateExact = false,
	...mutationOptions
}: TUseApiMutationProps<TData, TVariables>) => {
	const queryClient = useQueryClient();

	const mutation = useMutation<TServerResponse<TData>, Error, TVariables>({
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
			mutationOptions?.onSuccess?.(data, variables, context, mutation);
		},
		onError: (error, variables, context, mutation) => {
			toast.error(error.message);
			mutationOptions?.onError?.(error, variables, context, mutation);
		},
		...mutationOptions,
	});

	return { ...mutation };
};
