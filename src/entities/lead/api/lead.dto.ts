import { z } from "zod";
import {
	LEAD_SOURCE,
	LEAD_STATUS,
	LEAD_PRIORITY,
} from "@/contracts/lead/lead.contract";
import { productContractRefSchema } from "@/contracts/product/product.contract";

export const leadSchemaDto = z.object({
	_id: z.string(),
	phone: z.string().nullable(),
	name: z.string(),
	email: z.email(),
	source: z.enum(LEAD_SOURCE),
	status: z.enum(LEAD_STATUS),
	budgetFrom: z.number().nullable(),
	budgetTo: z.number().nullable(),
	note: z.string().nullable(),
	priority: z.enum(LEAD_PRIORITY),
	country: z.string().nullable(),
	product: productContractRefSchema,
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export const createLeadSchemaDto = leadSchemaDto.omit({
	_id: true,
	createdAt: true,
	updatedAt: true,
	product: true,
});

export const updateLeadSchemaDto = leadSchemaDto.omit({
	_id: true,
	createdAt: true,
	updatedAt: true,
	product: true,
});

export type TLeadDTO = z.infer<typeof leadSchemaDto>;
export type TCreateLeadDTO = z.infer<typeof createLeadSchemaDto>;
export type TUpdateLeadDTO = z.infer<typeof updateLeadSchemaDto>;
