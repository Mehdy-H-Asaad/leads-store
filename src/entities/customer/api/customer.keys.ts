export const CUSTOMER_KEYS = {
	ALL: ["customers"],
	LISTS: () => [...CUSTOMER_KEYS.ALL, "list"] as const,
	LIST: (filters?: Record<string, unknown>) =>
		filters
			? ([...CUSTOMER_KEYS.LISTS(), filters] as const)
			: ([...CUSTOMER_KEYS.LISTS()] as const),
	DETAILS: () => [...CUSTOMER_KEYS.ALL, "detail"] as const,
	DETAIL: (id: string) => [...CUSTOMER_KEYS.DETAILS(), id] as const,
};
