import { z } from "zod";

export const invoiceFormSchema = z.object({
	customerId: z.string().min(1, "Customer is required"),
	itemId: z.string().min(1, "Item is required"),
	orderNumber: z.string().min(1, "Order number is required"),
	orderReferenceNumber: z.string().min(1, "Order reference number is required"),
	quantity: z
		.number({ error: "Quantity is required" })
		.min(1, "Quantity must be at least 1"),
	currency: z.string().min(1, "Currency is required"),
	subtotal: z.number({ error: "Subtotal is required" }).min(0),
	discount: z.number().min(0).default(0),
	shippingCosts: z.number().min(0).default(0),
	total: z.number({ error: "Total is required" }).min(0),
});

export type TInvoiceFormValues = z.infer<typeof invoiceFormSchema>;
export type TCreateInvoiceFormValues = TInvoiceFormValues;
