import { z } from "zod";
import { FileSchema } from "../../schema/file.schema";

export enum ORDER_STATUS {
	NEW = "new",
	SEEN = "seen",
	CONTACTED = "contacted",
	CONFIRMED = "confirmed",
	PROCESSING = "processing",
	COMPLETED = "completed",
	CANCELLED = "cancelled",
	IGNORED = "ignored",
}

export enum PAYMENT_STATUS {
	UNPAID = "unpaid",
	PARTIAL = "partial",
	PAID = "paid",
	REFUNDED = "refunded",
}

export enum PAYMENT_METHOD {
	CASH = "cash",
	BANK_TRANSFER = "bank_transfer",
	CREDIT_CARD = "credit_card",
	MOBILE_WALLET = "mobile_wallet",
	CHEQUE = "cheque",
	OTHER = "other",
}

export enum DELIVERY_STATUS {
	PENDING = "pending",
	PREPARING = "preparing",
	SHIPPED = "shipped",
	DELIVERED = "delivered",
	RETURNED = "returned",
}

export enum ORDER_SOURCE {
	WEB = "web",
	INTERNAL = "internal",
}

export const orderItemRefSchema = z.object({
	user_id: z.string(),
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	price: z.number(),
	thumbnail: FileSchema,
});

export const orderCustomerRefSchema = z.object({
	user_id: z.string(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
	id: z.string(),
	name: z.string(),
	country_code: z.string(),
	phone: z.string(),
	email: z.string().nullish(),
	address: z.string().nullish(),
	notes: z.string().nullish(),
	source: z.string(),
	status: z.string(),
	is_favourite: z.boolean(),
});

export const orderPaymentSchema = z.object({
	status: z.enum(PAYMENT_STATUS),
	method: z.enum(PAYMENT_METHOD),
	amount_paid: z.number().nullable(),
	paid_at: z.coerce.date().nullish(),
	reference: z.enum(ORDER_SOURCE).nullish(),
	notes: z.string().nullish(),
});

export type TOrderItemRef = z.infer<typeof orderItemRefSchema>;
export type TOrderCustomerRef = z.infer<typeof orderCustomerRefSchema>;
export type TOrderPayment = z.infer<typeof orderPaymentSchema>;
