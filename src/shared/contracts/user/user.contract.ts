import z from "zod";
export enum USER_STEP {
	ONE = "ONE",
	TWO = "TWO",
}
export enum USER_ROLE {
	ADMIN = "admin",
	USER = "user",
}
export enum USER_STATUS {
	ACTIVE = "active",
	SUSPENDED = "suspended",
}

export enum USER_PLAN {
	FREE = "free",
	PRO = "pro",
}

export const userContractRefSchema = z.object({
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
	logo: z.string().nullable(),
	BusinessName: z.string().nullable(),
	businessDescription: z.string().nullable(),
	storeURL: z.string(),
	QRCode: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	links: z.array(
		z.object({
			label: z.string(),
			url: z.string(),
		})
	),
});

export type TUserContractRef = z.infer<typeof userContractRefSchema>;
