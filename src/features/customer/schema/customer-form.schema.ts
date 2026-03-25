import { z } from "zod";

export const customerFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	country_code: z.string().min(1, "Country code is required"),
	phone: z.string().min(1, "Phone is required"),
	email: z.email("Invalid email address").optional().or(z.literal("")),
	address: z.string().optional(),
	notes: z.string().optional(),
});

export const createCustomerFormSchema = customerFormSchema;
export const updateCustomerFormSchema = customerFormSchema;

export type TCustomerFormValues = z.infer<typeof customerFormSchema>;
export type TCreateCustomerFormValues = z.infer<
	typeof createCustomerFormSchema
>;
export type TUpdateCustomerFormValues = z.infer<
	typeof updateCustomerFormSchema
>;
