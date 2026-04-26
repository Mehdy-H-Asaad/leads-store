import type { TInvoiceDTO } from "./invoice.dto";
import type { TInvoice } from "../model/invoice.model";

export const invoiceMapper = {
	fromDtoToModel(dto: TInvoiceDTO): TInvoice {
		return {
			id: dto.id,
			invoiceNumber: dto.invoice_number,
			orderNumber: dto.order_number,
			customer: {
				name: dto.customer.name,
				email: dto.customer.email,
				phone: dto.customer.phone,
				address: dto.customer.address,
			},
			item: {
				name: dto.item.name,
				quantity: dto.item.quantity,
			},
			currency: dto.currency,
			subtotal: dto.subtotal,
			discount: dto.discount,
			shippingCosts: dto.shipping_costs,
			total: dto.total,
			createdAt: dto.created_at,
			updatedAt: dto.updated_at,
		} satisfies TInvoice;
	},
};
