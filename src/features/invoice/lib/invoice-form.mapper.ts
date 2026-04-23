import { TCreateInvoiceDTO } from "@/entities/invoice/api/invoice.dto";
import { TCreateInvoiceFormValues } from "../schema/invoice-form.schema";

export const invoiceFormMapper = {
	toCreateDTO(values: TCreateInvoiceFormValues): TCreateInvoiceDTO {
		return {
			order_number: values.orderNumber,
			order_reference_number: values.orderReferenceNumber,
			customer_id: values.customerId,
			item_id: values.itemId,
			quantity: values.quantity,
			currency: values.currency,
			subtotal: values.subtotal,
			discount: values.discount,
			shipping_costs: values.shippingCosts,
			total: values.total,
		};
	},
};
