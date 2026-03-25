"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { itemPerformanceChartConfig } from "../../constants/analytics.constants";
import type { TItemPerformanceDataPoint } from "../../schema/analytics.schema";

const itemData: TItemPerformanceDataPoint[] = [
	{
		item: "iPhone 15 Pro",
		leads: 42,
		revenue: 42000,
		fill: "var(--chart-1)",
	},
	{ item: "Galaxy S24", leads: 38, revenue: 38400, fill: "var(--chart-2)" },
	{ item: "Pixel 8 Pro", leads: 28, revenue: 36400, fill: "var(--chart-3)" },
	{ item: "MacBook Air", leads: 22, revenue: 24200, fill: "var(--chart-4)" },
	{ item: "AirPods Pro", leads: 35, revenue: 8750, fill: "var(--chart-5)" },
];

export const ItemPerformanceChart = () => {
	return (
		<ChartContainer
			config={itemPerformanceChartConfig}
			className="min-h-[280px] w-full"
		>
			<BarChart
				accessibilityLayer
				data={itemData}
				margin={{ left: 12, right: 12 }}
			>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="item"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tick={{ fontSize: 12 }}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="leads" radius={[4, 4, 0, 0]}>
					{itemData.map((entry, index) => (
						<Cell key={index} fill={entry.fill} />
					))}
				</Bar>
			</BarChart>
		</ChartContainer>
	);
};
