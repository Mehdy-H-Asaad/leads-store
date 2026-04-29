import type { TStore } from "@/entities/store/model/store.model";
import type { TUpdateStoreDTO } from "@/entities/store/api/store.dto";
import type { TStoreFormValues } from "../schema/store-form.schema";
import { TCreateStorefrontOrderDTO } from "@/entities/order/api/order.dto";
import { TStoreFrontOrderFormValues } from "../schema/store-front-order.schema";

export const storeFormMapper = {
	fromModelToFormValues(store: TStore): TStoreFormValues {
		return {
			templateId: store.templateId,
			config: {
				layout: store.config.layout,
				buttonVariant: store.config.buttonVariant,
				buttonShape: store.config.buttonShape,
				theme: {
					primary: store.config.theme.primary,
					backgroundType: store.config.theme.backgroundType,
					background: store.config.theme.background,
					backgroundImage: store.config.theme.backgroundImage ?? null,
					text: store.config.theme.text,
					font: store.config.theme.font,
				},
				profile: store.config.profile,
			},
			links: store.links,
			logo: store.logo,
		};
	},

	toUpdateDTO(values: TStoreFormValues): Partial<TUpdateStoreDTO> {
		return {
			template_id: values.templateId,
			config: {
				layout: values.config.layout,
				button_variant: values.config.buttonVariant,
				button_shape: values.config.buttonShape,
				theme: {
					primary: values.config.theme.primary,
					background_type: values.config.theme.backgroundType,
					background: values.config.theme.background,
					background_image: values.config.theme.backgroundImage || null,
					text: values.config.theme.text,
					font: values.config.theme.font,
				},
				profile: values.config.profile,
			},
			links: values.links,
			logo: values.logo,
		};
	},

	toCreateStoreFrontDTO(
		data: TStoreFrontOrderFormValues
	): TCreateStorefrontOrderDTO {
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
