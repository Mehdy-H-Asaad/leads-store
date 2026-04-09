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
	amountPaid: z.number().min(0),
	paidAt: z.date().optional(),
	reference: z.string().optional(),
	notes: z.string().optional(),
});

export const orderFormSchema = z.object({
	customerId: z.string().min(1, "Customer is required"),
	itemId: z.string().min(1, "Item is required"),
	status: z.enum(ORDER_STATUS),
	itemPrice: z.number().min(0),
	quantity: z.number().min(1, "Quantity must be at least 1"),
	total: z.number().min(0),
	totalCost: z.number().min(0),
	customerMessage: z.string().optional(),
	address: z.string().optional(),
	notes: z.string().optional(),
	deliveryStatus: z.enum(DELIVERY_STATUS),
	payment: orderPaymentFormSchema,
});

export const createOrderFormSchema = orderFormSchema;

export const updateOrderFormSchema = orderFormSchema;

export type TOrderFormValues = z.infer<typeof orderFormSchema>;
export type TCreateOrderFormValues = z.infer<typeof createOrderFormSchema>;
export type TUpdateOrderFormValues = z.infer<typeof updateOrderFormSchema>;
export type TOrderPaymentFormValues = z.infer<typeof orderPaymentFormSchema>;
