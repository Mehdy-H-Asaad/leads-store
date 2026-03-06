import { USER_STATUS, USER_PLAN } from "@/contracts/user/user.contract";
import { z } from "zod";

export const UserSchema = z.object({
	_id: z.string(),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	countryCode: z.string().min(1, "Country code is required"), // COMPLETE
	email: z.email("Invalid email address").min(1, "Email is required"),
	whatsappNumber: z.string().min(1, "WhatsApp number is required"), // COMPLETE
	address: z.string().optional(), // COMPLETE
	isEmailVerified: z.boolean(),
	status: z.enum(USER_STATUS),
	plan: z.enum(USER_PLAN),
	logo: z.string().optional(), // COMPLETE
	BusinessName: z.string().optional(), // COMPLETE
	businessDescription: z.string().optional(), // COMPLETE
	storeURL: z.string().min(1, "Store URL is required"),
	QRCode: z.string().min(1, "QR Code is required"),
	createdAt: z.date().or(z.string()),
	updatedAt: z.date().or(z.string()),
	links: z.array(
		z.object({
			label: z.string().min(1, "Label is required"),
			url: z.string().min(1, "URL is required"),
		})
	),
});
