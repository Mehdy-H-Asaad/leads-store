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
			customerId: order.customerId,
			itemId: order.itemId,
			status: order.status,
			itemPrice: order.itemPrice,
			quantity: order.quantity,
			total: order.total,
			totalCost: order.totalCost,
			customerMessage: order.customerMessage ?? "",
			address: order.address ?? "",
			notes: order.notes ?? "",
			deliveryStatus: order.deliveryStatus,
			payment: order.payment
				? {
						status: order.payment.status,
						method: order.payment.method,
						amountPaid: order.payment.amountPaid ?? undefined,
						paidAt: order.payment.paidAt ?? undefined,
						reference: order.payment.reference ?? undefined,
						notes: order.payment.notes ?? "",
				  }
				: undefined,
		};
	},

	toCreateDTO({
		customerId,
		itemId,
		status,
		itemPrice,
		quantity,
		total,
		totalCost,
		customerMessage,
		address,
		notes,
		deliveryStatus,
		payment,
	}: TCreateOrderFormValues): TCreateOrderDTO {
		return {
			customer_id: customerId,
			item_id: itemId,
			status,
			item_price: itemPrice,
			quantity,
			total: total ?? 0,
			total_cost: totalCost ?? 0,
			customer_message: customerMessage || undefined,
			address: address || undefined,
			notes: notes || undefined,
			delivery_status: deliveryStatus,
			payment: payment
				? {
						status: payment.status,
						method: payment.method,
						amount_paid: payment.amountPaid,
						paid_at: payment.paidAt,
						reference: payment.reference ?? undefined,
						notes: payment.notes ?? undefined,
				  }
				: undefined,
		};
	},

	toUpdateDTO({
		customerId,
		itemId,
		status,
		itemPrice,
		quantity,
		total,
		totalCost,
		customerMessage,
		address,
		notes,
		deliveryStatus,
		payment,
	}: TUpdateOrderFormValues): TUpdateOrderDTO {
		return {
			customer_id: customerId,
			item_id: itemId,
			status,
			item_price: itemPrice,
			quantity,
			total,
			total_cost: totalCost,
			customer_message: customerMessage || undefined,
			address: address || undefined,
			notes: notes || undefined,
			delivery_status: deliveryStatus,
			payment: payment
				? {
						status: payment.status,
						method: payment.method,
						amount_paid: payment.amountPaid,
						paid_at: payment.paidAt,
						reference: payment.reference || undefined,
						notes: payment.notes || undefined,
				  }
				: undefined,
		};
	},
};
