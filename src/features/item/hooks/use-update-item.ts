import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { TItem } from "@/entities/item/model/item.model";
import { itemService } from "@/entities/item/api/item.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TUpdateItemFormValues,
	updateItemFormSchema,
} from "../schema/item-form.schema";
import { useEffect } from "react";
import { ITEM_KEYS } from "@/entities/item/api/item.keys";
import { itemFormMapper } from "../lib/item-form.mapper";

export const useUpdateItem = ({
	item,
	onSuccess,
}: {
	item?: TItem;
	onSuccess?: () => void;
}) => {
	const { mutate, isPending } = useApiMutation<TItem, TUpdateItemFormValues>({
		mutationFn: data =>
			itemService.updateItem(item!.id, itemFormMapper.toUpdateDTO(data)),
		successMsg: "Item updated successfully",
		invalidatedKeys: item
			? [ITEM_KEYS.DETAIL(item.id), ITEM_KEYS.LIST()]
			: [ITEM_KEYS.LIST()],
		invalidateExact: false,
		onSuccess: () => {
			onSuccess?.();
		},
	});

	const UpdateItemForm = useForm<TUpdateItemFormValues>({
		resolver: zodResolver(updateItemFormSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			cost: 0,
			thumbnail: undefined,
			images: [],
			category: "",
			tags: [],
			status: undefined,
			isVisible: false,
			attributes: [],
			type: undefined,
		},
	});

	const onUpdateItem = (values: TUpdateItemFormValues) => {
		mutate(values);
	};

	useEffect(() => {
		if (item) {
			UpdateItemForm.reset(itemFormMapper.fromModelToFormValues(item));
		}
	}, [item]);

	return {
		UpdateItemForm,
		onUpdateItem,
		isUpdatingItem: isPending,
	};
};
