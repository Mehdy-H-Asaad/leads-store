import { z } from "zod";
import {
	ORDER_STATUS,
	PAYMENT_STATUS,
	PAYMENT_METHOD,
	DELIVERY_STATUS,
	ORDER_SOURCE,
	orderItemRefSchema,
	orderCustomerRefSchema,
	orderPaymentSchema,
} from "@/shared/contracts/order/order.contract";

export const orderSchemaDto = z.object({
	id: z.string(),
	customer_id: z.string(),
	item_id: z.string(),
	item_price: z.number(),
	quantity: z.number(),
	total: z.number(),
	total_cost: z.number(),
	payment: orderPaymentSchema,
	customer_message: z.string().nullish(),
	address: z.string().nullish(),
	delivery_status: z.enum(DELIVERY_STATUS),
	notes: z.string().nullish(),
	item: orderItemRefSchema,
	customer: orderCustomerRefSchema,
	is_read: z.boolean(),
	source: z.enum(ORDER_SOURCE),
	status: z.enum(ORDER_STATUS),
	profit: z.number(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const createOrderSchemaDto = z.object({
	customer_id: z.string(),
	item_id: z.string(),
	status: z.enum(ORDER_STATUS),
	item_price: z.number(),
	quantity: z.number(),
	total: z.number(),
	total_cost: z.number(),
	customer_message: z.string().optional(),
	address: z.string().optional(),
	notes: z.string().optional(),
	payment: z.object({
		status: z.enum(PAYMENT_STATUS),
		method: z.enum(PAYMENT_METHOD),
		amount_paid: z.number(),
		paid_at: z.coerce.date().optional(),
		reference: z.string().optional(),
		notes: z.string().optional(),
	}),
	delivery_status: z.enum(DELIVERY_STATUS),
});

export const updateOrderSchemaDto = z.object({
	item_id: z.string().optional(),
	item_price: z.number().optional(),
	quantity: z.number().optional(),
	total: z.number().optional(),
	total_cost: z.number().optional(),
	payment: z
		.object({
			status: z.enum(PAYMENT_STATUS),
			method: z.enum(PAYMENT_METHOD),
			amount_paid: z.number(),
			paid_at: z.coerce.date().optional(),
			reference: z.string().optional(),
			notes: z.string().optional(),
		})
		.optional(),
	status: z.enum(ORDER_STATUS).optional(),
	is_read: z.boolean().optional(),
	customer_message: z.string().optional(),
	address: z.string().optional(),
	delivery_status: z.enum(DELIVERY_STATUS).optional(),
	notes: z.string().optional(),
});

export type TOrderDTO = z.infer<typeof orderSchemaDto>;
export type TCreateOrderDTO = z.infer<typeof createOrderSchemaDto>;
export type TUpdateOrderDTO = z.infer<typeof updateOrderSchemaDto>;
