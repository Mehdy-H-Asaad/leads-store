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
import { BarChart3Icon } from "lucide-react";

export const AnalyticsContent = () => {
	const { analytics, isGettingAnalytics } = useGetAnalyticsOverview();

	const dailyTrend = analytics?.dailyTrend ?? [];
	const countries = analytics?.countries ?? [];
	const osBreakdown = analytics?.osBreakdown ?? [];
	const topItems = analytics?.topItems ?? [];

	const hasNoData =
		!isGettingAnalytics &&
		!analytics?.overview &&
		dailyTrend.length === 0 &&
		countries.length === 0 &&
		osBreakdown.length === 0 &&
		topItems.length === 0;

	if (hasNoData) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 rounded-xl border bg-card py-24 text-center shadow-sm">
				<div className="flex size-16 items-center justify-center rounded-full bg-muted">
					<BarChart3Icon className="size-8 text-muted-foreground" />
				</div>
				<div className="flex flex-col gap-1">
					<h3 className="text-lg font-semibold">No analytics data yet</h3>
					<p className="max-w-sm text-sm text-muted-foreground">
						Once your store starts receiving visits and orders, your analytics
						will appear here.
					</p>
				</div>
			</div>
		);
	}

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
