import z from "zod";
import { FileSchema } from "@/shared/schema/file.schema";

export const OnboardingStep1Schema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	countryCode: z.string().min(1, "Country code is required"),
	whatsappNumber: z.string().min(1, "WhatsApp number is required"),
	address: z.string().optional(),
	logo: FileSchema.nullable(),
});

export const OnboardingStep2Schema = z.object({
	businessName: z.string().optional(),
	businessDescription: z.string().optional(),
	storeUrl: z.string().min(1, "Store URL is required"),
	links: z
		.array(
			z.object({
				name: z.string().min(1, "Platform name is required"),
				url: z.url("Please enter a valid URL"),
			})
		)
		.optional(),
});

export const OnboardingSchema = OnboardingStep1Schema.and(
	OnboardingStep2Schema
);

export type TOnboardingStep1Schema = z.infer<typeof OnboardingStep1Schema>;
export type TOnboardingStep2Schema = z.infer<typeof OnboardingStep2Schema>;
export type TOnboardingSchema = z.infer<typeof OnboardingSchema>;
