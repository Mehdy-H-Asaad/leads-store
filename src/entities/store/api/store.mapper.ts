import type { TStoreDTO } from "./store.dto";
import type { TStore } from "../model/store.model";
import {
	LAYOUT,
	BUTTON_VARIANT,
	BUTTON_SHAPE,
	BACKGROUND_TYPE,
	FONT,
} from "@/shared/contracts/store/store.contract";

export const storeMapper = {
	fromDtoToModel(dto: TStoreDTO) {
		return {
			id: dto.id ?? "",
			templateId: dto.template_id as TStore["templateId"],
			storeURL: dto.store_url,
			logo: dto.logo,
			currency: dto.currency,
			qrCode: dto.qr_code,
			config: {
				layout: dto.config.layout as LAYOUT,
				buttonVariant: dto.config.button_variant as BUTTON_VARIANT,
				buttonShape: dto.config.button_shape as BUTTON_SHAPE,
				theme: {
					primary: dto.config.theme.primary,
					backgroundType: dto.config.theme.background_type as BACKGROUND_TYPE,
					background: dto.config.theme.background,
					backgroundImage: dto.config.theme.background_image,
					text: dto.config.theme.text,
					font: dto.config.theme.font as FONT,
				},
				profile: {
					title: dto.config.profile.title,
					bio: dto.config.profile.bio,
				},
			},

			links: dto.links,
			// createdAt: dto.created_at,
			// updatedAt: dto.updated_at,
		} satisfies TStore;
	},
};
