import type {
	TCreateProductDTO,
	TUpdateProductDTO,
} from "@/entities/product/api/product.dto";
import type { TProduct } from "@/entities/product/model/product.model";
import type {
	TCreateProductFormValues,
	TUpdateProductFormValues,
	TProductFormValues,
} from "../schema/product-form.schema";

export const productFormMapper = {
	fromModelToFormValues(product: TProduct): TProductFormValues {
		return {
			name: product.name,
			description: product.description,
			price: product.price,
			cost: product.cost,
			featuredImg: product.featuredImg,
			productGallery: product.productGallery,
			category: product.category,
			tags: product.tags,
			status: product.status,
			visibility: product.visibility,
			attributes: product.attributes,
		};
	},

	toCreateDTO({
		name,
		description,
		price,
		cost,
		featuredImg,
		productGallery,
		category,
		tags,
		status,
		visibility,
		attributes,
	}: TCreateProductFormValues): TCreateProductDTO {
		return {
			name,
			description,
			price,
			cost,
			featured_img: featuredImg,
			product_gallery: productGallery,
			category,
			tags,
			status,
			visibility,
			attributes,
		};
	},

	toUpdateDTO({
		name,
		description,
		price,
		cost,
		featuredImg,
		productGallery,
		category,
		tags,
		status,
		visibility,
		attributes,
	}: TUpdateProductFormValues): TUpdateProductDTO {
		return {
			name,
			description,
			price,
			cost,
			featured_img: featuredImg,
			product_gallery: productGallery,
			category,
			tags,
			status,
			visibility,
			attributes,
		};
	},
};
