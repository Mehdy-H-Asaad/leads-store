export const ANALYTICS_KEYS = {
	ALL: ["analytics"],
	OVERVIEW: (filters?: Record<string, unknown>) =>
		filters
			? ([...ANALYTICS_KEYS.ALL, "overview", filters] as const)
			: ([...ANALYTICS_KEYS.ALL, "overview"] as const),
};
