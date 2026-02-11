import { ProductSchema } from "@/features/product/schema/product.schema";
import { z } from "zod";

export enum LEAD_STATUS {
	NEW = "new",
	CONTACTED = "contacted",
	QUALIFIED = "qualified",
	CONVERTED = "converted",
	LOST = "lost",
}

export const LeadSchema = z.object({
	id: z.number(),
	name: z.string().min(1, "Name is required"),
	email: z.email("Valid email is required"),
	phone: z.string().optional(),
	source: z.string().min(1, "Source is required"),
	status: z.enum(LEAD_STATUS),
	product: z.union([z.string(), ProductSchema]),
	createdAt: z.date().or(z.string()),
	updatedAt: z.date().or(z.string()),
});

export type TLeadDTO = z.infer<typeof LeadSchema>;
