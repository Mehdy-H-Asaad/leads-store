import { TOnboardingSchema } from "../schema/onboarding.schema";
import {
	TOnboardingDTO,
	TRequestEmailChangeDTO,
	TUpdateBusinessProfileDTO,
	TVerifyEmailChangeDTO,
} from "@/entities/user/api/user.dto";
import {
	TBusinessProfileSchema,
	TRequestEmailChangeSchema,
	TVerifyEmailChangeSchema,
} from "../schema/user-settings.schema";

export const userFormMapper = {
	toOnboardingDTO: (data: TOnboardingSchema) =>
		({
			first_name: data.firstName,
			last_name: data.lastName,
			country_code: data.countryCode,
			whatsapp_number: data.whatsappNumber,
			address: data.address ?? null,
			logo: data.logo ?? null,
			business_name: data.businessName ?? null,
			business_description: data.businessDescription ?? null,
			store_url: data.storeUrl,
			links: data.links,
		} satisfies TOnboardingDTO),
	toUpdateBusinessProfileDTO: (data: TBusinessProfileSchema) =>
		({
			first_name: data.firstName,
			last_name: data.lastName,
			business_name: data.businessName,
			whatsapp_number: data.whatsappNumber,
			business_description: data.businessDescription ?? null,
			country_code: data.countryCode,
			address: data.address ?? null,
		} satisfies TUpdateBusinessProfileDTO),
	toRequestEmailChangeDTO: (data: TRequestEmailChangeSchema) =>
		({
			new_email: data.newEmail,
			password: data.password,
		} satisfies TRequestEmailChangeDTO),
	toVerifyEmailChangeDTO: (data: TVerifyEmailChangeSchema) =>
		({
			token: data.token,
		} satisfies TVerifyEmailChangeDTO),
};
