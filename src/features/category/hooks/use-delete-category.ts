import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { categoryService } from "@/entities/category/api/category.service";
import { CATEGORY_KEYS } from "@/entities/category/api/category.keys";

export const useDeleteCategory = () => {
	const { mutate, isPending } = useApiMutation({
		invalidatedKeys: [CATEGORY_KEYS.LISTS()],
		mutationFn: (id: string) => categoryService.deleteCategory(id),
		successMsg: "Category deleted successfully",
	});

	return { deleteCategory: mutate, isDeletingCategory: isPending };
};
