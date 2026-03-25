import { ITEM_STATUS } from "@/shared/contracts/item/item.contract";

export type TItemFilters = {
	status?: ITEM_STATUS;
	visibility?: boolean;
	name?: string;
	category?: string;
	price?: number;
};
