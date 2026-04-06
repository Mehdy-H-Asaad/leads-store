import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";

export type TItemFilters = {
	name?: string;
	category_id?: string;
	status?: ITEM_STATUS;
	is_visible?: boolean;
	type?: ITEM_TYPE;
};
