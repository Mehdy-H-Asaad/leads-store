import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { categoryService } from "@/entities/category/api/category.service";
import { CATEGORY_KEYS } from "@/entities/category/api/category.keys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TCreateCategoryFormValues,
	createCategoryFormSchema,
} from "../schema/category-form.schema";
import { categoryFormMapper } from "../lib/category-form.mapper";
import { TCategory } from "@/entities/category/model/category.model";

export const useCreateCategory = ({
	onSuccess,
}: { onSuccess?: () => void } = {}) => {
	const { mutate, isPending } = useApiMutation<
		TCategory,
		TCreateCategoryFormValues
	>({
		mutationFn: data =>
			categoryService.createCategory(categoryFormMapper.toCreateDTO(data)),
		successMsg: "Category created successfully",
		invalidatedKeys: [CATEGORY_KEYS.LISTS()],
		onSuccess: () => {
			CreateCategoryForm.reset();
			onSuccess?.();
		},
	});

	const CreateCategoryForm = useForm<TCreateCategoryFormValues>({
		resolver: zodResolver(createCategoryFormSchema),
		defaultValues: {
			name: "",
		},
	});

	const onCreateCategory = (data: TCreateCategoryFormValues) => {
		mutate(data);
	};

	return {
		CreateCategoryForm,
		onCreateCategory,
		isCreatingCategory: isPending,
	};
};
