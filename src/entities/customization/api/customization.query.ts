"use client";

import { useApiQuery } from "@/shared/hooks/use-api-query";
import { CUSTOMIZATION_KEYS } from "./customization.keys";
import { TCustomization } from "../model/customization.model";
import { TApiResponse } from "@/shared/lib/fetcher";
import { customizationService } from "./customization.service";

export const useGetMyCustomization = () => {
	const { data, isLoading, error } = useApiQuery<TApiResponse<TCustomization>>({
		queryKey: CUSTOMIZATION_KEYS.ME,
		queryFn: () => customizationService.getMyCustomization(),
	});

	return {
		customization: data?.data ?? null,
		isGettingCustomization: isLoading,
		error,
	};
};
