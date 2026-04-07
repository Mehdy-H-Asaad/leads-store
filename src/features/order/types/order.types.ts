import {
	ORDER_STATUS,
	DELIVERY_STATUS,
} from "@/shared/contracts/order/order.contract";

export type TOrderFilters = {
	status?: ORDER_STATUS;
	customer_id?: string;
	item_id?: string;
	delivery_status?: DELIVERY_STATUS;
};
