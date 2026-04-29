import { FileSchema } from "@/shared/schema/file.schema";
import { z } from "zod";

export const storeLinkDtoSchema = z.object({
	url: z.string(),
	name: z.string(),
});

export const storeThemeDtoSchema = z.object({
	primary: z.string(),
	background_type: z.string(),
	background: z.string(),
	background_image: FileSchema.nullable(),
	text: z.string(),
	font: z.string(),
});

export const storeProfileDtoSchema = z.object({
	title: z.string(),
	bio: z.string().optional(),
});

export const storeConfigDtoSchema = z.object({
	layout: z.string(),
	button_variant: z.string(),
	button_shape: z.string(),
	theme: storeThemeDtoSchema,
	profile: storeProfileDtoSchema,
});

export const storeSchemaDto = z.object({
	id: z.string().optional(),
	template_id: z.string(),
	currency: z.string(),
	store_url: z.string(),
	logo: FileSchema.nullable(),
	qr_code: FileSchema,
	config: storeConfigDtoSchema,
	links: z.array(storeLinkDtoSchema),
	// created_at: z.date(),
	// updated_at: z.date(),
});

export const updateStoreSchemaDto = storeSchemaDto.omit({
	id: true,
	// created_at: true,
	// updated_at: true,
	qr_code: true,
	store_url: true,
});

export type TStoreDTO = z.infer<typeof storeSchemaDto>;
export type TUpdateStoreDTO = z.infer<typeof updateStoreSchemaDto>;
