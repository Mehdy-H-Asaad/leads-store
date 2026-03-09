import { TOnboardingSchema } from "../schema/onboarding.schema";
import { TOnboardingDTO } from "@/entities/user/api/user.dto";

export const onboardingMapper = {
	toOnboardingDTO: (data: TOnboardingSchema): TOnboardingDTO => ({
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
	}),
};
