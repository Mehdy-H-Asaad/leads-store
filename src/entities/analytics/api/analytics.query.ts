import { useApiQuery } from "@/shared/hooks/use-api-query";
import { ANALYTICS_KEYS } from "./analytics.keys";
import { analyticsService } from "./analytics.service";
import type { TAnalytics } from "../model/analytics.model";
import type { TApiResponse } from "@/shared/lib/fetcher";

type TUseGetAnalyticsOverviewProps = {
	// fromDate?: string;
	// toDate?: string;
};

export const useGetAnalyticsOverview = ({}: // fromDate,
// toDate,
TUseGetAnalyticsOverviewProps = {}) => {
	// const filters = { from_date: fromDate, to_date: toDate };

	const { data, isLoading, error } = useApiQuery<TApiResponse<TAnalytics>>({
		queryKey: ANALYTICS_KEYS.OVERVIEW(),
		queryFn: () =>
			analyticsService.getOverview({
				// params: { from_date: fromDate, to_date: toDate },
			}),
	});

	return {
		analytics: data?.data ?? null,
		isGettingAnalytics: isLoading,
		error,
	};
};
