import type { TOrderDTO } from "./order.dto";
import type { TOrder } from "../model/order.model";

export const orderMapper = {
	fromDtoToModel(dto: TOrderDTO): TOrder {
		return {
			id: dto.id,
			customerId: dto.customer_id,
			itemId: dto.item_id,
			itemPrice: dto.item_price,
			quantity: dto.quantity,
			total: dto.total,
			totalCost: dto.total_cost,
			payment: {
				status: dto.payment.status,
				method: dto.payment.method,
				amountPaid: dto.payment.amount_paid,
				paidAt: dto.payment.paid_at,
				reference: dto.payment.reference,
				notes: dto.payment.notes,
			},
			customerMessage: dto.customer_message,
			address: dto.address,
			deliveryStatus: dto.delivery_status,
			notes: dto.notes,
			item: {
				userId: dto.item.user_id,
				id: dto.item.id,
				name: dto.item.name,
				slug: dto.item.slug,
				price: dto.item.price,
				thumbnail: dto.item.thumbnail,
			},
			customer: {
				userId: dto.customer.user_id,
				createdAt: dto.customer.created_at,
				updatedAt: dto.customer.updated_at,
				id: dto.customer.id,
				name: dto.customer.name,
				countryCode: dto.customer.country_code,
				phone: dto.customer.phone,
				email: dto.customer.email,
				address: dto.customer.address,
				notes: dto.customer.notes,
				source: dto.customer.source,
				status: dto.customer.status,
				isFavourite: dto.customer.is_favourite,
			},
			isRead: dto.is_read,
			source: dto.source,
			status: dto.status,
			profit: dto.profit,
			createdAt: dto.created_at,
			updatedAt: dto.updated_at,
		} satisfies TOrder;
	},
};
