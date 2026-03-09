"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { productPerformanceChartConfig } from "../../constants/analytics.constants";
import type { TProductPerformanceDataPoint } from "../../schema/analytics.schema";

const productData: TProductPerformanceDataPoint[] = [
	{
		product: "iPhone 15 Pro",
		leads: 42,
		revenue: 42000,
		fill: "var(--chart-1)",
	},
	{ product: "Galaxy S24", leads: 38, revenue: 38400, fill: "var(--chart-2)" },
	{ product: "Pixel 8 Pro", leads: 28, revenue: 36400, fill: "var(--chart-3)" },
	{ product: "MacBook Air", leads: 22, revenue: 24200, fill: "var(--chart-4)" },
	{ product: "AirPods Pro", leads: 35, revenue: 8750, fill: "var(--chart-5)" },
];

export const ProductPerformanceChart = () => {
	return (
		<ChartContainer
			config={productPerformanceChartConfig}
			className="min-h-[280px] w-full"
		>
			<BarChart
				accessibilityLayer
				data={productData}
				margin={{ left: 12, right: 12 }}
			>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="product"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tick={{ fontSize: 12 }}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="leads" radius={[4, 4, 0, 0]}>
					{productData.map((entry, index) => (
						<Cell key={index} fill={entry.fill} />
					))}
				</Bar>
			</BarChart>
		</ChartContainer>
	);
};
