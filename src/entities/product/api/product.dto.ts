import { z } from "zod";
import { PRODUCT_STATUS } from "@/shared/contracts/product/product.contract";
import {
	productGalleryItemSchema,
	productAttributeSchema,
} from "@/shared/contracts/product/product.contract";

export const productSchemaDto = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	price: z.number(),
	cost: z.number().nullable(),
	featured_img: z.string().nullable(),
	impressions: z.number().nullable(),
	leads: z.number(),
	product_gallery: z.array(productGalleryItemSchema).nullable(),
	category: z.string(),
	tags: z.array(z.string()).nullable(),
	status: z.enum(PRODUCT_STATUS),
	visibility: z.boolean(),
	slug: z.string(),
	attributes: z.array(productAttributeSchema).nullable(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const createProductSchemaDto = productSchemaDto.omit({
	_id: true,
	created_at: true,
	updated_at: true,
	impressions: true,
	slug: true,
	leads: true,
});

export const updateProductSchemaDto = productSchemaDto.omit({
	_id: true,
	created_at: true,
	updated_at: true,
	slug: true,
	impressions: true,
	leads: true,
});

export type TProductDTO = z.infer<typeof productSchemaDto>;
export type TCreateProductDTO = z.infer<typeof createProductSchemaDto>;
export type TUpdateProductDTO = z.infer<typeof updateProductSchemaDto>;
