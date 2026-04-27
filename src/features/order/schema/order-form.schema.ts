import { z } from "zod";
import {
	ORDER_STATUS,
	PAYMENT_STATUS,
	PAYMENT_METHOD,
	DELIVERY_STATUS,
	ORDER_SOURCE,
} from "@/shared/contracts/order/order.contract";

export const orderPaymentFormSchema = z.object({
	status: z.enum(PAYMENT_STATUS),
	method: z.enum(PAYMENT_METHOD),
	amountPaid: z.number().min(0).optional(),
	paidAt: z.date().optional(),
	reference: z.enum(ORDER_SOURCE).optional(),
	notes: z.string().optional(),
});

export const orderFormSchema = z.object({
	customerId: z.string().min(1, "Customer is required"),
	items: z.array(
		z.object({
			id: z.string().min(1, "Item is required"),
			price: z.number({ error: "Item price is required" }).min(0),
			quantity: z
				.number({ error: "Quantity is required" })
				.min(1, "Quantity must be at least 1"),
		})
	),
	status: z.enum(ORDER_STATUS),
	itemPrice: z.number({ error: "Item price is required" }).min(0),
	quantity: z
		.number({ error: "Quantity is required" })
		.min(1, "Quantity must be at least 1"),
	total: z.number().optional(),
	totalCost: z.number().optional(),
	customerMessage: z.string().optional(),
	address: z.string().optional(),
	notes: z.string().optional(),
	deliveryStatus: z.enum(DELIVERY_STATUS),
	payment: orderPaymentFormSchema.optional(),
});

export const createOrderFormSchema = orderFormSchema;

export const updateOrderFormSchema = orderFormSchema;

export type TOrderFormValues = z.infer<typeof orderFormSchema>;
export type TCreateOrderFormValues = z.infer<typeof createOrderFormSchema>;
export type TUpdateOrderFormValues = z.infer<typeof updateOrderFormSchema>;
export type TOrderPaymentFormValues = z.infer<typeof orderPaymentFormSchema>;
