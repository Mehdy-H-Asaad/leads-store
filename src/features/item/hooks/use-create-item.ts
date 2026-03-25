import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { itemService } from "@/entities/item/api/item.service";
import { ITEM_KEYS } from "../../../entities/item/api/item.keys";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITEM_STATUS } from "@/shared/contracts/item/item.contract";
import {
	TCreateItemFormValues,
	createItemFormSchema,
} from "../schema/item-form.schema";
import { itemFormMapper } from "../lib/item-form.mapper";
import { TItem } from "@/entities/item/model/item.model";

export const useCreateItem = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
	const { mutate, isPending } = useApiMutation<TItem, TCreateItemFormValues>({
		mutationFn: data =>
			itemService.createItem(itemFormMapper.toCreateDTO(data)),
		successMsg: "Item created successfully",
		invalidatedKeys: [ITEM_KEYS.LIST()],
		invalidateExact: true,
		onSuccess: () => {
			CreateItemForm.reset();
			onSuccess?.();
		},
	});

	const CreateItemForm = useForm<TCreateItemFormValues>({
		resolver: zodResolver(createItemFormSchema),
		defaultValues: {
			name: "",
			description: undefined,
			price: undefined,
			thumbnail: undefined,
			images: [],
			category: "",
			tags: [],
			status: ITEM_STATUS.IN_STOCK,
			visibility: true,
			attributes: [],
			cost: undefined,
			type: undefined,
		},
	});

	const onCreateItem = (data: TCreateItemFormValues) => {
		mutate(data);
	};

	return { CreateItemForm, onCreateItem, isCreatingItem: isPending };
};
