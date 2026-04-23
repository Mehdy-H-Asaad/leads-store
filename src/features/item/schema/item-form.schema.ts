import { z } from "zod";
import { ITEM_STATUS } from "@/shared/contracts/item/item.contract";
import {
	itemGalleryItemSchema,
	itemAttributeSchema,
} from "@/shared/contracts/item/item.contract";
import { ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import { FileSchema } from "@/shared/schema/file.schema";
import { categoryRefContractSchema } from "@/shared/contracts/category/category.contract";

export const itemFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z
		.string()
		.max(250, "Description must be less than 250 characters")
		.nullish(),
	price: z
		.number({ error: "Price is required" })
		.min(0.01, "Price must be greater than 0"),
	cost: z.number().nullish(),
	thumbnail: FileSchema.nullable(),
	images: z.array(itemGalleryItemSchema),
	categories: z.array(categoryRefContractSchema).optional(),
	tags: z.array(z.string()).optional(),
	status: z.enum(ITEM_STATUS),
	isVisible: z.boolean(),
	attributes: z.array(itemAttributeSchema).optional(),
	type: z.enum(ITEM_TYPE, { error: "Type is required" }),
});

export const createItemFormSchema = itemFormSchema;

export const updateItemFormSchema = itemFormSchema;

export type TItemFormValues = z.infer<typeof itemFormSchema>;
export type TCreateItemFormValues = z.infer<typeof createItemFormSchema>;
export type TUpdateItemFormValues = z.infer<typeof updateItemFormSchema>;
