import type { ChartConfig } from "@/shared/components/ui/chart";

export const revenueChartConfig = {
	revenue: {
		label: "Revenue",
		color: "var(--chart-1)",
	},
	leads: {
		label: "Leads",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export const leadsBySourceChartConfig = {
	website: {
		label: "Website",
		color: "var(--chart-1)",
	},
	referral: {
		label: "Referral",
		color: "var(--chart-2)",
	},
	social: {
		label: "Social Media",
		color: "var(--chart-3)",
	},
	other: {
		label: "Other",
		color: "var(--chart-4)",
	},
} satisfies ChartConfig;

export const impressionsChartConfig = {
	impressions: {
		label: "Impressions",
		color: "var(--chart-1)",
	},
	visits: {
		label: "Store Visits",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export const leadStatusChartConfig = {
	new: { label: "New", color: "var(--chart-1)" },
	contacted: { label: "Contacted", color: "var(--chart-2)" },
	qualified: { label: "Qualified", color: "var(--chart-3)" },
	converted: { label: "Converted", color: "var(--chart-4)" },
	lost: { label: "Lost", color: "var(--chart-5)" },
} satisfies ChartConfig;

export const productPerformanceChartConfig = {
	leads: {
		label: "Leads",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;
