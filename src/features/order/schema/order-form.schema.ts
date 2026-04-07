import { z } from "zod";
import {
	ORDER_STATUS,
	PAYMENT_STATUS,
	PAYMENT_METHOD,
	DELIVERY_STATUS,
} from "@/shared/contracts/order/order.contract";

export const orderPaymentFormSchema = z.object({
	status: z.enum(PAYMENT_STATUS),
	method: z.enum(PAYMENT_METHOD),
	amount_paid: z.number().min(0),
	paid_at: z.date().optional(),
	reference: z.string().optional(),
	notes: z.string().optional(),
});

export const orderFormSchema = z.object({
	customer_id: z.string().min(1, "Customer is required"),
	item_id: z.string().min(1, "Item is required"),
	status: z.enum(ORDER_STATUS),
	item_price: z.number().min(0),
	quantity: z.number().min(1, "Quantity must be at least 1"),
	total: z.number().min(0),
	total_cost: z.number().min(0),
	customer_message: z.string().optional(),
	address: z.string().optional(),
	notes: z.string().optional(),
	delivery_status: z.enum(DELIVERY_STATUS),
	payment: orderPaymentFormSchema,
});

export const createOrderFormSchema = orderFormSchema;

export const updateOrderFormSchema = orderFormSchema.omit({ customer_id: true });

export type TOrderFormValues = z.infer<typeof orderFormSchema>;
export type TCreateOrderFormValues = z.infer<typeof createOrderFormSchema>;
export type TUpdateOrderFormValues = z.infer<typeof updateOrderFormSchema>;
export type TOrderPaymentFormValues = z.infer<typeof orderPaymentFormSchema>;
