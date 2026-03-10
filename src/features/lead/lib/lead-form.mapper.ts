import {
	TCreateLeadDTO,
	TLeadDTO,
	TUpdateLeadDTO,
} from "@/entities/lead/api/lead.dto";
import {
	TCreateLeadSchema,
	TLeadSchema,
	TUpdateLeadSchema,
} from "../schema/lead.schema";

export const leadFormMapper = {
	fromDtoToFormValues: (dto: TLeadDTO) => {
		return {
			_id: dto._id,
			name: dto.name,
			email: dto.email,
			phone: dto.phone,
			source: dto.source,
			status: dto.status,
			budgetFrom: dto.budget_from,
			budgetTo: dto.budget_to,
			note: dto.note,
			priority: dto.priority,
			country: dto.country,
			product: dto.product,
			createdAt: dto.created_at,
			updatedAt: dto.updated_at,
		} satisfies TLeadSchema;
	},

	toCreateDTO: (formValues: TCreateLeadSchema) => {
		return {
			name: formValues.name,
			email: formValues.email,
			phone: formValues.phone,
			source: formValues.source,
			status: formValues.status,
			budget_from: formValues.budgetFrom,
			budget_to: formValues.budgetTo,
			note: formValues.note,
			priority: formValues.priority,
			country: formValues.country,
		} satisfies TCreateLeadDTO;
	},

	toUpdateDTO: (formValues: TUpdateLeadSchema) => {
		return {
			name: formValues.name,
			email: formValues.email,
			phone: formValues.phone,
			source: formValues.source,
			budget_from: formValues.budgetFrom,
			budget_to: formValues.budgetTo,
			note: formValues.note,
			priority: formValues.priority,
			country: formValues.country,
			status: formValues.status,
		} satisfies TUpdateLeadDTO;
	},
};
