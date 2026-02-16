import { z } from "zod";

export enum PRODUCT_STATUS {
	IN_STOCK = "in_stock",
	OUT_OF_STOCK = "out_of_stock",
	LOW_STOCK = "low_stock",
}

export const ProductSchema = z.object({
	_id: z.string(),
	name: z.string().min(1, "Name is required"),
	description: z
		.string()
		.min(1, "Description is required")
		.max(500, "Description must be less than 500 characters"),
	price: z.number().min(1, "Price is required"),
	cost: z.number().optional(),
	featuredImg: z.string().min(1, "Featured image is required"),
	impressions: z.number().optional(),
	leads: z.number().optional(),
	productGallery: z
		.array(
			z.object({
				fileUrl: z.string().min(1, "Image is required"),
				fileKey: z.string().min(1, "File key is required"),
			})
		)
		.min(1, "Product gallery is required"),
	category: z.string().min(1, "Category is required"),
	tags: z.array(z.string()).optional(),
	status: z.enum(PRODUCT_STATUS),
	visibility: z.boolean(),
	slug: z.string().min(1, "Slug is required"),
	attributes: z.array(
		z.object({
			name: z.string().min(1, "Name is required"),
			value: z.string().min(1, "Value is required"),
		})
	),
	createdAt: z.date().or(z.string()),
	updatedAt: z.date().or(z.string()),
});

export const CreateProductSchema = ProductSchema.omit({
	_id: true,
	slug: true,
	impressions: true,
	leads: true,
	createdAt: true,
	updatedAt: true,
});

export const UpdateProductSchema = ProductSchema.omit({
	_id: true,
	slug: true,
	impressions: true,
	leads: true,
	createdAt: true,
	updatedAt: true,
});

export type TProductDTO = z.infer<typeof ProductSchema>;
export type TCreateProductDTO = z.infer<typeof CreateProductSchema>;
export type TUpdateProductDTO = z.infer<typeof UpdateProductSchema>;
