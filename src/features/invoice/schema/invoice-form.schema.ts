import { z } from "zod";

export const invoiceFormSchema = z.object({
	customerId: z.string().min(1, "Customer is required"),
	itemIds: z.array(z.string()).min(1, "Item is required"),
	orderNumber: z.string().optional(),
	quantity: z.number({ error: "Quantity is required" }).optional(),
	subtotal: z.number({ error: "Subtotal is required" }).min(0),
	discount: z.number().min(0).optional(),
	shippingCosts: z.number().min(0).optional(),
	total: z.number({ error: "Total is required" }).min(0),
});

export type TInvoiceFormValues = z.infer<typeof invoiceFormSchema>;
export type TCreateInvoiceFormValues = TInvoiceFormValues;
