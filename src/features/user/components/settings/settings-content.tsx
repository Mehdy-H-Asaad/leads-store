"use client";

import { useBusinessProfileForm } from "../../hooks/use-business-profile-form";
import { BusinessProfileSection } from "./business-profile-section";
import { PersonalInfoSection } from "./personal-info-section";
import { SecuritySection } from "./security-section";
import { LogoutSection } from "./logout-section";
import { useEffect } from "react";
import { useGetMe } from "@/entities/user/api/user.query";
import { MainButton } from "@/shared/components/common/main-button";

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
			});
		}
	}, [user]);

	return (
		<div className="flex flex-col gap-8">
			<form
				onSubmit={businessProfileForm.handleSubmit(onSave)}
				className="flex flex-col gap-6"
			>
				<div className="flex gap-6 items-start">
					<PersonalInfoSection form={businessProfileForm} />
				</div>

				<BusinessProfileSection form={businessProfileForm} />

				<div className="flex justify-end">
					<MainButton
						type="submit"
						isLoading={isSaving}
						disabled={isSaving}
						loadingText="Saving..."
					>
						Save Changes
					</MainButton>
				</div>
			</form>

			<SecuritySection />
			<LogoutSection isLogoutPending={isLogoutPending} onLogout={onLogout} />
		</div>
	);
};
