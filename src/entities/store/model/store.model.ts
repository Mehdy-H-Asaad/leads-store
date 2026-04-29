import { z } from "zod";
import {
	TEMPLATE_ID_VALUES,
	LAYOUT_VALUES,
	BUTTON_VARIANT_VALUES,
	BUTTON_SHAPE_VALUES,
	BACKGROUND_TYPE_VALUES,
	FONT_VALUES,
} from "@/shared/contracts/store/store.contract";
import { FileSchema } from "@/shared/schema/file.schema";

export const storeLinkModel = z.object({
	name: z.string(),
	url: z.string(),
});

export const storeThemeModel = z.object({
	primary: z.string(),
	backgroundType: z.enum(BACKGROUND_TYPE_VALUES),
	background: z.string(),
	backgroundImage: FileSchema.nullable(),
	text: z.string(),
	font: z.enum(FONT_VALUES),
});

export const storeProfileModel = z.object({
	title: z.string(),
	bio: z.string().optional(),
});

export const storeConfigModel = z.object({
	layout: z.enum(LAYOUT_VALUES),
	buttonVariant: z.enum(BUTTON_VARIANT_VALUES),
	buttonShape: z.enum(BUTTON_SHAPE_VALUES),
	theme: storeThemeModel,
	profile: storeProfileModel,
});

export const storeModel = z.object({
	id: z.string(),
	templateId: z.enum(TEMPLATE_ID_VALUES),
	currency: z.string(),
	storeURL: z.string(),
	logo: FileSchema.nullable(),
	qrCode: FileSchema,
	config: storeConfigModel,
	links: z.array(storeLinkModel),
	// createdAt: z.date(),
	// updatedAt: z.date(),
});

export type TStore = z.infer<typeof storeModel>;
export type TStoreConfig = z.infer<typeof storeConfigModel>;
export type TStoreTheme = z.infer<typeof storeThemeModel>;
export type TStoreProfile = z.infer<typeof storeProfileModel>;
