"use client";

import { useGetAnalyticsOverview } from "@/entities/analytics/api/analytics.query";
import { StatsCards } from "@/features/analytics/components/stats-cards";
import { RecentOrdersTable } from "./recent-orders-table";
import { RevenueSparkline } from "./revenue-sparkline";
import { TopItems } from "./top-items";
import { StoreLinkCard } from "./store-link-card";

export const OverviewContent = () => {
	const { analytics, isGettingAnalytics } = useGetAnalyticsOverview();

	const dailyTrend = analytics?.dailyTrend ?? [];
	const topItems = analytics?.topItems ?? [];

	return (
		<div className="flex flex-col gap-6">
			<StatsCards
				overview={analytics?.overview ?? null}
				isLoading={isGettingAnalytics}
			/>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="flex flex-col gap-6">
						<RecentOrdersTable />
						<RevenueSparkline data={dailyTrend} />
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<StoreLinkCard />
					<TopItems items={topItems} />
				</div>
			</div>
		</div>
	);
};
