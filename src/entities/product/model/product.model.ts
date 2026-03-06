import z from "zod";
import { PRODUCT_STATUS } from "@/contracts/product/product.contract";
import {
	productGalleryItemSchema,
	productAttributeSchema,
} from "@/contracts/product/product.contract";

export const productModel = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	price: z.number(),
	cost: z.number().nullable(),
	featuredImg: z.string().nullable(),
	impressions: z.number().nullable(),
	leads: z.number(),
	productGallery: z.array(productGalleryItemSchema).nullable(),
	category: z.string(),
	tags: z.array(z.string()).nullable(),
	status: z.enum(PRODUCT_STATUS),
	visibility: z.boolean(),
	slug: z.string(),
	attributes: z.array(productAttributeSchema).nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type TProduct = z.infer<typeof productModel>;
