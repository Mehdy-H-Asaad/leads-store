import z from "zod";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import {
	itemGalleryItemSchema,
	itemAttributeSchema,
} from "@/shared/contracts/item/item.contract";
import { FileSchema } from "@/shared/schema/file.schema";
import { categoryRefContractSchema } from "@/shared/contracts/category/category.contract";

export const itemModel = z.object({
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
	isVisible: z.boolean(),
	slug: z.string(),
	attributes: z.array(itemAttributeSchema).optional(),
	type: z.enum(ITEM_TYPE),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type TItem = z.infer<typeof itemModel>;
