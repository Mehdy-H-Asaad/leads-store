import { z } from "zod";

export const customerModel = z.object({
	id: z.string(),
	name: z.string(),
	countryCode: z.string(),
	phone: z.string(),
	email: z.string().nullish(),
	address: z.string().nullish(),
	notes: z.string().nullish(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type TCustomer = z.infer<typeof customerModel>;
