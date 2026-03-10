import { TLead } from "../model/lead.model";
import { TLeadDTO } from "./lead.dto";

export const leadMapper = {
	fromDtoToModel: (lead: TLeadDTO) => {
		return {
			_id: lead._id,
			name: lead.name,
			email: lead.email,
			phone: lead.phone,
			source: lead.source,
			status: lead.status,
			budgetFrom: lead.budget_from,
			budgetTo: lead.budget_to,
			note: lead.note,
			priority: lead.priority,
			country: lead.country,
			product: lead.product,
			createdAt: lead.created_at,
			updatedAt: lead.updated_at,
		} satisfies TLead;
	},
};
