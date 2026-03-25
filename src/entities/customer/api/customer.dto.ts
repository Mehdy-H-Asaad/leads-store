import { z } from "zod";

export const customerSchemaDto = z.object({
	id: z.string(),
	name: z.string(),
	country_code: z.string(),
	phone: z.string(),
	email: z.string().nullish(),
	address: z.string().nullish(),
	notes: z.string().nullish(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const createCustomerSchemaDto = customerSchemaDto.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export const updateCustomerSchemaDto = customerSchemaDto.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export type TCustomerDTO = z.infer<typeof customerSchemaDto>;
export type TCreateCustomerDTO = z.infer<typeof createCustomerSchemaDto>;
export type TUpdateCustomerDTO = z.infer<typeof updateCustomerSchemaDto>;
