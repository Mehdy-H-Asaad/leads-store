import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { TCategory } from "@/entities/category/model/category.model";
import { categoryService } from "@/entities/category/api/category.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TUpdateCategoryFormValues,
	updateCategoryFormSchema,
} from "../schema/category-form.schema";
import { useEffect } from "react";
import { CATEGORY_KEYS } from "@/entities/category/api/category.keys";
import { categoryFormMapper } from "../lib/category-form.mapper";

export const useUpdateCategory = ({
	category,
	onSuccess,
}: {
	category?: TCategory;
	onSuccess?: () => void;
}) => {
	const { mutate, isPending } = useApiMutation<
		TCategory,
		TUpdateCategoryFormValues
	>({
		mutationFn: data =>
			categoryService.updateCategory(
				category!.id,
				categoryFormMapper.toUpdateDTO(data)
			),
		successMsg: "Category updated successfully",
		invalidatedKeys: category
			? [CATEGORY_KEYS.DETAIL(category.id), CATEGORY_KEYS.LISTS()]
			: [CATEGORY_KEYS.LISTS()],
		onSuccess: () => {
			onSuccess?.();
		},
	});

	const UpdateCategoryForm = useForm<TUpdateCategoryFormValues>({
		resolver: zodResolver(updateCategoryFormSchema),
		defaultValues: {
			name: "",
		},
	});

	const onUpdateCategory = (values: TUpdateCategoryFormValues) => {
		mutate(values);
	};

	useEffect(() => {
		if (category) {
			UpdateCategoryForm.reset(
				categoryFormMapper.fromModelToFormValues(category)
			);
		}
	}, [category]);

	return {
		UpdateCategoryForm,
		onUpdateCategory,
		isUpdatingCategory: isPending,
	};
};
