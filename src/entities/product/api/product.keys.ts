export const PRODUCT_KEYS = {
	ALL: ["products"],
	LISTS: () => [...PRODUCT_KEYS.ALL, "list"] as const,
	LIST: (filters?: Record<string, unknown>) =>
		filters
			? ([...PRODUCT_KEYS.LISTS(), filters] as const)
			: ([...PRODUCT_KEYS.LISTS()] as const),
	DETAILS: () => [...PRODUCT_KEYS.ALL, "detail"] as const,
	DETAIL: (id: string) => [...PRODUCT_KEYS.DETAILS(), id] as const,
};
