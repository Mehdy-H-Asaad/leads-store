"use client";

import { PieChart, Pie, Cell } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { leadStatusChartConfig } from "../../constants/analytics.constants";
import type { TLeadStatusDataPoint } from "../../schema/analytics.schema";

const leadStatusData: TLeadStatusDataPoint[] = [
	{ status: "new", value: 98, fill: "var(--color-new)" },
	{ status: "contacted", value: 76, fill: "var(--color-contacted)" },
	{ status: "qualified", value: 54, fill: "var(--color-qualified)" },
	{ status: "converted", value: 89, fill: "var(--color-converted)" },
	{ status: "lost", value: 26, fill: "var(--color-lost)" },
];

export const LeadStatusChart = () => {
	return (
		<ChartContainer
			config={leadStatusChartConfig}
			className="min-h-[280px] w-full"
		>
			<PieChart accessibilityLayer>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Pie
					data={leadStatusData}
					dataKey="value"
					nameKey="status"
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={100}
					paddingAngle={2}
				>
					{leadStatusData.map((entry, index) => (
						<Cell key={index} fill={entry.fill} />
					))}
				</Pie>
				<ChartLegend content={<ChartLegendContent nameKey="status" />} />
			</PieChart>
		</ChartContainer>
	);
};
