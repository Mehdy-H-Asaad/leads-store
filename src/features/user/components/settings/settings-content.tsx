"use client";

import { useBusinessProfileForm } from "../../hooks/use-business-profile-form";
import { BusinessProfileSection } from "./business-profile-section";
import { SecuritySection } from "./security-section";
import { LogoutSection } from "./logout-section";
import { useEffect } from "react";
import { useGetMe } from "@/entities/user/api/user.query";

export const SettingsContent = ({
	isLogoutPending,
	onLogout,
}: {
	isLogoutPending: boolean;
	onLogout: () => void;
}) => {
	const { user } = useGetMe({ enabled: true });
	const { businessProfileForm, onSave, isSaving } = useBusinessProfileForm();

	useEffect(() => {
		if (user) {
			businessProfileForm.reset({
				businessName: user.businessName ?? "",
				whatsappNumber: user.whatsappNumber,
				businessDescription: user.businessDescription ?? "",
				firstName: user.firstName ?? "",
				lastName: user.lastName ?? "",
				countryCode: user.countryCode ?? "",
				address: user.address ?? "",
				logo: user.logo ?? "",
				links: user.links ?? [],
			});
		}
	}, [user]);

	return (
		<div className="flex flex-col gap-8">
			<BusinessProfileSection
				form={businessProfileForm}
				onSave={onSave}
				isLoading={isSaving}
			/>
			<SecuritySection />
			<LogoutSection isLogoutPending={isLogoutPending} onLogout={onLogout} />
		</div>
	);
};
