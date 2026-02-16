import { ProductSchema } from "@/features/product/schema/product.schema";
import { z } from "zod";

export enum LEAD_STATUS {
	NEW = "new",
	CONTACTED = "contacted",
	CONVERTED = "converted",
	LOST = "lost",
}

export enum LEAD_SOURCE {
	WEBSITE = "website",
	EMAIL = "email",
	PHONE = "phone",
	FACEBOOK = "facebook",
	INSTAGRAM = "instagram",
	LINKEDIN = "linkedin",
	WHATSAPP = "whatsapp",
	TWITTER = "twitter",
	TELEGRAM = "telegram",
	OTHER = "other",
}

export enum LEAD_PRIORITY {
	LOW = "low",
	MEDIUM = "medium",
	HIGH = "high",
}

export const LeadSchema = z.object({
	_id: z.string(),
	phone: z.string().optional(),
	name: z.string().min(1, "Name is required"),
	email: z.email("Valid email is required"),
	source: z.enum(LEAD_SOURCE),
	status: z.enum(LEAD_STATUS),
	budgetFrom: z.number().optional(),
	budgetTo: z.number().optional(),
	note: z
		.string()
		.optional()
		.refine(val => !val || val.length <= 500, {
			message: "Note must be less than 500 characters",
		}),
	priority: z.enum(LEAD_PRIORITY),
	country: z.string().optional(),
	product: z.union([z.string(), ProductSchema]),
	createdAt: z.date().or(z.string()),
	updatedAt: z.date().or(z.string()),
});

export const CreateLeadSchema = LeadSchema.omit({
	_id: true,
	createdAt: true,
	updatedAt: true,
});

export const UpdateLeadSchema = LeadSchema.omit({
	_id: true,
	createdAt: true,
	updatedAt: true,
});

export type TLeadDTO = z.infer<typeof LeadSchema>;
export type TCreateLeadDTO = z.infer<typeof CreateLeadSchema>;
export type TUpdateLeadDTO = z.infer<typeof UpdateLeadSchema>;
