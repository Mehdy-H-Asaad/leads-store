import { TCreateInvoiceDTO } from "@/entities/invoice/api/invoice.dto";
import { TCreateInvoiceFormValues } from "../schema/invoice-form.schema";

export const invoiceFormMapper = {
	toCreateDTO(values: TCreateInvoiceFormValues): TCreateInvoiceDTO {
		return {
			order_number: values.orderNumber,
			customer_id: values.customerId,
			item_ids: values.itemIds,
			quantity: values.quantity,
			subtotal: values.subtotal,
			discount: values.discount,
			shipping_costs: values.shippingCosts,
			total: values.total,
		};
	},
};
