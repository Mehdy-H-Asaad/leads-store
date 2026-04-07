import type {
	TCreateOrderDTO,
	TUpdateOrderDTO,
} from "@/entities/order/api/order.dto";
import type { TOrder } from "@/entities/order/model/order.model";
import type {
	TOrderFormValues,
	TCreateOrderFormValues,
	TUpdateOrderFormValues,
} from "../schema/order-form.schema";

export const orderFormMapper = {
	fromModelToFormValues(order: TOrder): TOrderFormValues {
		return {
			customer_id: order.customerId,
			item_id: order.itemId,
			status: order.status,
			item_price: order.itemPrice,
			quantity: order.quantity,
			total: order.total,
			total_cost: order.totalCost,
			customer_message: order.customerMessage ?? "",
			address: order.address ?? "",
			notes: order.notes ?? "",
			delivery_status: order.deliveryStatus,
			payment: {
				status: order.payment.status,
				method: order.payment.method,
				amount_paid: order.payment.amountPaid,
				paid_at: order.payment.paidAt ?? undefined,
				reference: order.payment.reference ?? "",
				notes: order.payment.notes ?? "",
			},
		};
	},

	toCreateDTO({
		customer_id,
		item_id,
		status,
		item_price,
		quantity,
		total,
		total_cost,
		customer_message,
		address,
		notes,
		delivery_status,
		payment,
	}: TCreateOrderFormValues): TCreateOrderDTO {
		return {
			customer_id,
			item_id,
			status,
			item_price,
			quantity,
			total,
			total_cost,
			customer_message: customer_message || undefined,
			address: address || undefined,
			notes: notes || undefined,
			delivery_status,
			payment: {
				status: payment.status,
				method: payment.method,
				amount_paid: payment.amount_paid,
				paid_at: payment.paid_at,
				reference: payment.reference || undefined,
				notes: payment.notes || undefined,
			},
		};
	},

	toUpdateDTO({
		item_id,
		status,
		item_price,
		quantity,
		total,
		total_cost,
		customer_message,
		address,
		notes,
		delivery_status,
		payment,
	}: TUpdateOrderFormValues): TUpdateOrderDTO {
		return {
			item_id,
			status,
			item_price,
			quantity,
			total,
			total_cost,
			customer_message: customer_message || undefined,
			address: address || undefined,
			notes: notes || undefined,
			delivery_status,
			payment: {
				status: payment.status,
				method: payment.method,
				amount_paid: payment.amount_paid,
				paid_at: payment.paid_at,
				reference: payment.reference || undefined,
				notes: payment.notes || undefined,
			},
		};
	},
};
