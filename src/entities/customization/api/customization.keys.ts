export const CUSTOMIZATION_KEYS = {
	ME: ["customization", "me"] as const,
	STORE: (storeUrl: string) => ["customization", "store", storeUrl] as const,
};
