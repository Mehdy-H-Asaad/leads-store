import { z } from "zod";
import {
	ORDER_STATUS,
	PAYMENT_STATUS,
	PAYMENT_METHOD,
	DELIVERY_STATUS,
	ORDER_SOURCE,
} from "@/shared/contracts/order/order.contract";
import { FileSchema } from "@/shared/schema/file.schema";

export const orderPaymentModel = z.object({
	status: z.enum(PAYMENT_STATUS),
	method: z.enum(PAYMENT_METHOD),
	amountPaid: z.number().nullable(),
	paidAt: z.date().nullish(),
	reference: z.enum(ORDER_SOURCE).nullish(),
	notes: z.string().nullish(),
});

export const orderItemRefModel = z.object({
	userId: z.string(),
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	price: z.number(),
	thumbnail: FileSchema,
});

export const orderCustomerRefModel = z.object({
	userId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	id: z.string(),
	name: z.string(),
	countryCode: z.string(),
	phone: z.string(),
	email: z.string().nullish(),
	address: z.string().nullish(),
	notes: z.string().nullish(),
	source: z.string(),
	status: z.string(),
	isFavourite: z.boolean(),
});

export const orderModel = z.object({
	id: z.string(),
	customerId: z.string(),
	itemId: z.string(),
	itemPrice: z.number(),
	quantity: z.number(),
	total: z.number(),
	totalCost: z.number(),
	payment: orderPaymentModel.nullable(),
	customerMessage: z.string().nullish(),
	address: z.string().nullish(),
	deliveryStatus: z.enum(DELIVERY_STATUS),
	notes: z.string().nullish(),
	referenceNumber: z.string().nullable(),
	item: orderItemRefModel.nullable(),
	customer: orderCustomerRefModel.nullable(),
	isRead: z.boolean(),
	source: z.enum(ORDER_SOURCE),
	status: z.enum(ORDER_STATUS),
	profit: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type TOrder = z.infer<typeof orderModel>;
export type TOrderPaymentModel = z.infer<typeof orderPaymentModel>;
export type TOrderItemRefModel = z.infer<typeof orderItemRefModel>;
export type TOrderCustomerRefModel = z.infer<typeof orderCustomerRefModel>;
