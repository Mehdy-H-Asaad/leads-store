"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	DollarSign,
	ShoppingCart,
	Eye,
	PackageCheck,
	TrendingUp,
	Store,
} from "lucide-react";
import type { TAnalyticsOverview } from "../schema/analytics.schema";
import { Skeleton } from "@/shared/components/ui/skeleton";

type TStatsCardsProps = {
	overview: TAnalyticsOverview | null;
	isLoading: boolean;
};

export const StatsCards = ({ overview, isLoading }: TStatsCardsProps) => {
	const stats = [
		{
			title: "Revenue",
			value: `$${(overview?.revenue ?? 0).toLocaleString()}`,
			description: "Total revenue",
			icon: DollarSign,
		},
		{
			title: "Profit",
			value: `$${(overview?.profit ?? 0).toLocaleString()}`,
			description: "After costs",
			icon: TrendingUp,
		},
		{
			title: "Total Orders",
			value: (overview?.totalOrders ?? 0).toLocaleString(),
			description: "Orders placed",
			icon: ShoppingCart,
		},
		{
			title: "Units Sold",
			value: (overview?.unitsSold ?? 0).toLocaleString(),
			description: "Items sold",
			icon: PackageCheck,
		},
		{
			title: "Store Views",
			value: (overview?.storeViews ?? 0).toLocaleString(),
			description: "Store page visits",
			icon: Store,
		},
		{
			title: "Item Views",
			value: (overview?.itemViews ?? 0).toLocaleString(),
			description: "Product page visits",
			icon: Eye,
		},
	];

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
			{stats.map(({ title, value, description, icon: Icon }) => (
				<Card key={title} className="rounded-xl border bg-card shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							{title}
						</CardTitle>
						<Icon className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<Skeleton className="h-7 w-20" />
						) : (
							<div className="text-2xl font-bold">{value}</div>
						)}
						<p className="text-xs text-muted-foreground mt-1">{description}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
