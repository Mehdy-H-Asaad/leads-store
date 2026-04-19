import { z } from "zod";

export const analyticsPeriodDto = z.object({
	from_date: z.string(),
	to_date: z.string(),
});

export const analyticsOverviewDto = z.object({
	period: analyticsPeriodDto,
	store_views: z.number(),
	item_views: z.number(),
	total_orders: z.number(),
	revenue: z.number(),
	total_cost: z.number(),
	units_sold: z.number(),
	profit: z.number(),
});

export const analyticsBreakdownItemDto = z.object({
	key: z.string(),
	count: z.number(),
	percentage: z.number(),
});

export const analyticsDailyTrendDto = z.object({
	date: z.string(),
	store_views: z.number(),
	item_views: z.number(),
	orders: z.number(),
	revenue: z.number(),
});

export const analyticsTopItemDto = z.object({
	item_id: z.string(),
	name: z.string(),
	views: z.number(),
});

export const analyticsDto = z.object({
	overview: analyticsOverviewDto,
	countries: z.array(analyticsBreakdownItemDto),
	os_breakdown: z.array(analyticsBreakdownItemDto),
	daily_trend: z.array(analyticsDailyTrendDto),
	top_items: z.array(analyticsTopItemDto),
});

export type TAnalyticsDTO = z.infer<typeof analyticsDto>;
export type TAnalyticsOverviewDTO = z.infer<typeof analyticsOverviewDto>;
export type TAnalyticsBreakdownItemDTO = z.infer<typeof analyticsBreakdownItemDto>;
export type TAnalyticsDailyTrendDTO = z.infer<typeof analyticsDailyTrendDto>;
export type TAnalyticsTopItemDTO = z.infer<typeof analyticsTopItemDto>;
