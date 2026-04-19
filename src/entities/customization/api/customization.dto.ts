import { FileSchema } from "@/shared/schema/file.schema";
import { z } from "zod";

export const customizationLinkDtoSchema = z.object({
	url: z.string(),
	name: z.string(),
});

export const customizationThemeDtoSchema = z.object({
	primary: z.string(),
	background_type: z.string(),
	background: z.string(),
	background_image: FileSchema.nullable(),
	text: z.string(),
	font: z.string(),
});

export const customizationProfileDtoSchema = z.object({
	title: z.string(),
	bio: z.string().optional(),
});

export const customizationConfigDtoSchema = z.object({
	layout: z.string(),
	button_variant: z.string(),
	button_shape: z.string(),
	theme: customizationThemeDtoSchema,
	profile: customizationProfileDtoSchema,
});

export const customizationSchemaDto = z.object({
	id: z.string(),
	template_id: z.string(),
	store_url: z.string(),
	logo: FileSchema.nullable(),
	qr_code: FileSchema,
	config: customizationConfigDtoSchema,
	links: z.array(customizationLinkDtoSchema),
	// created_at: z.date(),
	// updated_at: z.date(),
});

export const updateCustomizationSchemaDto = customizationSchemaDto.omit({
	id: true,
	// created_at: true,
	// updated_at: true,
	qr_code: true,
	store_url: true,
});

export type TCustomizationDTO = z.infer<typeof customizationSchemaDto>;
export type TUpdateCustomizationDTO = z.infer<
	typeof updateCustomizationSchemaDto
>;
