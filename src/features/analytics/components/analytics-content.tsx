"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { StatsCards } from "./stats-cards";
import { RevenueChart } from "./charts/revenue-chart";
import { ImpressionsChart } from "./charts/impressions-chart";
import { LeadStatusChart } from "./charts/lead-status-chart";
import { ItemPerformanceChart } from "./charts/item-performance-chart";
import { OsBreakdownChart } from "./charts/os-breakdown-chart";
import { useGetAnalyticsOverview } from "@/entities/analytics/api/analytics.query";

export const AnalyticsContent = () => {
	const { analytics, isGettingAnalytics } = useGetAnalyticsOverview();

	const dailyTrend = analytics?.dailyTrend ?? [];
	const countries = analytics?.countries ?? [];
	const osBreakdown = analytics?.osBreakdown ?? [];
	const topItems = analytics?.topItems ?? [];

	return (
		<div className="flex flex-col gap-8">
			<StatsCards
				overview={analytics?.overview ?? null}
				isLoading={isGettingAnalytics}
			/>

			<div className="grid gap-8 lg:grid-cols-3">
				<Card className="lg:col-span-2 rounded-xl border bg-card shadow-sm">
					<CardHeader>
						<CardTitle>Store Views & Item Views</CardTitle>
						<CardDescription>Daily traffic and engagement</CardDescription>
					</CardHeader>
					<CardContent>
						<ImpressionsChart data={dailyTrend} />
					</CardContent>
				</Card>

				<Card className="rounded-xl border bg-card shadow-sm">
					<CardHeader>
						<CardTitle>OS Breakdown</CardTitle>
						<CardDescription>Sessions by operating system</CardDescription>
					</CardHeader>
					<CardContent>
						<OsBreakdownChart data={osBreakdown} />
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-8 lg:grid-cols-2">
				<Card className="rounded-xl border bg-card shadow-sm">
					<CardHeader>
						<CardTitle>Revenue & Orders</CardTitle>
						<CardDescription>Daily revenue and order count</CardDescription>
					</CardHeader>
					<CardContent>
						<RevenueChart data={dailyTrend} />
					</CardContent>
				</Card>

				<Card className="rounded-xl border bg-card shadow-sm">
					<CardHeader>
						<CardTitle>Countries</CardTitle>
						<CardDescription>Visitor distribution by country</CardDescription>
					</CardHeader>
					<CardContent>
						<LeadStatusChart data={countries} />
					</CardContent>
				</Card>
			</div>

			<Card className="rounded-xl border bg-card shadow-sm">
				<CardHeader>
					<CardTitle>Top Items by Views</CardTitle>
					<CardDescription>Best performing items by view count</CardDescription>
				</CardHeader>
				<CardContent>
					<ItemPerformanceChart data={topItems} />
				</CardContent>
			</Card>
		</div>
	);
};
