import type { TAnalyticsDTO } from "./analytics.dto";
import type { TAnalytics } from "../model/analytics.model";

export const analyticsMapper = {
	fromDtoToModel(dto: TAnalyticsDTO): TAnalytics {
		return {
			overview: {
				period: {
					fromDate: dto.overview.period.from_date,
					toDate: dto.overview.period.to_date,
				},
				storeViews: dto.overview.store_views,
				itemViews: dto.overview.item_views,
				totalOrders: dto.overview.total_orders,
				revenue: dto.overview.revenue,
				totalCost: dto.overview.total_cost,
				unitsSold: dto.overview.units_sold,
				profit: dto.overview.profit,
			},
			countries: dto.countries.map(c => ({
				key: c.key,
				count: c.count,
				percentage: c.percentage,
			})),
			osBreakdown: dto.os_breakdown.map(o => ({
				key: o.key,
				count: o.count,
				percentage: o.percentage,
			})),
			dailyTrend: dto.daily_trend.map(d => ({
				date: d.date,
				storeViews: d.store_views,
				itemViews: d.item_views,
				orders: d.orders,
				revenue: d.revenue,
			})),
			topItems: dto.top_items.map(t => ({
				itemId: t.item_id,
				name: t.name,
				views: t.views,
			})),
		};
	},
};
