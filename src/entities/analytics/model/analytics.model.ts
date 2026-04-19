import { z } from "zod";

export const analyticsPeriodModel = z.object({
	fromDate: z.string(),
	toDate: z.string(),
});

export const analyticsOverviewModel = z.object({
	period: analyticsPeriodModel,
	storeViews: z.number(),
	itemViews: z.number(),
	totalOrders: z.number(),
	revenue: z.number(),
	totalCost: z.number(),
	unitsSold: z.number(),
	profit: z.number(),
});

export const analyticsBreakdownItemModel = z.object({
	key: z.string(),
	count: z.number(),
	percentage: z.number(),
});

export const analyticsDailyTrendModel = z.object({
	date: z.string(),
	storeViews: z.number(),
	itemViews: z.number(),
	orders: z.number(),
	revenue: z.number(),
});

export const analyticsTopItemModel = z.object({
	itemId: z.string(),
	name: z.string(),
	views: z.number(),
});

export const analyticsModel = z.object({
	overview: analyticsOverviewModel,
	countries: z.array(analyticsBreakdownItemModel),
	osBreakdown: z.array(analyticsBreakdownItemModel),
	dailyTrend: z.array(analyticsDailyTrendModel),
	topItems: z.array(analyticsTopItemModel),
});

export type TAnalytics = z.infer<typeof analyticsModel>;
export type TAnalyticsOverview = z.infer<typeof analyticsOverviewModel>;
export type TAnalyticsBreakdownItem = z.infer<typeof analyticsBreakdownItemModel>;
export type TAnalyticsDailyTrend = z.infer<typeof analyticsDailyTrendModel>;
export type TAnalyticsTopItem = z.infer<typeof analyticsTopItemModel>;
