import type { TCustomization } from "@/entities/customization/model/customization.model";
import type { TUpdateCustomizationDTO } from "@/entities/customization/api/customization.dto";
import type { TCustomizationFormValues } from "../schema/customization-form.schema";

export const customizationFormMapper = {
	fromModelToFormValues(
		customization: TCustomization
	): TCustomizationFormValues {
		return {
			templateId: customization.templateId,
			config: {
				layout: customization.config.layout,
				buttonVariant: customization.config.buttonVariant,
				buttonShape: customization.config.buttonShape,
				theme: {
					primary: customization.config.theme.primary,
					backgroundType: customization.config.theme.backgroundType,
					background: customization.config.theme.background,
					backgroundImage: customization.config.theme.backgroundImage ?? null,
					text: customization.config.theme.text,
					font: customization.config.theme.font,
				},
				profile: customization.config.profile,
			},
			links: customization.links,
			logo: customization.logo,
		};
	},

	toUpdateDTO(
		values: TCustomizationFormValues
	): Partial<TUpdateCustomizationDTO> {
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
};
