import type { TProductDTO } from "./product.dto";
import type { TProduct } from "../model/product.model";

export const productMapper = {
	fromDtoToModel(dto: TProductDTO) {
		return {
			_id: dto._id,
			name: dto.name,
			description: dto.description,
			price: dto.price,
			cost: dto.cost,
			featuredImg: dto.featured_img,
			impressions: dto.impressions,
			leads: dto.leads,
			productGallery: dto.product_gallery,
			category: dto.category,
			tags: dto.tags,
			status: dto.status,
			visibility: dto.visibility,
			slug: dto.slug,
			attributes: dto.attributes,
			createdAt: dto.created_at,
			updatedAt: dto.updated_at,
		} satisfies TProduct;
	},
};
