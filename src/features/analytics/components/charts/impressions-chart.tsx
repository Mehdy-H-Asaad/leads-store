"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/shared/components/ui/chart";
import { viewsChartConfig } from "../../constants/analytics.constants";
import type { TAnalyticsDailyTrend } from "../../schema/analytics.schema";

type TImpressionsChartProps = {
	data: TAnalyticsDailyTrend[];
};

export const ImpressionsChart = ({ data }: TImpressionsChartProps) => {
	return (
		<ChartContainer config={viewsChartConfig} className="min-h-[280px] w-full">
			<AreaChart
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
				<Area
					type="monotone"
					dataKey="storeViews"
					stroke="var(--color-storeViews)"
					fill="var(--color-storeViews)"
					fillOpacity={0.3}
					strokeWidth={2}
				/>
				<Area
					type="monotone"
					dataKey="itemViews"
					stroke="var(--color-itemViews)"
					fill="var(--color-itemViews)"
					fillOpacity={0.3}
					strokeWidth={2}
				/>
			</AreaChart>
		</ChartContainer>
	);
};
