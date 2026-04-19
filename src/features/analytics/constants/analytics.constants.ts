import type { ChartConfig } from "@/shared/components/ui/chart";

export const viewsChartConfig = {
	storeViews: {
		label: "Store Views",
		color: "var(--chart-1)",
	},
	itemViews: {
		label: "Item Views",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export const revenueOrdersChartConfig = {
	revenue: {
		label: "Revenue",
		color: "var(--chart-1)",
	},
	orders: {
		label: "Orders",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export const countriesChartConfig = {
	count: {
		label: "Visitors",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

export const osBreakdownChartConfig = {
	count: {
		label: "Sessions",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

export const topItemsChartConfig = {
	views: {
		label: "Views",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;
