import { customerRefContractSchema } from "@/shared/contracts/customer/customer.contract";
import { itemContractRefSchema } from "@/shared/contracts/item/item.contract";
import { z } from "zod";

export const invoiceSchemaDto = z.object({
	id: z.string(),
	invoice_number: z.string(),
	order_number: z.string().nullable(),
	customer: customerRefContractSchema.pick({
		name: true,
		email: true,
		phone: true,
		address: true,
	}),
	item: itemContractRefSchema.pick({
		name: true,
		quantity: true,
	}),
	currency: z.string(),
	subtotal: z.number(),
	discount: z.number().nullable(),
	shipping_costs: z.number(),
	total: z.number(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const createInvoiceSchemaDto = z.object({
	order_number: z.string().optional(),
	customer_id: z.string(),
	item_id: z.string(),
	quantity: z.number().optional(),
	currency: z.string(),
	subtotal: z.number(),
	discount: z.number().optional(),
	shipping_costs: z.number().optional(),
	total: z.number(),
});

export type TInvoiceDTO = z.infer<typeof invoiceSchemaDto>;
export type TCreateInvoiceDTO = z.infer<typeof createInvoiceSchemaDto>;
