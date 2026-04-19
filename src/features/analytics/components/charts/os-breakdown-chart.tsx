"use client";

import { PieChart, Pie, Cell } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/shared/components/ui/chart";
import type { TAnalyticsBreakdownItem } from "../../schema/analytics.schema";
import type { ChartConfig } from "@/shared/components/ui/chart";

type TOsBreakdownChartProps = {
	data: TAnalyticsBreakdownItem[];
};

const CHART_COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

export const OsBreakdownChart = ({ data }: TOsBreakdownChartProps) => {
	const chartConfig = data.reduce<ChartConfig>((acc, item, index) => {
		acc[item.key] = {
			label: item.key,
			color: CHART_COLORS[index % CHART_COLORS.length],
		};
		return acc;
	}, {});

	const chartData = data.map((item, index) => ({
		...item,
		fill: CHART_COLORS[index % CHART_COLORS.length],
	}));

	return (
		<ChartContainer config={chartConfig} className="min-h-[280px] w-full">
			<PieChart accessibilityLayer>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Pie
					data={chartData}
					dataKey="count"
					nameKey="key"
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={100}
					paddingAngle={2}
				>
					{chartData.map((entry, index) => (
						<Cell key={index} fill={entry.fill} />
					))}
				</Pie>
				<ChartLegend content={<ChartLegendContent nameKey="key" />} />
			</PieChart>
		</ChartContainer>
	);
};
