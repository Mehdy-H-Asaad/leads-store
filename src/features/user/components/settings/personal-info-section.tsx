"use client";

import { Controller } from "react-hook-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { CountryCodeSelect } from "@/shared/components/common/select/country-code-select";
import type { UseFormReturn } from "react-hook-form";
import type { TBusinessProfileSchema } from "../../schema/user-settings.schema";

type TPersonalInfoSectionProps = {
	form: UseFormReturn<TBusinessProfileSchema>;
};

export const PersonalInfoSection = ({ form }: TPersonalInfoSectionProps) => {
	return (
		<Card className="rounded-xl border bg-card shadow-sm flex-1">
			<CardHeader>
				<CardTitle>Personal Information</CardTitle>
				<CardDescription>Your name and contact details</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5">
				<div className="grid grid-cols-2 gap-4">
					<Controller
						control={form.control}
						name="firstName"
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel>
									First Name <span className="text-destructive">*</span>
								</FieldLabel>
								<Input
									{...field}
									placeholder="First Name"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name="lastName"
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel>
									Last Name <span className="text-destructive">*</span>
								</FieldLabel>
								<Input
									{...field}
									placeholder="Doe"
									aria-invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<Controller
						control={form.control}
						name="countryCode"
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel>
									Country <span className="text-destructive">*</span>
								</FieldLabel>
								<CountryCodeSelect
									value={field.value}
									onChange={field.onChange}
									invalid={fieldState.invalid}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name="whatsappNumber"
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel>
									WhatsApp Number <span className="text-destructive">*</span>
								</FieldLabel>
								<Input
									{...field}
									placeholder="5551234567"
									aria-invalid={fieldState.invalid}
								/>
								<FieldDescription>Customers contact you here</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>

				<Controller
					control={form.control}
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
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</CardContent>
		</Card>
	);
};
