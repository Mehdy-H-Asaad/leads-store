import {
	apiFetcher,
	TApiResponse,
	TRequestOptions,
} from "@/shared/lib/fetcher";
import { analyticsDto, TAnalyticsDTO } from "./analytics.dto";
import { TAnalytics } from "../model/analytics.model";
import { analyticsMapper } from "./analytics.mapper";

const ANALYTICS_PATH = "/analytics/overview" as const;

export const analyticsService = {
	getOverview: async (
		options?: TRequestOptions
	): Promise<TApiResponse<TAnalytics>> => {
		const response = await apiFetcher.get<TApiResponse<TAnalyticsDTO>>(
			`${ANALYTICS_PATH}?days=30`,
			options
		);

		const parsed = analyticsDto.safeParse(response.data);

		if (!parsed.success) {
			console.error("Zod validation failed", parsed.error);
			throw new Error("Invalid analytics data shape from API");
		}

		return {
			...response,
			data: analyticsMapper.fromDtoToModel(parsed.data),
		};
	},
};
