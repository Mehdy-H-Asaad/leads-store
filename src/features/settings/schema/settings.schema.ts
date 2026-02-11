import { z } from "zod";

export const BusinessProfileSchema = z.object({
	businessName: z.string().min(1, "Business name is required"),
	whatsappNumber: z.string().min(1, "WhatsApp number is required"),
	businessDescription: z.string().min(1, "Business description is required"),
	storeUrlSlug: z
		.string()
		.min(1, "Store URL is required")
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			"Use lowercase letters, numbers and hyphens only (e.g. tasty-bites)"
		),
});

export type TBusinessProfileDTO = z.infer<typeof BusinessProfileSchema>;
