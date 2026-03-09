"use client";
import {
	useQuery,
	QueryKey,
	QueryFunction,
	UseQueryOptions,
} from "@tanstack/react-query";

type TUseApiQueryProps<TData = unknown> = {
	queryKey: QueryKey;
	queryFn: QueryFunction<TData>;
	enabled?: boolean;
} & Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn" | "enabled">;

export const useApiQuery = <TData = unknown>({
	queryKey,
	queryFn,
	enabled = true,
	...queryOptions
}: TUseApiQueryProps<TData>) => {
	return useQuery({
		queryKey,
		queryFn,
		enabled,
		...queryOptions,
	});
};
