"use client";
import {
	useQuery,
	QueryKey,
	QueryFunction,
	UseQueryOptions,
} from "@tanstack/react-query";
import { TPaginatedApiResponse } from "@/shared/lib/fetcher";

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

type TUseApiPaginatedQueryProps<TItem> = {
	queryKey: QueryKey;
	queryFn: QueryFunction<TPaginatedApiResponse<TItem>>;
	enabled?: boolean;
} & Omit<
	UseQueryOptions<TPaginatedApiResponse<TItem>, Error>,
	"queryKey" | "queryFn" | "enabled"
>;

export const useApiPaginatedQuery = <TItem>({
	queryKey,
	queryFn,
	enabled = true,
	...queryOptions
}: TUseApiPaginatedQueryProps<TItem>) => {
	const { data, ...rest } = useQuery({
		queryKey,
		queryFn,
		enabled,
		...queryOptions,
	});

	return {
		data: data?.data ?? [],
		totalRows: data?.total_rows ?? 0,
		totalPages: data?.total_pages ?? 0,
		page: data?.page ?? 1,
		limit: data?.limit ?? 10,
		...rest,
	};
};
