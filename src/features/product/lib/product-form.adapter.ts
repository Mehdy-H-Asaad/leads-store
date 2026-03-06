import type {
	TCreateProductDTO,
	TUpdateProductDTO,
} from "@/entities/product/api/product.dto";
import type {
	TCreateProductFormValues,
	TUpdateProductFormValues,
} from "../schema/product-form.schema";

export const productFormAdapter = {
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
			featuredImg,
			productGallery,
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
			featuredImg,
			productGallery,
			category,
			tags,
			status,
			visibility,
			attributes,
		};
	},
};
