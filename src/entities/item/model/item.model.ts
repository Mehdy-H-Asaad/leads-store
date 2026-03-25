import z from "zod";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import {
	itemGalleryItemSchema,
	itemAttributeSchema,
} from "@/shared/contracts/item/item.contract";

export const itemModel = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	price: z.number(),
	cost: z.number().optional(),
	thumbnail: z
		.object({
			id: z.string(),
			key: z.string(),
			url: z.string().nullable(),
		})
		.nullish(),
	impressions: z.number().optional(),
	images: z.array(itemGalleryItemSchema).optional(),
	category: z.string().optional(),
	tags: z.array(z.string()).optional(),
	status: z.enum(ITEM_STATUS),
	visibility: z.boolean(),
	slug: z.string(),
	attributes: z.array(itemAttributeSchema).optional(),
	type: z.enum(ITEM_TYPE),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type TItem = z.infer<typeof itemModel>;
