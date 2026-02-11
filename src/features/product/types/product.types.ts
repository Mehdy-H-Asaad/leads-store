import { PRODUCT_STATUS } from "../schema/product.schema";

export type TProductFilters = {
	status?: PRODUCT_STATUS;
	visibility?: boolean;
	name?: string;
	category?: string;
	price?: number;
};
