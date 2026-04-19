import { z } from "zod";
import {
	TEMPLATE_ID_VALUES,
	LAYOUT_VALUES,
	BUTTON_VARIANT_VALUES,
	BUTTON_SHAPE_VALUES,
	BACKGROUND_TYPE_VALUES,
	FONT_VALUES,
} from "@/shared/contracts/customization/customization.contract";
import { FileSchema } from "@/shared/schema/file.schema";

export const customizationLinkModel = z.object({
	name: z.string(),
	url: z.string(),
});

export const customizationThemeModel = z.object({
	primary: z.string(),
	backgroundType: z.enum(BACKGROUND_TYPE_VALUES),
	background: z.string(),
	backgroundImage: FileSchema.nullable(),
	text: z.string(),
	font: z.enum(FONT_VALUES),
});

export const customizationProfileModel = z.object({
	title: z.string(),
	bio: z.string().optional(),
});

export const customizationConfigModel = z.object({
	layout: z.enum(LAYOUT_VALUES),
	buttonVariant: z.enum(BUTTON_VARIANT_VALUES),
	buttonShape: z.enum(BUTTON_SHAPE_VALUES),
	theme: customizationThemeModel,
	profile: customizationProfileModel,
});

export const customizationModel = z.object({
	id: z.string(),
	templateId: z.enum(TEMPLATE_ID_VALUES),
	storeURL: z.string(),
	logo: FileSchema.nullable(),
	qrCode: FileSchema,
	config: customizationConfigModel,
	links: z.array(customizationLinkModel),
	// createdAt: z.date(),
	// updatedAt: z.date(),
});

export type TCustomization = z.infer<typeof customizationModel>;
export type TCustomizationConfig = z.infer<typeof customizationConfigModel>;
export type TCustomizationTheme = z.infer<typeof customizationThemeModel>;
export type TCustomizationProfile = z.infer<typeof customizationProfileModel>;
