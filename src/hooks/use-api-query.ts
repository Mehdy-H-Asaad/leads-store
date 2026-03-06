"use client";
import {
	useQuery,
	QueryKey,
	QueryFunction,
	UseQueryOptions,
} from "@tanstack/react-query";
import { TServerResponse } from "@/lib/fetcher";

type TUseApiQueryProps<TData = unknown> = {
	queryKey: QueryKey;
	queryFn: QueryFunction<TServerResponse<TData>>;
	enabled?: boolean;
} & Omit<
	UseQueryOptions<TServerResponse<TData>, Error>,
	"queryKey" | "queryFn" | "enabled"
>;

export const useApiQuery = <TData = unknown>({
	queryKey,
	queryFn,
	enabled = true,
	...queryOptions
}: TUseApiQueryProps<TData>) => {
	const query = useQuery({
		queryKey,
		queryFn,
		enabled,
		...queryOptions,
	});

	return {
		...query,
	};
};
