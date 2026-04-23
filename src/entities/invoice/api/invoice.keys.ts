export const INVOICE_KEYS = {
	ALL: ["invoices"],
	LISTS: () => [...INVOICE_KEYS.ALL, "list"] as const,
	LIST: (filters?: Record<string, unknown>) =>
		filters
			? ([...INVOICE_KEYS.LISTS(), filters] as const)
			: ([...INVOICE_KEYS.LISTS()] as const),
	DETAILS: () => [...INVOICE_KEYS.ALL, "detail"] as const,
	DETAIL: (id: string) => [...INVOICE_KEYS.DETAILS(), id] as const,
};
