import { z } from "zod";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import {
	itemGalleryItemSchema,
	itemAttributeSchema,
} from "@/shared/contracts/item/item.contract";
import { FileSchema } from "@/shared/schema/file.schema";
import { categoryRefContractSchema } from "@/shared/contracts/category/category.contract";

export const itemSchemaDto = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullish(),
	price: z.number(),
	cost: z.number().nullish(),
	thumbnail: FileSchema.nullable(),
	impressions: z.number().optional(),
	images: z.array(itemGalleryItemSchema),
	categories: z.array(categoryRefContractSchema).optional(),
	tags: z.array(z.string()).optional(),
	status: z.enum(ITEM_STATUS),
	is_visible: z.boolean(),
	slug: z.string(),
	attributes: z.array(itemAttributeSchema).optional(),
	type: z.enum(ITEM_TYPE),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const createItemSchemaDto = itemSchemaDto
	.omit({
		id: true,
		created_at: true,
		updated_at: true,
		impressions: true,
		slug: true,
		categories: true,
	})
	.extend({
		categories: z.array(z.string()).optional(),
	});

export const updateItemSchemaDto = itemSchemaDto
	.omit({
		id: true,
		created_at: true,
		updated_at: true,
		slug: true,
		impressions: true,
		categories: true,
	})
	.extend({
		categories: z.array(z.string()).optional(),
	});

export type TItemDTO = z.infer<typeof itemSchemaDto>;
export type TCreateItemDTO = z.infer<typeof createItemSchemaDto>;
export type TUpdateItemDTO = z.infer<typeof updateItemSchemaDto>;
