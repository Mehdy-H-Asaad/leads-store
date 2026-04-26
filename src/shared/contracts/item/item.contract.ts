import z from "zod";
import { FileSchema } from "../../schema/file.schema";

export enum ITEM_STATUS {
	IN_STOCK = "in_stock",
	OUT_OF_STOCK = "out_of_stock",
	LOW_STOCK = "low_stock",
}

export enum ITEM_TYPE {
	PRODUCT = "product",
	SERVICE = "service",
}
export const itemGalleryItemSchema = FileSchema;

export const itemAttributeSchema = z.object({
	name: z.string(),
	value: z.string(),
});

export const itemContractRefSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	price: z.number(),
	cost: z.number().nullable(),
	featuredImg: z.string().nullable(),
	impressions: z.number().nullable(),
	itemGallery: z.array(itemGalleryItemSchema).nullable(),
	category: z.string(),
	tags: z.array(z.string()).nullable(),
	status: z.enum(ITEM_STATUS),
	isVisible: z.boolean(),
	slug: z.string(),
	quantity: z.number(),
	attributes: z.array(itemAttributeSchema).nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
