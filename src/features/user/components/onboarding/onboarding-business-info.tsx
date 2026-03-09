import { Textarea } from "@/shared/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { PlusIcon, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Controller, UseFormReturn } from "react-hook-form";
import { TOnboardingSchema } from "../../schema/onboarding.schema";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

export const OnboardingBusinessInfo = ({
	OnboardingForm,
}: {
	OnboardingForm: UseFormReturn<TOnboardingSchema>;
}) => {
	const [linkName, setLinkName] = useState("");
	const [linkUrl, setLinkUrl] = useState("");
	const [linkUrlError, setLinkUrlError] = useState("");
	const {
		fields: linkFields,
		append: appendLink,
		remove: removeLink,
	} = useFieldArray({
		control: OnboardingForm.control,
		name: "links",
	});

	const handleAddLink = () => {
		if (!linkName.trim() || !linkUrl.trim()) return;

		try {
			new URL(linkUrl.trim());
		} catch {
			setLinkUrlError("Please enter a valid URL (e.g. https://instagram.com/handle)");
			return;
		}

		setLinkUrlError("");
		appendLink({ name: linkName.trim(), url: linkUrl.trim() });
		setLinkName("");
		setLinkUrl("");
	};
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Business Information</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Set up your store profile so customers can find you.
				</p>
			</div>

			<Controller
				control={OnboardingForm.control}
				name="businessName"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>
							Business Name <span className="text-red-500">*</span>
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
				control={OnboardingForm.control}
				name="businessDescription"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Business Description</FieldLabel>
						<Textarea
							{...field}
							value={field.value ?? ""}
							placeholder="Tell customers what your business is about..."
							rows={3}
							aria-invalid={fieldState.invalid}
						/>
						<div className="text-xs text-muted-foreground text-right">
							{field.value?.length ?? 0}/500
						</div>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				control={OnboardingForm.control}
				name="storeUrl"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>
							Store URL Slug <span className="text-red-500">*</span>
						</FieldLabel>
						<div className="flex items-center rounded-md border border-input overflow-hidden focus-within:ring-1 focus-within:ring-ring">
							<span className="bg-muted px-3 py-2 text-sm text-muted-foreground border-r border-input whitespace-nowrap">
								store/
							</span>
							<input
								{...field}
								placeholder="my-store"
								aria-invalid={fieldState.invalid}
								className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
							/>
						</div>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				control={OnboardingForm.control}
				name="links"
				render={({ fieldState }) => (
					<Field>
						<FieldLabel>Social Links</FieldLabel>
						<div className="space-y-3">
							<div className="grid grid-cols-[1fr,2fr,auto] gap-2 items-end">
								<div className="space-y-1">
									<p className="text-xs text-muted-foreground">Platform</p>
									<Input
										value={linkName}
										onChange={e => setLinkName(e.target.value)}
										placeholder="Instagram"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
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
									size="icon"
									className="h-9 w-9 shrink-0"
									onClick={handleAddLink}
									disabled={!linkName.trim() || !linkUrl.trim()}
								>
									<PlusIcon className="w-4 h-4" />
								</Button>
							</div>

							{linkFields.length > 0 && (
								<div className="space-y-2">
									{linkFields.map((link, index) => (
										<div
											key={link.id}
											className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
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
												className="h-7 w-7 shrink-0 hover:bg-destructive/20 hover:text-destructive"
												onClick={() => removeLink(index)}
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
									))}
								</div>
							)}
						</div>
					</Field>
				)}
			/>
		</div>
	);
};
