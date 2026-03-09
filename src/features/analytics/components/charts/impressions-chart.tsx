"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/shared/components/ui/chart";
import { impressionsChartConfig } from "../../constants/analytics.constants";
import type { TImpressionsDataPoint } from "../../schema/analytics.schema";

const impressionsData: TImpressionsDataPoint[] = [
	{ month: "Jan", impressions: 2400, visits: 1200 },
	{ month: "Feb", impressions: 2210, visits: 980 },
	{ month: "Mar", impressions: 2890, visits: 1450 },
	{ month: "Apr", impressions: 2780, visits: 1320 },
	{ month: "May", impressions: 3390, visits: 1680 },
	{ month: "Jun", impressions: 3490, visits: 1820 },
	{ month: "Jul", impressions: 3200, visits: 1590 },
	{ month: "Aug", impressions: 3620, visits: 1910 },
	{ month: "Sep", impressions: 4010, visits: 2100 },
	{ month: "Oct", impressions: 3850, visits: 1980 },
	{ month: "Nov", impressions: 4200, visits: 2250 },
	{ month: "Dec", impressions: 4580, visits: 2420 },
];

export const ImpressionsChart = () => {
	return (
		<ChartContainer
			config={impressionsChartConfig}
			className="min-h-[280px] w-full"
		>
			<AreaChart
				accessibilityLayer
				data={impressionsData}
				margin={{ left: 12, right: 12 }}
			>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Area
					type="monotone"
					dataKey="impressions"
					stroke="var(--color-impressions)"
					fill="var(--color-impressions)"
					fillOpacity={0.3}
					strokeWidth={2}
				/>
				<Area
					type="monotone"
					dataKey="visits"
					stroke="var(--color-visits)"
					fill="var(--color-visits)"
					fillOpacity={0.3}
					strokeWidth={2}
				/>
			</AreaChart>
		</ChartContainer>
	);
};
