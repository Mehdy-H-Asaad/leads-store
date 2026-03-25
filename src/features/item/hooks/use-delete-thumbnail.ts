import { useApiMutation } from "../../../shared/hooks/use-api-mutation";
import { itemService } from "../../../entities/item/api/item.service";
import { ITEM_KEYS } from "@/entities/item/api/item.keys";
export const useDeleteThumbnail = () => {
	const { mutate, isPending } = useApiMutation({
		invalidatedKeys: [ITEM_KEYS.DETAILS()],
		mutationFn: (id: string) => itemService.deleteItemThumbnail(id),
		successMsg: "Thumbnail deleted successfully",
	});

	return { deleteThumbnail: mutate, isDeletingThumbnail: isPending };
};
