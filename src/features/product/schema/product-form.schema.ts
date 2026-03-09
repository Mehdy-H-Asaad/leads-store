import { z } from "zod";
import { PRODUCT_STATUS } from "@/shared/contracts/product/product.contract";
import {
	productGalleryItemSchema,
	productAttributeSchema,
} from "@/shared/contracts/product/product.contract";

export const productFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z
		.string()
		.max(500, "Description must be less than 500 characters")
		.nullable(),
	price: z.number().min(0.01, "Price must be greater than 0"),
	cost: z.number().nullable(),
	featuredImg: z.string().nullable(),
	productGallery: z.array(productGalleryItemSchema).nullable(),
	category: z.string().min(1, "Category is required"),
	tags: z.array(z.string()).nullable(),
	status: z.enum(PRODUCT_STATUS),
	visibility: z.boolean(),
	attributes: z.array(productAttributeSchema).nullable(),
});

export const createProductFormSchema = productFormSchema;

export const updateProductFormSchema = productFormSchema;

export type TProductFormValues = z.infer<typeof productFormSchema>;
export type TCreateProductFormValues = z.infer<typeof createProductFormSchema>;
export type TUpdateProductFormValues = z.infer<typeof updateProductFormSchema>;
