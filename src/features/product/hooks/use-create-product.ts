import { useApiMutation } from "@/hooks/use-api-mutation";
import {
	CreateProductSchema,
	PRODUCT_STATUS,
	TCreateProductDTO,
	TProductDTO,
} from "../schema/product.schema";
import { PRODUCT_KEYS } from "../constants/product.keys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateProduct = () => {
	const { mutate, isPending } = useApiMutation<TProductDTO, TCreateProductDTO>({
		endpointURL: "/products",
		method: "post",
		showSuccessToast: true,
		successMsg: "Product created successfully",
		invalidatedKeys: [PRODUCT_KEYS.ALL],
		invalidateExact: true,
		onSuccess: () => {
			CreateProductForm.reset();
		},
	});
	const CreateProductForm = useForm<TCreateProductDTO>({
		resolver: zodResolver(CreateProductSchema),
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

	const onCreateProduct = (data: TCreateProductDTO) => {
		mutate(data);
	};

	return {
		CreateProductForm,
		onCreateProduct,
		isCreatingProduct: isPending,
	};
};
