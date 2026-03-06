export const USER_KEYS = {
	ALL: ["users"],
	ME: () => [...USER_KEYS.ALL, "me"] as const,
	LISTS: () => [...USER_KEYS.ALL, "list"] as const,
	LIST: (filters?: Record<string, unknown>) =>
		[...USER_KEYS.LISTS(), filters] as const,
	DETAILS: () => [...USER_KEYS.ALL, "detail"] as const,
	DETAIL: (id: string) => [...USER_KEYS.DETAILS(), id] as const,
};
