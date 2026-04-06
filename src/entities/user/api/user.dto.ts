import {
	USER_PLAN,
	USER_STATUS,
	USER_STEP,
} from "@/shared/contracts/user/user.contract";
import z from "zod";
import { FileSchema } from "@/shared/schema/file.schema";

export const userSchemaDto = z.object({
	_id: z.string(),
	first_name: z.string(),
	last_name: z.string(),
	country_code: z.string(),
	email: z.email(),
	whatsapp_number: z.string(),
	address: z.string().nullable(),
	is_email_verified: z.boolean(),
	status: z.enum(USER_STATUS),
	plan: z.enum(USER_PLAN),
	logo: z
		.object({
			id: z.string(),
			key: z.string(),
			url: z.string().nullable(),
		})
		.nullable(),
	business_name: z.string().nullable(),
	business_description: z.string().nullable(),
	store_url: z.string(),
	qr_code: z.string(),
	created_at: z.date(),
	updated_at: z.date(),
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

export const onboardingSchemaDto = userSchemaDto.pick({
	first_name: true,
	last_name: true,
	country_code: true,
	whatsapp_number: true,
	address: true,
	logo: true,
	business_name: true,
	business_description: true,
	store_url: true,
	links: true,
});

export const requestEmailChangeSchemaDto = z.object({
	new_email: z.email(),
	password: z.string(),
});

export const verifyEmailChangeSchemaDto = z.object({
	token: z.string(),
});

export const updateBusinessProfileSchemaDto = z.object({
	first_name: z.string().nullable(),
	last_name: z.string(),
	business_name: z.string().nullable(),
	whatsapp_number: z.string(),
	business_description: z.string().nullable(),
	country_code: z.string(),
	address: z.string().nullable(),
	logo: FileSchema,
	links: z
		.array(
			z.object({
				name: z.string(),
				url: z.string(),
			})
		)
		.optional(),
});

export type TUserDTO = z.infer<typeof userSchemaDto>;
export type TOnboardingDTO = z.infer<typeof onboardingSchemaDto>;
export type TRequestEmailChangeDTO = z.infer<
	typeof requestEmailChangeSchemaDto
>;
export type TVerifyEmailChangeDTO = z.infer<typeof verifyEmailChangeSchemaDto>;

export type TMeDTO = {
	user: TUserDTO;
};
export type TUpdateBusinessProfileDTO = z.infer<
	typeof updateBusinessProfileSchemaDto
>;
