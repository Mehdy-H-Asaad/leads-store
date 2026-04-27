export const ITEM_KEYS = {
	ALL: ["items"],
	LISTS: () => [...ITEM_KEYS.ALL, "list"] as const,
	LIST: (filters?: Record<string, unknown>) =>
		filters
			? ([...ITEM_KEYS.LISTS(), filters] as const)
			: ([...ITEM_KEYS.LISTS()] as const),
	DETAILS: () => [...ITEM_KEYS.ALL, "detail"] as const,
	DETAIL: (id: string) => [...ITEM_KEYS.DETAILS(), id] as const,

	STORE_LISTS: () => [...ITEM_KEYS.ALL, "store", "list"] as const,
	STORE_LIST: (storeUrl: string, filters?: { category_id?: string }) =>
		[...ITEM_KEYS.STORE_LISTS(), storeUrl, filters ?? {}] as const,
	STORE_DETAILS: () => [...ITEM_KEYS.ALL, "store", "detail"] as const,
	STORE_DETAIL: (storeUrl: string, slug: string) =>
		[...ITEM_KEYS.STORE_DETAILS(), storeUrl, slug] as const,
};
