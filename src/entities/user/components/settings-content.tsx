"use client";

import { useBusinessProfileForm } from "../hooks/use-business-profile-form";
import { BusinessProfileSection } from "./business-profile-section";
import { SecuritySection } from "./security-section";
import { LogoutSection } from "./logout-section";

const initialBusinessProfile = {
	businessName: "Tasty Bites Restaurant",
	whatsappNumber: "+1 234 567 8900",
	businessDescription:
		"Authentic homemade food delivered fresh to your door!",
	storeUrlSlug: "tasty-bites",
};

export const SettingsContent = () => {
	const { form, onSave } = useBusinessProfileForm(initialBusinessProfile);

	return (
		<div className="flex flex-col gap-8">
			<BusinessProfileSection form={form} onSave={onSave} />
			<SecuritySection />
			<LogoutSection />
		</div>
	);
};
