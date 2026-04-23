"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";
import type { TAnalyticsDailyTrend } from "@/entities/analytics/model/analytics.model";
import type { ChartConfig } from "@/shared/components/ui/chart";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const chartConfig = {
	revenue: {
		label: "Revenue",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

type TRevenueSparklineProps = {
	data: TAnalyticsDailyTrend[];
	isLoading?: boolean;
};

export const RevenueSparkline = ({ data }: TRevenueSparklineProps) => {
	const last7 = data.slice(-7);
	const prev7 = data.slice(-14, -7);

	const currentTotal = last7.reduce((sum, d) => sum + d.revenue, 0);
	const prevTotal = prev7.reduce((sum, d) => sum + d.revenue, 0);

	const percentChange =
		prevTotal > 0
			? (((currentTotal - prevTotal) / prevTotal) * 100).toFixed(1)
			: null;

	const isUp = percentChange !== null && parseFloat(percentChange) > 0;
	const isDown = percentChange !== null && parseFloat(percentChange) < 0;

	return (
		<Card className="rounded-xl border bg-card shadow-sm">
			<CardHeader className="pb-2">
				<div className="flex items-start justify-between">
					<div>
						<CardTitle>Revenue Trend</CardTitle>
						<CardDescription>Last 7 days</CardDescription>
					</div>
					<div className="flex flex-col items-end gap-1">
						<span className="text-2xl font-bold">
							${currentTotal.toLocaleString()}
						</span>
						{percentChange !== null && (
							<span
								className={`flex items-center gap-1 text-xs font-medium ${
									isUp
										? "text-green-600"
										: isDown
											? "text-red-500"
											: "text-muted-foreground"
								}`}
							>
								{isUp ? (
									<TrendingUp className="size-3" />
								) : isDown ? (
									<TrendingDown className="size-3" />
								) : (
									<Minus className="size-3" />
								)}
								{isUp ? "+" : ""}
								{percentChange}% vs prev week
							</span>
						)}
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-0">
				{last7.length === 0 ? (
					<div className="flex items-center justify-center h-[120px] text-sm text-muted-foreground">
						No trend data yet
					</div>
				) : (
					<ChartContainer config={chartConfig} className="h-[120px] w-full">
						<AreaChart
							data={last7}
							margin={{ left: 0, right: 0, top: 4, bottom: 0 }}
						>
							<defs>
								<linearGradient
									id="revenueGradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="var(--chart-1)"
										stopOpacity={0.3}
									/>
									<stop
										offset="95%"
										stopColor="var(--chart-1)"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} strokeDasharray="3 3" />
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={6}
								tick={{ fontSize: 10 }}
								tickFormatter={value =>
									new Date(value).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
									})
								}
							/>
							<YAxis hide />
							<ChartTooltip
								content={
									<ChartTooltipContent
										formatter={(value) =>
											`$${Number(value).toLocaleString()}`
										}
									/>
								}
							/>
							<Area
								type="monotone"
								dataKey="revenue"
								stroke="var(--chart-1)"
								strokeWidth={2}
								fill="url(#revenueGradient)"
								dot={false}
							/>
						</AreaChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
};
