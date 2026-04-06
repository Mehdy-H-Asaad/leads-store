import type {
	TCreateItemDTO,
	TUpdateItemDTO,
} from "@/entities/item/api/item.dto";
import type { TItem } from "@/entities/item/model/item.model";
import type {
	TCreateItemFormValues,
	TUpdateItemFormValues,
	TItemFormValues,
} from "../schema/item-form.schema";

export const itemFormMapper = {
	fromModelToFormValues(item: TItem): TItemFormValues {
		return {
			name: item.name,
			description: item.description,
			price: item.price,
			cost: item.cost,
			thumbnail: item.thumbnail ?? undefined,
			images: item.images,
			type: item.type,
			category: item.category,
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
		category,
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
			category,
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
		category,
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
			category,
			tags,
			status,
			is_visible: isVisible,
			attributes,
			type,
		};
	},
};
