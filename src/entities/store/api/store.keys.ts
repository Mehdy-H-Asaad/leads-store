export const STORE_KEYS = {
	ME: ["store", "me"] as const,
	STORE: (storeUrl: string) => ["store", "store", storeUrl] as const,
};
