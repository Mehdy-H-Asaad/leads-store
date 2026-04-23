import { z } from "zod";

export const invoiceSchemaDto = z.object({
	id: z.string(),
	invoice_number: z.string(),
	order_number: z.string(),
	order_reference_number: z.string(),
	customer: z.object({
		name: z.string(),
		email: z.string(),
		phone: z.string(),
		address: z.string(),
	}),
	item: z.object({
		name: z.string(),
		quantity: z.number(),
	}),
	currency: z.string(),
	subtotal: z.number(),
	discount: z.number(),
	shipping_costs: z.number(),
	total: z.number(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const createInvoiceSchemaDto = z.object({
	order_number: z.string(),
	order_reference_number: z.string(),
	customer_id: z.string(),
	item_id: z.string(),
	quantity: z.number().min(1),
	currency: z.string(),
	subtotal: z.number().min(0),
	discount: z.number().min(0),
	shipping_costs: z.number().min(0),
	total: z.number().min(0),
});

export type TInvoiceDTO = z.infer<typeof invoiceSchemaDto>;
export type TCreateInvoiceDTO = z.infer<typeof createInvoiceSchemaDto>;
