import {
	LEAD_PRIORITY,
	LEAD_SOURCE,
	LEAD_STATUS,
} from "@/shared/contracts/lead/lead.contract";
import { productContractRefSchema } from "@/shared/contracts/product/product.contract";
import z from "zod";

export const leadModel = z.object({
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
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type TLead = z.infer<typeof leadModel>;
