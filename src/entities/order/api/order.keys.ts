export const ORDER_KEYS = {
	ALL: ["orders"],
	LISTS: () => [...ORDER_KEYS.ALL, "list"] as const,
	LIST: (filters?: Record<string, unknown>) =>
		filters
			? ([...ORDER_KEYS.LISTS(), filters] as const)
			: ([...ORDER_KEYS.LISTS()] as const),
	DETAILS: () => [...ORDER_KEYS.ALL, "detail"] as const,
	DETAIL: (id: string) => [...ORDER_KEYS.DETAILS(), id] as const,
};
