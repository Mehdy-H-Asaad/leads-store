import { ITEM_KEYS } from "@/entities/item/api/item.keys";
import { itemService } from "@/entities/item/api/item.service";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";

export const useDeleteItem = () => {
	const { mutate, isPending } = useApiMutation({
		mutationFn: (id: string) => itemService.deleteItem(id),
		successMsg: "Item deleted successfully",
		invalidatedKeys: [ITEM_KEYS.LISTS()],
		invalidateExact: true,
	});

	const onDeleteItem = (id: string) => {
		mutate(id);
	};

	return { onDeleteItem, isDeletingItem: isPending };
};
