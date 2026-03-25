import {
	USER_PLAN,
	USER_STATUS,
	USER_STEP,
} from "@/shared/contracts/user/user.contract";
import z from "zod";

export const userModel = z.object({
	_id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	countryCode: z.string(),
	email: z.email(),
	whatsappNumber: z.string(),
	address: z.string().nullable(),
	isEmailVerified: z.boolean(),
	status: z.enum(USER_STATUS),
	plan: z.enum(USER_PLAN),
	logo: z.string().optional(),
	businessName: z.string().nullable(),
	businessDescription: z.string().nullable(),
	storeURL: z.string(),
	QRCode: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	links: z
		.array(
			z.object({
				name: z.string(),
				url: z.string(),
			})
		)
		.optional(),
	step: z.enum(USER_STEP),
});

export type TUser = z.infer<typeof userModel>;
