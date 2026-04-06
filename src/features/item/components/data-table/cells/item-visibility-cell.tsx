"use client";

import { Switch } from "@/shared/components/ui/switch";
import { TItem } from "@/entities/item/model/item.model";
import { useToggleItemVisibility } from "../../../hooks/use-toggle-item-visibility";

type TItemVisibilityCellProps = {
	item: TItem;
};

export const ItemVisibilityCell = ({ item }: TItemVisibilityCellProps) => {
	const { toggleVisibility, isTogglingVisibility } = useToggleItemVisibility(
		item.id
	);

	return (
		<Switch
			checked={item.isVisible}
			disabled={isTogglingVisibility}
			onCheckedChange={toggleVisibility}
		/>
	);
};
