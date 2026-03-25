import { z } from "zod";

export const customerRefContractSchema = z.object({
	id: z.string(),
	name: z.string(),
	country_code: z.string(),
	phone: z.string(),
	email: z.string().nullish(),
	address: z.string().nullish(),
	notes: z.string().nullish(),
});

export type TCustomerRefContract = z.infer<typeof customerRefContractSchema>;
