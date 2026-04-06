import { z } from "zod";

export const BusinessProfileSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	businessName: z.string().min(1, "Business name is required"),
	whatsappNumber: z.string().min(1, "WhatsApp number is required"),
	businessDescription: z.string().optional(),
	countryCode: z.string().min(1, "Country code is required"),
	address: z.string().optional(),
});

export const requestEmailChangeSchema = z.object({
	newEmail: z.email("Invalid email address").min(1, "Email is required"),
	password: z.string().min(1, "Password is required"),
});

export const verifyEmailChangeSchema = z.object({
	token: z.string().min(1, "Token is required"),
});

export type TBusinessProfileSchema = z.infer<typeof BusinessProfileSchema>;
export type TRequestEmailChangeSchema = z.infer<
	typeof requestEmailChangeSchema
>;
export type TVerifyEmailChangeSchema = z.infer<typeof verifyEmailChangeSchema>;
