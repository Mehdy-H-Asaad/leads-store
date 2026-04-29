import { z } from "zod";
import {
	LAYOUT_VALUES,
	BUTTON_VARIANT_VALUES,
	BUTTON_SHAPE_VALUES,
	BACKGROUND_TYPE_VALUES,
	FONT_VALUES,
	TEMPLATE_ID_VALUES,
} from "@/shared/contracts/store/store.contract";
import { FileSchema } from "@/shared/schema/file.schema";

export const storeThemeFormSchema = z.object({
	primary: z.string().min(1, "Primary color is required"),
	backgroundType: z.enum(BACKGROUND_TYPE_VALUES),
	background: z.string().min(1, "Background color is required"),
	backgroundImage: FileSchema.nullable(),
	text: z.string().min(1, "Text color is required"),
	font: z.enum(FONT_VALUES),
});

export const storeProfileFormSchema = z.object({
	title: z.string().min(1, "Display name is required"),
	bio: z
		.string()
		.max(200, "Bio must be less than 200 characters")
		.optional()
		.or(z.literal("")),
});

export const storeFormSchema = z.object({
	templateId: z.enum(TEMPLATE_ID_VALUES),
	logo: FileSchema.nullable(),
	config: z.object({
		layout: z.enum(LAYOUT_VALUES),
		buttonVariant: z.enum(BUTTON_VARIANT_VALUES),
		buttonShape: z.enum(BUTTON_SHAPE_VALUES),
		theme: storeThemeFormSchema,
		profile: storeProfileFormSchema,
	}),
	links: z
		.array(
			z.object({
				name: z.string().min(1, "Platform name is required"),
				url: z.url("Please enter a valid URL"),
			})
		)
		.optional(),
});

export type TStoreFormValues = z.infer<typeof storeFormSchema>;

export type TStoreThemeFormValues = z.infer<typeof storeThemeFormSchema>;
export type TStoreProfileFormValues = z.infer<typeof storeProfileFormSchema>;
