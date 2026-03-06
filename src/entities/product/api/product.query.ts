import { useApiQuery } from "@/hooks/use-api-query";
import { PRODUCT_KEYS } from "./product.keys";
import { productService } from "./product.service";

export const useGetProducts = () => {
	const { data, isLoading, error } = useApiQuery({
		queryKey: PRODUCT_KEYS.LISTS(),
		queryFn: () => productService.getProducts(),
	});

	return { products: data?.data ?? [], isGettingProducts: isLoading, error };
};

export const useGetProduct = ({ id }: { id: string }) => {
	const { data, isLoading, error } = useApiQuery({
		queryKey: PRODUCT_KEYS.DETAIL(id),
		queryFn: () => productService.getProduct(id),
		enabled: !!id,
	});

	return { product: data?.data ?? null, isGettingProduct: isLoading, error };
};
