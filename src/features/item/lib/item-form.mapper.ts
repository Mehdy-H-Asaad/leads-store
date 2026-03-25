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
			visibility: item.visibility,
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
		visibility,
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
			visibility,
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
		visibility,
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
			visibility,
			attributes,
			type,
		};
	},
};
