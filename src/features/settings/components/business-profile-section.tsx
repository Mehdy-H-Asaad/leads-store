"use client";

import { Controller } from "react-hook-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MainButton } from "@/components/common/main-button";
import { STORE_URL_PREFIX } from "../constants/settings.constants";
import type { UseFormReturn } from "react-hook-form";
import type { TBusinessProfileDTO } from "../schema/settings.schema";

type BusinessProfileSectionProps = {
	form: UseFormReturn<TBusinessProfileDTO>;
	onSave: (data: TBusinessProfileDTO) => void;
	isLoading?: boolean;
};

export const BusinessProfileSection = ({
	form,
	onSave,
	isLoading = false,
}: BusinessProfileSectionProps) => {
	return (
		<Card className="rounded-xl border bg-card shadow-sm">
			<CardHeader>
				<CardTitle>Business Profile</CardTitle>
				<CardDescription>Update your business information.</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={form.handleSubmit(onSave)}
					className="flex flex-col gap-6"
				>
					<FieldGroup className="gap-4">
						<Controller
							control={form.control}
							name="businessName"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="businessName">Business Name</FieldLabel>
									<Input
										id="businessName"
										placeholder="Tasty Bites Restaurant"
										{...field}
										className="w-full"
										aria-invalid={!!fieldState.error}
									/>
									{fieldState.error && (
										<p className="text-sm text-destructive">
											{fieldState.error.message}
										</p>
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="whatsappNumber"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="whatsappNumber">
										WhatsApp Business Number
									</FieldLabel>
									<Input
										id="whatsappNumber"
										placeholder="+1 234 567 8900"
										{...field}
										className="w-full"
										aria-invalid={!!fieldState.error}
									/>
									<FieldDescription>
										Customers will reach you on this number
									</FieldDescription>
									{fieldState.error && (
										<p className="text-sm text-destructive">
											{fieldState.error.message}
										</p>
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="businessDescription"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="businessDescription">
										Business Description
									</FieldLabel>
									<Textarea
										id="businessDescription"
										placeholder="Authentic homemade food delivered fresh to your door!"
										{...field}
										className="min-h-24 w-full resize-y"
										aria-invalid={!!fieldState.error}
									/>
									{fieldState.error && (
										<p className="text-sm text-destructive">
											{fieldState.error.message}
										</p>
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="storeUrlSlug"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="storeUrlSlug">Store URL</FieldLabel>
									<div className="flex w-full items-center rounded-md border border-input bg-transparent shadow-xs focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]">
										<span className="flex h-9 items-center pl-3 text-sm text-muted-foreground">
											{STORE_URL_PREFIX}
										</span>
										<Input
											id="storeUrlSlug"
											placeholder="tasty-bites"
											{...field}
											onChange={e =>
												field.onChange(
													e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
												)
											}
											className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
											aria-invalid={!!fieldState.error}
										/>
									</div>
									<FieldDescription>
										Choose a unique URL for your store
									</FieldDescription>
									{fieldState.error && (
										<p className="text-sm text-destructive">
											{fieldState.error.message}
										</p>
									)}
								</Field>
							)}
						/>
					</FieldGroup>

					<MainButton type="submit" disabled={isLoading}>
						{isLoading ? "Saving..." : "Save Changes"}
					</MainButton>
				</form>
			</CardContent>
		</Card>
	);
};
