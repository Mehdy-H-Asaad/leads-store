"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { countriesChartConfig } from "../../constants/analytics.constants";
import type { TAnalyticsBreakdownItem } from "../../schema/analytics.schema";

type TCountriesChartProps = {
	data: TAnalyticsBreakdownItem[];
};

const CHART_COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

export const LeadStatusChart = ({ data }: TCountriesChartProps) => {
	return (
		<ChartContainer
			config={countriesChartConfig}
			className="min-h-[280px] w-full"
		>
			<BarChart
				accessibilityLayer
				data={data}
				layout="vertical"
				margin={{ left: 12, right: 12 }}
			>
				<CartesianGrid horizontal={false} strokeDasharray="3 3" />
				<XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
				<YAxis
					type="category"
					dataKey="key"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					width={80}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="count" radius={[0, 4, 4, 0]}>
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
