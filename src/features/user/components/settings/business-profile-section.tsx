"use client";

import { Controller } from "react-hook-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import type { UseFormReturn } from "react-hook-form";
import type { TBusinessProfileSchema } from "../../schema/user-settings.schema";

type BusinessProfileSectionProps = {
	form: UseFormReturn<TBusinessProfileSchema>;
};

export const BusinessProfileSection = ({
	form,
}: BusinessProfileSectionProps) => {
	return (
		<Card className="rounded-xl border bg-card shadow-sm">
			<CardHeader>
				<CardTitle>Business Information</CardTitle>
				<CardDescription>
					Your store profile visible to customers
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5">
				<Controller
					control={form.control}
					name="businessName"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>
								Business Name <span className="text-destructive">*</span>
							</FieldLabel>
							<Input
								{...field}
								placeholder="Acme Store"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					control={form.control}
					name="businessDescription"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Business Description</FieldLabel>
							<Textarea
								{...field}
								placeholder="Tell customers what your business is about..."
								rows={3}
								className="min-h-24 w-full resize-y"
								aria-invalid={fieldState.invalid}
							/>
							<div className="text-xs text-muted-foreground text-right">
								{field.value?.length ?? 0}/500
							</div>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</CardContent>
		</Card>
	);
};
