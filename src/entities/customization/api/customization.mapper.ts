import type { TCustomizationDTO } from "./customization.dto";
import type { TCustomization } from "../model/customization.model";
import {
	LAYOUT,
	BUTTON_VARIANT,
	BUTTON_SHAPE,
	BACKGROUND_TYPE,
	FONT,
} from "@/shared/contracts/customization/customization.contract";

export const customizationMapper = {
	fromDtoToModel(dto: TCustomizationDTO) {
		return {
			id: dto.id ?? "",
			templateId: dto.template_id as TCustomization["templateId"],
			storeURL: dto.store_url,
			logo: dto.logo,
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
		} satisfies TCustomization;
	},
};
