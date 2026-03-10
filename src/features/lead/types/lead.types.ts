import { LEAD_STATUS } from "@/shared/contracts/lead/lead.contract";

export type TLeadFilters = {
	status?: LEAD_STATUS;
	source?: string;
	name?: string;
};
