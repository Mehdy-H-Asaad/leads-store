"use client";

import { useApiQuery } from "@/shared/hooks/use-api-query";
import { STORE_KEYS } from "./store.keys";
import { TStore } from "../model/store.model";
import { TApiResponse } from "@/shared/lib/fetcher";
import { storeService } from "./store.service";

export const useGetMyStore = () => {
	const { data, isLoading, error } = useApiQuery<TApiResponse<TStore>>({
		queryKey: STORE_KEYS.ME,
		queryFn: () => storeService.getMyStore(),
	});

	return {
		store: data?.data ?? null,
		isGettingStore: isLoading,
		error,
	};
};

export const useGetStore = (storeUrl: string) => {
	const { data, isLoading, error } = useApiQuery<TApiResponse<TStore>>({
		queryKey: STORE_KEYS.STORE(storeUrl),
		queryFn: () => storeService.getStoreURL(storeUrl),
	});

	return {
		store: data?.data ?? null,
		isGettingStore: isLoading,
		error,
	};
};
