import { customerRefContractSchema } from "@/shared/contracts/customer/customer.contract";
import { itemContractRefSchema } from "@/shared/contracts/item/item.contract";
import { z } from "zod";

export const invoiceModel = z.object({
	id: z.string(),
	invoiceNumber: z.string(),
	orderNumber: z.string().nullable(),
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
	shippingCosts: z.number(),
	total: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type TInvoice = z.infer<typeof invoiceModel>;
