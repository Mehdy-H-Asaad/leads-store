import { z } from "zod";

export const storeFrontOrderSchema = z.object({
	customer: z.object({
		name: z.string().min(1, "Name is required"),
		countryCode: z.string().min(1, "Country code is required"),
		phone: z.string().min(1, "Phone is required"),
		email: z.string().optional(),
		address: z.string().optional(),
	}),
	itemId: z.string().min(1, "Item is required"),
	quantity: z.number().optional(),
	customerMessage: z.string().optional(),
});

export type TStoreFrontOrderFormValues = z.infer<typeof storeFrontOrderSchema>;
