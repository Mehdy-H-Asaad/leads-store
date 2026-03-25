export type TRevenueDataPoint = {
	month: string;
	revenue: number;
	leads: number;
};

export type TLeadsBySourceDataPoint = {
	source: string;
	leads: number;
	fill?: string;
};

export type TImpressionsDataPoint = {
	month: string;
	impressions: number;
	visits: number;
};

export type TLeadStatusDataPoint = {
	status: string;
	value: number;
	fill?: string;
};

export type TItemPerformanceDataPoint = {
	item: string;
	leads: number;
	revenue: number;
	fill?: string;
};
