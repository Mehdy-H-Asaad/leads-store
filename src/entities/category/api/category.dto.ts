import { z } from "zod";

export const categorySchemaDto = z.object({
	id: z.string(),
	name: z.string(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const createCategorySchemaDto = categorySchemaDto.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export const updateCategorySchemaDto = categorySchemaDto.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export type TCategoryDTO = z.infer<typeof categorySchemaDto>;
export type TCreateCategoryDTO = z.infer<typeof createCategorySchemaDto>;
export type TUpdateCategoryDTO = z.infer<typeof updateCategorySchemaDto>;
