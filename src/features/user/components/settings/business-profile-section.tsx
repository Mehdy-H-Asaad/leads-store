"use client";

import { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Upload, X, PlusIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
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
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { MainButton } from "@/shared/components/common/main-button";
import { Separator } from "@/shared/components/ui/separator";
import { CountryCodeSelect } from "../onboarding/country-code-select";
import { cn } from "@/shared/lib/utils";
import type { UseFormReturn } from "react-hook-form";
import type { TBusinessProfileSchema } from "../../schema/user-settings.schema";
import { useFileUpload } from "@/shared/hooks/use-file-upload";
import Image from "next/image";

type BusinessProfileSectionProps = {
	form: UseFormReturn<TBusinessProfileSchema>;
	onSave: (data: TBusinessProfileSchema) => void;
	isLoading?: boolean;
};

export const BusinessProfileSection = ({
	form,
	onSave,
	isLoading = false,
}: BusinessProfileSectionProps) => {
	const [_logoPreview, setLogoPreview] = useState<string | null>(
		form.getValues("logo") ?? null
	);
	const [linkName, setLinkName] = useState("");
	const [linkUrl, setLinkUrl] = useState("");
	const [linkUrlError, setLinkUrlError] = useState("");
	const logoUpload = useFileUpload({ maxSizeMB: 5 });
	const {
		fields: linkFields,
		append: appendLink,
		remove: removeLink,
	} = useFieldArray({ control: form.control, name: "links" });

	const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 5 * 1024 * 1024) {
			toast.error("Image too large", {
				description: "Logo must be less than 5MB",
			});
			return;
		}
		if (!file.type.startsWith("image/")) {
			toast.error("Invalid file type", {
				description: "Please upload a valid image file",
			});
			return;
		}
		const reader = new FileReader();
		reader.onloadend = () => {
			const result = reader.result as string;
			setLogoPreview(result);
			form.setValue("logo", result);
		};
		reader.readAsDataURL(file);
	};

	const handleAddLink = () => {
		if (!linkName.trim() || !linkUrl.trim()) return;
		try {
			new URL(linkUrl.trim());
		} catch {
			setLinkUrlError(
				"Please enter a valid URL (e.g. https://instagram.com/handle)"
			);
			return;
		}
		setLinkUrlError("");
		appendLink({ name: linkName.trim(), url: linkUrl.trim() });
		setLinkName("");
		setLinkUrl("");
	};

	return (
		<Card className="rounded-xl border bg-card shadow-sm">
			<CardHeader className="sr-only">
				<CardTitle className="sr-only">Business Profile</CardTitle>
				<CardDescription className="sr-only">
					Update your business information.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={form.handleSubmit(onSave)}
					className="flex flex-col gap-8"
				>
					<div className="space-y-5">
						<div>
							<h3 className="text-sm font-semibold">Personal Information</h3>
							<p className="text-xs text-muted-foreground mt-0.5">
								Your name and contact details
							</p>
						</div>

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
											WhatsApp Number{" "}
											<span className="text-destructive">*</span>
										</FieldLabel>
										<Input
											{...field}
											placeholder="5551234567"
											aria-invalid={fieldState.invalid}
										/>
										<FieldDescription>
											Customers contact you here
										</FieldDescription>
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
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="logo"
							render={({ fieldState }) => (
								<Field>
									<FieldLabel>
										Featured Image <span className="text-red-500">*</span>
									</FieldLabel>
									{!logoUpload.preview &&
									!logoUpload.isUploading &&
									!form.getValues("logo") ? (
										<label
											htmlFor="featured-image"
											className={cn(
												"flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-muted/50 hover:border-primary/50",
												fieldState.invalid
													? "border-destructive"
													: "border-input"
											)}
										>
											<Upload className="w-8 h-8 mb-2 text-muted-foreground" />
											<p className="text-sm text-muted-foreground">
												Click to upload
											</p>
											<p className="text-xs text-muted-foreground">
												PNG, JPG, WEBP (MAX. 5MB)
											</p>
											<input
												id="featured-image"
												type="file"
												className="hidden"
												accept="image/*"
												onChange={handleLogoUpload}
											/>
										</label>
									) : logoUpload.isUploading || false ? (
										<div className="relative w-full h-40 rounded-lg overflow-hidden border flex items-center justify-center gap-2">
											<Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
											<p className="text-sm text-muted-foreground">
												{false ? "Deleting..." : "Uploading..."}
											</p>
										</div>
									) : logoUpload.preview || form.getValues("logo") ? (
										<div className="relative w-full h-40 rounded-lg overflow-hidden border">
											<Image
												src={logoUpload.preview || form.getValues("logo") || ""}
												alt="Featured preview"
												className="w-full h-full object-cover"
												width={160}
												height={160}
											/>
											<Button
												type="button"
												variant="destructive"
												size="icon"
												className="absolute top-2 right-2 h-7 w-7 rounded-full"
												// onClick={handleDeleteLogo}
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
									) : (
										<div className="relative w-full h-40 rounded-lg overflow-hidden border flex items-center justify-center gap-2">
											<p className="text-sm text-muted-foreground">
												No image uploaded
											</p>
										</div>
									)}
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>
					</div>

					<Separator />

					<div className="space-y-5">
						<div>
							<h3 className="text-sm font-semibold">Business Information</h3>
							<p className="text-xs text-muted-foreground mt-0.5">
								Your store profile visible to customers
							</p>
						</div>

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
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
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
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="links"
							render={({ fieldState }) => (
								<Field>
									<FieldLabel>Social Links</FieldLabel>
									<div className="space-y-3">
										<div className="grid grid-cols-[1fr,2fr,auto] gap-2 items-end">
											<div className="space-y-1">
												<p className="text-xs text-muted-foreground">
													Platform
												</p>
												<Input
													value={linkName}
													onChange={e => setLinkName(e.target.value)}
													placeholder="Instagram"
												/>
											</div>
											<div className="space-y-1">
												<p className="text-xs text-muted-foreground">URL</p>
												<Input
													value={linkUrl}
													onChange={e => {
														setLinkUrl(e.target.value);
														if (linkUrlError) setLinkUrlError("");
													}}
													placeholder="https://instagram.com/yourhandle"
													aria-invalid={!!linkUrlError}
												/>
												{linkUrlError && (
													<FieldError>{linkUrlError}</FieldError>
												)}
											</div>
											<Button
												type="button"
												variant="outline"
												className="w-fit flex items-center gap-2"
												onClick={handleAddLink}
												disabled={!linkName.trim() || !linkUrl.trim()}
											>
												<PlusIcon className="w-4 h-4" />
												<span className="text-sm">Add Link</span>
											</Button>
										</div>

										{linkFields.length > 0 && (
											<div className="space-y-2">
												{linkFields.map((link, index) => (
													<div
														key={link.id}
														className="flex items-center justify-between px-3 py-2.5 rounded-lg border bg-muted/30"
													>
														<div className="flex items-center gap-3 min-w-0">
															<span className="font-medium text-sm shrink-0">
																{link.name}
															</span>
															<span className="text-sm text-muted-foreground truncate">
																{link.url}
															</span>
														</div>
														<Button
															type="button"
															variant="ghost"
															size="icon"
															className="h-7 w-7 shrink-0 hover:bg-destructive/10 hover:text-destructive"
															onClick={() => removeLink(index)}
														>
															<X className="h-4 w-4" />
														</Button>
													</div>
												))}
											</div>
										)}

										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</div>
								</Field>
							)}
						/>
					</div>

					<MainButton
						type="submit"
						isLoading={isLoading}
						disabled={isLoading}
						loadingText="Saving..."
						className="w-fit self-end"
					>
						Save Changes
					</MainButton>
				</form>
			</CardContent>
		</Card>
	);
};
