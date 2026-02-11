import { LEAD_STATUS } from "../schema/lead.schema";

export type TLeadFilters = {
	status?: LEAD_STATUS;
	source?: string;
	name?: string;
};
