export const CATEGORY_KEYS = {
	ALL: ["categories"],
	LISTS: () => [...CATEGORY_KEYS.ALL, "list"] as const,
	LIST: (filters?: Record<string, unknown>) =>
		filters
			? ([...CATEGORY_KEYS.LISTS(), filters] as const)
			: ([...CATEGORY_KEYS.LISTS()] as const),
	DETAILS: () => [...CATEGORY_KEYS.ALL, "detail"] as const,
	DETAIL: (id: string) => [...CATEGORY_KEYS.DETAILS(), id] as const,
};
