import z from "zod";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import {
	itemGalleryItemSchema,
	itemAttributeSchema,
} from "@/shared/contracts/item/item.contract";
import { FileSchema } from "@/shared/schema/file.schema";

export const itemModel = z.object({
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
	isVisible: z.boolean(),
	slug: z.string(),
	attributes: z.array(itemAttributeSchema).optional(),
	type: z.enum(ITEM_TYPE),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type TItem = z.infer<typeof itemModel>;
