export const PRODUCT_KEYS = {
	ALL: ["products"],
	LISTS: () => [...PRODUCT_KEYS.ALL, "list"] as const,
	LIST: (filters?: Record<string, unknown>) =>
		[...PRODUCT_KEYS.LISTS(), filters] as const,
	DETAILS: () => [...PRODUCT_KEYS.ALL, "detail"] as const,
	DETAIL: (id: string) => [...PRODUCT_KEYS.DETAILS(), id] as const,
};
