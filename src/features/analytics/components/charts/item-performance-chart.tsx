"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { topItemsChartConfig } from "../../constants/analytics.constants";
import type { TAnalyticsTopItem } from "../../schema/analytics.schema";

type TItemPerformanceChartProps = {
	data: TAnalyticsTopItem[];
};

const CHART_COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

export const ItemPerformanceChart = ({ data }: TItemPerformanceChartProps) => {
	return (
		<ChartContainer
			config={topItemsChartConfig}
			className="min-h-[280px] w-full"
		>
			<BarChart
				accessibilityLayer
				data={data}
				margin={{ left: 12, right: 12 }}
			>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="name"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tick={{ fontSize: 12 }}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="views" radius={[4, 4, 0, 0]}>
					{data.map((_, index) => (
						<Cell
							key={index}
							fill={CHART_COLORS[index % CHART_COLORS.length]}
						/>
					))}
				</Bar>
			</BarChart>
		</ChartContainer>
	);
};
