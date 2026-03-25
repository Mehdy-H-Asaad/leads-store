import type { TCategoryDTO } from "./category.dto";
import type { TCategory } from "../model/category.model";

export const categoryMapper = {
	fromDtoToModel(dto: TCategoryDTO): TCategory {
		return {
			id: dto.id,
			name: dto.name,
			createdAt: dto.created_at,
			updatedAt: dto.updated_at,
		};
	},
};
