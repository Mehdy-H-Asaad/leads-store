import { z } from "zod";

export const categoryModel = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type TCategory = z.infer<typeof categoryModel>;
