import z from "zod";

export enum PRODUCT_STATUS {
	IN_STOCK = "in_stock",
	OUT_OF_STOCK = "out_of_stock",
	LOW_STOCK = "low_stock",
}
export const productGalleryItemSchema = z.object({
	fileUrl: z.string(),
	fileKey: z.string(),
});

export const productAttributeSchema = z.object({
	name: z.string(),
	value: z.string(),
});
export const productContractRefSchema = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	price: z.number(),
	cost: z.number().nullable(),
	featuredImg: z.string().nullable(),
	impressions: z.number().nullable(),
	productGallery: z.array(productGalleryItemSchema).nullable(),
	category: z.string(),
	tags: z.array(z.string()).nullable(),
	status: z.enum(PRODUCT_STATUS),
	visibility: z.boolean(),
	slug: z.string(),
	attributes: z.array(productAttributeSchema).nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
