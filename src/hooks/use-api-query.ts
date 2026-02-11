"use client";
import { UseQueryOptions, useQuery, QueryKey } from "@tanstack/react-query";
import { TServerResponse } from "@/types/types";
import { fetcher } from "../utils/fetcher";

type TUseApiQueryOptions<TResponse> = {
  queryKey: QueryKey;
  requestURL: string;
  options?: RequestInit;
  enabled?: boolean;
} & Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">;

export const useApiQuery = <TResponse>({
  queryKey,
  requestURL,
  options,
  enabled = true,
  ...queryOptions
}: TUseApiQueryOptions<TServerResponse<TResponse>>) => {
  const query = useQuery<TServerResponse<TResponse>>({
    queryKey,
    queryFn: ({ signal }) =>
      fetcher<TResponse>({
        endpointURL: requestURL,
        options: {
          ...options,
          signal: signal as AbortSignal,
          headers: options?.headers as Record<string, string>,
        },
      }),

    enabled,
    ...queryOptions,
  });

  return {
    ...query,
    meta: query.data?.meta,
  };
};
