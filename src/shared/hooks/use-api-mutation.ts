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
	mutationFn: (variables: TVariables) => Promise<TApiResponse<TData> | void>;
} & Omit<
	UseMutationOptions<TApiResponse<TData> | void, Error, TVariables>,
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

	const mutation = useMutation<TApiResponse<TData> | void, Error, TVariables>({
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
			const detail = (error as ApiError).detail;
			let description: string | undefined;
			if (typeof detail === "string") {
				description = detail;
			} else if (Array.isArray(detail)) {
				description = detail
					.map(detail => {
						if (detail && typeof detail === "object" && "msg" in detail) {
							const loc = Array.isArray(detail.loc)
								? detail.loc.slice(1).join(".")
								: "";
							return loc ? `${loc}: ${detail.msg}` : String(detail.msg);
						}
						return String(detail);
					})
					.join(", ");
			}
			toast.error(error.message, { description });
			onError?.(error, variables, context, mutation);
		},
		...mutationOptions,
	});

	return { ...mutation };
};
