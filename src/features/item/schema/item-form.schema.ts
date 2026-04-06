import { z } from "zod";
import { ITEM_STATUS } from "@/shared/contracts/item/item.contract";
import {
	itemGalleryItemSchema,
	itemAttributeSchema,
} from "@/shared/contracts/item/item.contract";
import { ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import { FileSchema } from "@/shared/schema/file.schema";

export const itemFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z
		.string()
		.max(500, "Description must be less than 500 characters")
		.optional(),
	price: z.number().min(0.01, "Price must be greater than 0"),
	cost: z.number().optional(),
	thumbnail: FileSchema.optional(),
	images: z.array(itemGalleryItemSchema).optional(),
	category: z.string().optional(),
	tags: z.array(z.string()).optional(),
	status: z.enum(ITEM_STATUS),
	isVisible: z.boolean(),
	attributes: z.array(itemAttributeSchema).optional(),
	type: z.enum(ITEM_TYPE),
});

export const createItemFormSchema = itemFormSchema;

export const updateItemFormSchema = itemFormSchema;

export type TItemFormValues = z.infer<typeof itemFormSchema>;
export type TCreateItemFormValues = z.infer<typeof createItemFormSchema>;
export type TUpdateItemFormValues = z.infer<typeof updateItemFormSchema>;
