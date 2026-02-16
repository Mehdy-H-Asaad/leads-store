export const LEAD_KEYS = {
	ALL: ["leads"],
	LISTS: () => [...LEAD_KEYS.ALL, "list"] as const,
	LIST: (filters?: Record<string, unknown>) =>
		[...LEAD_KEYS.LISTS(), filters] as const,
	DETAILS: () => [...LEAD_KEYS.ALL, "detail"] as const,
	DETAIL: (id: string) => [...LEAD_KEYS.DETAILS(), id] as const,
};
