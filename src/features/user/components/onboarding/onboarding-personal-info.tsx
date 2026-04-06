import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Controller, UseFormReturn } from "react-hook-form";
import { TOnboardingSchema } from "../../schema/onboarding.schema";
import { CountryCodeSelect } from "./country-code-select";

export const OnboardingPersonalInfo = ({
	OnboardingForm,
}: {
	OnboardingForm: UseFormReturn<TOnboardingSchema>;
}) => {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Personal Information</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Tell us a bit about yourself to get started.
				</p>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={OnboardingForm.control}
					name="firstName"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>
								First Name <span className="text-red-500">*</span>
							</FieldLabel>
							<Input
								{...field}
								placeholder="John"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					control={OnboardingForm.control}
					name="lastName"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>
								Last Name <span className="text-red-500">*</span>
							</FieldLabel>
							<Input
								{...field}
								placeholder="Doe"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={OnboardingForm.control}
					name="countryCode"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>
								Country Code <span className="text-red-500">*</span>
							</FieldLabel>
							<CountryCodeSelect
								value={field.value}
								onChange={field.onChange}
								invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					control={OnboardingForm.control}
					name="whatsappNumber"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>
								WhatsApp Number <span className="text-red-500">*</span>
							</FieldLabel>
							<Input
								{...field}
								placeholder="5551234567"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			<Controller
				control={OnboardingForm.control}
				name="address"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Address</FieldLabel>
						<Input
							{...field}
							value={field.value ?? ""}
							placeholder="123 Main St, City, Country"
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.error && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
		</div>
	);
};
