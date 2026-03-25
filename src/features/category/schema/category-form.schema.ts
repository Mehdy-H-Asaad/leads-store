import { z } from "zod";

export const categoryFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
});

export const createCategoryFormSchema = categoryFormSchema;
export const updateCategoryFormSchema = categoryFormSchema;

export type TCategoryFormValues = z.infer<typeof categoryFormSchema>;
export type TCreateCategoryFormValues = z.infer<typeof createCategoryFormSchema>;
export type TUpdateCategoryFormValues = z.infer<typeof updateCategoryFormSchema>;
