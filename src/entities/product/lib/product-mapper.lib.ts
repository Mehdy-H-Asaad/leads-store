import { TProductDTO } from "../api/product.dto";
import { TProduct } from "../model/product.model";

export const productMapper = {
	toModel: (product: TProductDTO) =>
		({
			...product,
		} satisfies TProduct),
};
