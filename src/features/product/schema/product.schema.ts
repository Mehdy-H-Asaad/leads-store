import { z } from "zod";

export enum PRODUCT_STATUS {
	IN_STOCK = "in_stock",
	OUT_OF_STOCK = "out_of_stock",
	LOW_STOCK = "low_stock",
	DISCONTINUED = "discontinued",
}

export const ProductSchema = z.object({
	id: z.number(),
	name: z.string().min(1, "Name is required"),
	description: z.string().min(1, "Description is required"),
	price: z.number().min(1, "Price is required"),
	image: z.string().min(1, "Image is required"),
	category: z.string().min(1, "Category is required"),
	status: z.enum(PRODUCT_STATUS),
	visibility: z.boolean(),
	createdAt: z.date().or(z.string()),
	updatedAt: z.date().or(z.string()),
});

export type TProductDTO = z.infer<typeof ProductSchema>;
