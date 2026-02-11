"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DollarSign, Users, TrendingUp, Target } from "lucide-react";

const stats = [
	{
		title: "Total Revenue",
		value: "$32,400",
		change: "+12.5%",
		description: "Last 12 months",
		icon: DollarSign,
	},
	{
		title: "Total Leads",
		value: "343",
		change: "+8.2%",
		description: "vs previous period",
		icon: Users,
	},
	{
		title: "Conversion Rate",
		value: "4.2%",
		change: "+0.3%",
		description: "Lead to customer",
		icon: TrendingUp,
	},
	{
		title: "Top Source",
		value: "Website",
		change: "124 leads",
		description: "Best performing channel",
		icon: Target,
	},
];

export const StatsCards = () => {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{stats.map(({ title, value, change, description, icon: Icon }) => (
				<Card key={title} className="rounded-xl border bg-card shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							{title}
						</CardTitle>
						<Icon className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{value}</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-emerald-600 font-medium">{change}</span>{" "}
							{description}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
