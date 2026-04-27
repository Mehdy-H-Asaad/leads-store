import { TStoreFrontOrderFormValues } from "../schema/store-front-order.schema";
import { TCreateStorefrontOrderDTO } from "@/entities/order/api/order.dto";

export const storeFrontFormMapper = {
	toCreateDTO(data: TStoreFrontOrderFormValues): TCreateStorefrontOrderDTO {
		return {
			customer: {
				name: data.customer.name,
				country_code: data.customer.countryCode,
				phone: data.customer.phone,
				email: data.customer.email,
				address: data.customer.address,
			},
			item_id: data.itemId,
			quantity: data.quantity,
			customer_message: data.customerMessage,
		};
	},
};
