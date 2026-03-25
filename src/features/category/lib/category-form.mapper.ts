import type {
	TCreateCategoryDTO,
	TUpdateCategoryDTO,
} from "@/entities/category/api/category.dto";
import type { TCategory } from "@/entities/category/model/category.model";
import type {
	TCategoryFormValues,
	TCreateCategoryFormValues,
	TUpdateCategoryFormValues,
} from "../schema/category-form.schema";

export const categoryFormMapper = {
	fromModelToFormValues(category: TCategory): TCategoryFormValues {
		return {
			name: category.name,
		};
	},

	toCreateDTO({ name }: TCreateCategoryFormValues): TCreateCategoryDTO {
		return { name };
	},

	toUpdateDTO({ name }: TUpdateCategoryFormValues): TUpdateCategoryDTO {
		return { name };
	},
};
