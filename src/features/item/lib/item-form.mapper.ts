import type {
	TCreateItemDTO,
	TUpdateItemDTO,
} from "@/entities/item/api/item.dto";
import type { TItem } from "@/entities/item/model/item.model";
import type {
	TCreateItemFormValues,
	TUpdateItemFormValues,
} from "../schema/item-form.schema";

export const itemFormMapper = {
	fromModelToUpdateFormValues(item: TItem): TUpdateItemFormValues {
		return {
			name: item.name,
			description: item.description,
			price: item.price,
			cost: item.cost,
			thumbnail: item.thumbnail,
			images: item.images,
			type: item.type,
			categories: item.categories,
			tags: item.tags,
			status: item.status,
			isVisible: item.isVisible,
			attributes: item.attributes,
		};
	},

	toCreateDTO({
		name,
		description,
		price,
		cost,
		thumbnail,
		images,
		categories,
		tags,
		status,
		isVisible,
		attributes,
		type,
	}: TCreateItemFormValues): TCreateItemDTO {
		return {
			name,
			description: description ?? undefined,
			price,
			cost: cost,
			thumbnail,
			images,
			categories: categories?.map(category => category.id) ?? [],
			tags,
			status,
			is_visible: isVisible,
			attributes,
			type,
		};
	},

	toUpdateDTO({
		name,
		description,
		price,
		cost,
		thumbnail,
		images,
		categories,
		tags,
		status,
		isVisible,
		attributes,
		type,
	}: TUpdateItemFormValues): TUpdateItemDTO {
		return {
			name,
			description,
			price,
			cost,
			thumbnail,
			images,
			categories: categories?.map(category => category.id) ?? [],
			tags,
			status,
			is_visible: isVisible,
			attributes,
			type,
		};
	},
};
