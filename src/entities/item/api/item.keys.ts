export const ITEM_KEYS = {
	ALL: ["items"],
	LISTS: () => [...ITEM_KEYS.ALL, "list"] as const,
	LIST: (filters?: Record<string, unknown>) =>
		filters
			? ([...ITEM_KEYS.LISTS(), filters] as const)
			: ([...ITEM_KEYS.LISTS()] as const),
	DETAILS: () => [...ITEM_KEYS.ALL, "detail"] as const,
	DETAIL: (id: string) => [...ITEM_KEYS.DETAILS(), id] as const,
};
