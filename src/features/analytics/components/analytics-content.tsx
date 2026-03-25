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

export const AnalyticsContent = () => {
	return (
		<div className="flex flex-col gap-8">
			<StatsCards />

			<div className="grid gap-8 lg:grid-cols-3">
				<Card className="rounded-xl border bg-card shadow-sm">
					<CardHeader>
						<CardTitle>Impressions & Store Visits</CardTitle>
						<CardDescription>
							Traffic and engagement over the last 12 months
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ImpressionsChart />
					</CardContent>
				</Card>

				<Card className="rounded-xl border bg-card shadow-sm">
					<CardHeader>
						<CardTitle>Lead Status Distribution</CardTitle>
						<CardDescription>
							Breakdown of leads by current status
						</CardDescription>
					</CardHeader>
					<CardContent>
						<LeadStatusChart />
					</CardContent>
				</Card>
				<Card className="rounded-xl border bg-card shadow-sm">
					<CardHeader>
						<CardTitle>Top Items by Leads</CardTitle>
						<CardDescription>
							Best performing items by lead count
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ItemPerformanceChart />
					</CardContent>
				</Card>
			</div>

			<Card className="rounded-xl border bg-card shadow-sm">
				<CardHeader>
					<CardTitle>Revenue & Leads Overview</CardTitle>
					<CardDescription>
						Monthly revenue and lead count for the last 12 months
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RevenueChart />
				</CardContent>
			</Card>
		</div>
	);
};
