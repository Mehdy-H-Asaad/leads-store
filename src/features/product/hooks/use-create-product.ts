import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { productService } from "@/entities/product/api/product.service";
import { PRODUCT_KEYS } from "../../../entities/product/api/product.keys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PRODUCT_STATUS } from "@/shared/contracts/product/product.contract";
import {
	TCreateProductFormValues,
	createProductFormSchema,
} from "../schema/product-form.schema";
import { productFormMapper } from "../lib/product-form.mapper";
import { TProduct } from "@/entities/product/model/product.model";

export const useCreateProduct = () => {
	const { mutate, isPending } = useApiMutation<
		TProduct,
		TCreateProductFormValues
	>({
		mutationFn: data =>
			productService.createProduct(productFormMapper.toCreateDTO(data)),
		successMsg: "Product created successfully",
		invalidatedKeys: [PRODUCT_KEYS.ALL],
		invalidateExact: true,
		onSuccess: () => {
			CreateProductForm.reset();
		},
	});
	const CreateProductForm = useForm<TCreateProductFormValues>({
		resolver: zodResolver(createProductFormSchema),
		defaultValues: {
			name: "",
			description: "",
			price: undefined,
			featuredImg: "",
			productGallery: [],
			category: "",
			tags: [],
			status: PRODUCT_STATUS.IN_STOCK,
			visibility: true,
			attributes: [],
			cost: undefined,
		},
	});

	const onCreateProduct = (data: TCreateProductFormValues) => {
		mutate(data);
	};

	return {
		CreateProductForm,
		onCreateProduct,
		isCreatingProduct: isPending,
	};
};
