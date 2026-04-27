import type { TItemDTO } from "./item.dto";
import type { TItem } from "../model/item.model";
import type { TStoreItemDTO } from "./item.dto";
import type { TStoreItem } from "../model/item.model";

export const itemMapper = {
	fromDtoToModel(dto: TItemDTO) {
		return {
			id: dto.id,
			name: dto.name,
			description: dto.description,
			price: dto.price,
			cost: dto.cost,
			thumbnail: dto.thumbnail,
			impressions: dto.impressions,
			images: dto.images,
			categories: dto.categories,
			tags: dto.tags,
			status: dto.status,
			isVisible: dto.is_visible,
			slug: dto.slug,
			attributes: dto.attributes,
			type: dto.type,
			createdAt: dto.created_at,
			updatedAt: dto.updated_at,
		} satisfies TItem;
	},

	fromStoreDtoToModel(dto: TStoreItemDTO) {
		return {
			id: dto.id,
			name: dto.name,
			description: dto.description,
			price: dto.price,
			thumbnail: dto.thumbnail,
			images: dto.images,
			categories: dto.categories,
			tags: dto.tags,
			status: dto.status,
			slug: dto.slug,
			type: dto.type,
			attributes: dto.attributes,
		} satisfies TStoreItem;
	},
};
