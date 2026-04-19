"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/shared/components/ui/chart";
import { revenueOrdersChartConfig } from "../../constants/analytics.constants";
import type { TAnalyticsDailyTrend } from "../../schema/analytics.schema";

type TRevenueChartProps = {
	data: TAnalyticsDailyTrend[];
};

export const RevenueChart = ({ data }: TRevenueChartProps) => {
	return (
		<ChartContainer
			config={revenueOrdersChartConfig}
			className="min-h-[280px] w-full"
		>
			<LineChart
				accessibilityLayer
				data={data}
				margin={{ left: 12, right: 12 }}
			>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={value =>
						new Date(value).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						})
					}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Line
					type="monotone"
					dataKey="revenue"
					stroke="var(--color-revenue)"
					strokeWidth={2}
					dot={{ fill: "var(--color-revenue)" }}
				/>
				<Line
					type="monotone"
					dataKey="orders"
					stroke="var(--color-orders)"
					strokeWidth={2}
					dot={{ fill: "var(--color-orders)" }}
				/>
			</LineChart>
		</ChartContainer>
	);
};
