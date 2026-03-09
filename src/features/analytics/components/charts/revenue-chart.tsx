"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/shared/components/ui/chart";
import { revenueChartConfig } from "../../constants/analytics.constants";
import type { TRevenueDataPoint } from "../../schema/analytics.schema";

const revenueData: TRevenueDataPoint[] = [
	{ month: "Jan", revenue: 4200, leads: 24 },
	{ month: "Feb", revenue: 3800, leads: 18 },
	{ month: "Mar", revenue: 5100, leads: 31 },
	{ month: "Apr", revenue: 4600, leads: 28 },
	{ month: "May", revenue: 5900, leads: 35 },
	{ month: "Jun", revenue: 6200, leads: 42 },
	{ month: "Jul", revenue: 5800, leads: 38 },
	{ month: "Aug", revenue: 6400, leads: 45 },
	{ month: "Sep", revenue: 7100, leads: 52 },
	{ month: "Oct", revenue: 6900, leads: 48 },
	{ month: "Nov", revenue: 7500, leads: 55 },
	{ month: "Dec", revenue: 8200, leads: 61 },
];

export const RevenueChart = () => {
	return (
		<ChartContainer
			config={revenueChartConfig}
			className="min-h-[280px] w-full"
		>
			<LineChart
				accessibilityLayer
				data={revenueData}
				margin={{ left: 12, right: 12 }}
			>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={value => `$${value}`}
				/>
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
					dataKey="leads"
					stroke="var(--color-leads)"
					strokeWidth={2}
					dot={{ fill: "var(--color-leads)" }}
				/>
			</LineChart>
		</ChartContainer>
	);
};
