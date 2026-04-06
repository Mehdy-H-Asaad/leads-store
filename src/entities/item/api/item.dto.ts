import { z } from "zod";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import {
	itemGalleryItemSchema,
	itemAttributeSchema,
} from "@/shared/contracts/item/item.contract";
import { FileSchema } from "@/shared/schema/file.schema";

export const itemSchemaDto = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	price: z.number(),
	cost: z.number().optional(),
	thumbnail: FileSchema,
	impressions: z.number().optional(),
	images: z.array(itemGalleryItemSchema).optional(),
	category: z.string().optional(),
	tags: z.array(z.string()).optional(),
	status: z.enum(ITEM_STATUS),
	is_visible: z.boolean(),
	slug: z.string(),
	attributes: z.array(itemAttributeSchema).optional(),
	type: z.enum(ITEM_TYPE),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const createItemSchemaDto = itemSchemaDto.omit({
	id: true,
	created_at: true,
	updated_at: true,
	impressions: true,
	slug: true,
});

export const updateItemSchemaDto = itemSchemaDto.omit({
	id: true,
	created_at: true,
	updated_at: true,
	slug: true,
	impressions: true,
});

export type TItemDTO = z.infer<typeof itemSchemaDto>;
export type TCreateItemDTO = z.infer<typeof createItemSchemaDto>;
export type TUpdateItemDTO = z.infer<typeof updateItemSchemaDto>;
