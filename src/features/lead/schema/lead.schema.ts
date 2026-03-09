import { z } from "zod";
import { productContractRefSchema } from "@/shared/contracts/product/product.contract";
import {
	LEAD_PRIORITY,
	LEAD_SOURCE,
	LEAD_STATUS,
} from "@/shared/contracts/lead/lead.contract";

export const LeadSchema = z.object({
	_id: z.string(),
	phone: z.string().nullable(),
	name: z.string().min(1, "Name is required"),
	email: z.email("Valid email is required"),
	source: z.enum(LEAD_SOURCE),
	status: z.enum(LEAD_STATUS),
	budgetFrom: z.number().nullable(),
	budgetTo: z.number().nullable(),
	note: z
		.string()
		.nullable()
		.refine(val => !val || val.length <= 500, {
			message: "Note must be less than 500 characters",
		}),
	priority: z.enum(LEAD_PRIORITY),
	country: z.string().nullable(),
	product: productContractRefSchema,
	createdAt: z.date().or(z.string()),
	updatedAt: z.date().or(z.string()),
});

export const CreateLeadSchema = LeadSchema.omit({
	_id: true,
	createdAt: true,
	updatedAt: true,
	product: true,
});

export const UpdateLeadSchema = LeadSchema.omit({
	_id: true,
	createdAt: true,
	updatedAt: true,
	product: true,
});

export type TLeadSchema = z.infer<typeof LeadSchema>;
export type TCreateLeadSchema = z.infer<typeof CreateLeadSchema>;
export type TUpdateLeadSchema = z.infer<typeof UpdateLeadSchema>;
