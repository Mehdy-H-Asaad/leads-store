import { z } from "zod";

export const invoiceCustomerRefModel = z.object({
	name: z.string(),
	email: z.string(),
	phone: z.string(),
	address: z.string(),
});

export const invoiceItemRefModel = z.object({
	name: z.string(),
	quantity: z.number(),
});

export const invoiceModel = z.object({
	id: z.string(),
	invoiceNumber: z.string(),
	orderNumber: z.string(),
	orderReferenceNumber: z.string(),
	customer: invoiceCustomerRefModel,
	item: invoiceItemRefModel,
	currency: z.string(),
	subtotal: z.number(),
	discount: z.number(),
	shippingCosts: z.number(),
	total: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type TInvoice = z.infer<typeof invoiceModel>;
export type TInvoiceCustomerRef = z.infer<typeof invoiceCustomerRefModel>;
export type TInvoiceItemRef = z.infer<typeof invoiceItemRefModel>;
