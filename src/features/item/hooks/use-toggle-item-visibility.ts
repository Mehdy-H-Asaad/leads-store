import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { TItem } from "@/entities/item/model/item.model";
import { itemService } from "@/entities/item/api/item.service";
import { ITEM_KEYS } from "@/entities/item/api/item.keys";

export const useToggleItemVisibility = (itemId: string) => {
	const { mutate, isPending } = useApiMutation<TItem, boolean>({
		mutationFn: isVisible => itemService.updateItem(itemId, { is_visible: isVisible }),
		successMsg: "Visibility updated",
		invalidatedKeys: [ITEM_KEYS.DETAIL(itemId), ITEM_KEYS.LIST()],
		invalidateExact: false,
	});

	return {
		toggleVisibility: mutate,
		isTogglingVisibility: isPending,
	};
};
