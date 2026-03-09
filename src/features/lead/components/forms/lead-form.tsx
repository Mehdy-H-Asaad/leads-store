"use client";

import { Controller } from "react-hook-form";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/shared/components/ui/sheet";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { MainButton } from "@/shared/components/common/main-button";
import { SelectFormField } from "@/shared/components/common/select/select-form-field";
import {
	LEAD_STATUS,
	LEAD_SOURCE,
	LEAD_PRIORITY,
} from "@/shared/contracts/lead/lead.contract";
import { useCreateLead } from "../../hooks/use-create-lead";
type TLeadFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const LeadForm = ({ open, onOpenChange }: TLeadFormProps) => {
	const { CreateLeadForm, onCreateLead, isCreatingLead } = useCreateLead();

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="w-full sm:max-w-4xl overflow-hidden p-0">
				<SheetHeader className="border-b">
					<SheetTitle>Create New Lead</SheetTitle>
					<SheetDescription>Add a new lead to your database</SheetDescription>
				</SheetHeader>

				<ScrollArea className="h-[calc(100vh-140px)] pb-16">
					<form
						onSubmit={CreateLeadForm.handleSubmit(onCreateLead)}
						className="space-y-6 py-6 px-6"
					>
						<Controller
							control={CreateLeadForm.control}
							name="name"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>
										Name <span className="text-red-500">*</span>
									</FieldLabel>
									<Input
										{...field}
										placeholder="Lead Name"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<Controller
								control={CreateLeadForm.control}
								name="email"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Email <span className="text-red-500">*</span>
										</FieldLabel>
										<Input
											{...field}
											type="email"
											placeholder="email@example.com"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								control={CreateLeadForm.control}
								name="phone"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Phone</FieldLabel>
										<Input
											{...field}
											type="tel"
											placeholder="+1 (555) 000-0000"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Controller
								control={CreateLeadForm.control}
								name="source"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Source <span className="text-red-500">*</span>
										</FieldLabel>
										<SelectFormField
											field={field}
											options={Object.values(LEAD_SOURCE).map(source => ({
												label: source
													.split("_")
													.map(
														word =>
															word.charAt(0).toUpperCase() +
															word.slice(1).toLowerCase()
													)
													.join(" "),
												value: source,
											}))}
											placeholder="Select source"
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								control={CreateLeadForm.control}
								name="status"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Status <span className="text-red-500">*</span>
										</FieldLabel>
										<SelectFormField
											field={field}
											options={Object.values(LEAD_STATUS).map(status => ({
												label: status
													.split("_")
													.map(
														word =>
															word.charAt(0).toUpperCase() +
															word.slice(1).toLowerCase()
													)
													.join(" "),
												value: status,
											}))}
											placeholder="Select status"
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</div>

						<Controller
							control={CreateLeadForm.control}
							name="priority"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>
										Priority <span className="text-red-500">*</span>
									</FieldLabel>
									<SelectFormField
										field={field}
										options={Object.values(LEAD_PRIORITY).map(priority => ({
											label:
												priority.charAt(0).toUpperCase() +
												priority.slice(1).toLowerCase(),
											value: priority,
										}))}
										placeholder="Select priority"
									/>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<Controller
								control={CreateLeadForm.control}
								name="budgetFrom"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Budget From</FieldLabel>
										<Input
											{...field}
											type="number"
											placeholder="Minimum budget"
											value={field.value ?? ""}
											onChange={e =>
												field.onChange(
													e.target.value
														? parseFloat(e.target.value)
														: undefined
												)
											}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								control={CreateLeadForm.control}
								name="budgetTo"
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Budget To</FieldLabel>
										<Input
											{...field}
											type="number"
											placeholder="Maximum budget"
											value={field.value ?? ""}
											onChange={e =>
												field.onChange(
													e.target.value
														? parseFloat(e.target.value)
														: undefined
												)
											}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError>{fieldState.error.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</div>

						<Controller
							control={CreateLeadForm.control}
							name="country"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Country</FieldLabel>
									<Input
										{...field}
										placeholder="Country"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>

						<Controller
							control={CreateLeadForm.control}
							name="product"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>
										Product <span className="text-red-500">*</span>
									</FieldLabel>
									<SelectFormField
										field={field}
										options={[]}
										placeholder="Select product"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>

						<Controller
							control={CreateLeadForm.control}
							name="note"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Note</FieldLabel>
									<Textarea
										{...field}
										placeholder="Additional notes about this lead"
										rows={4}
										aria-invalid={fieldState.invalid}
									/>
									<div className="text-xs text-muted-foreground">
										{field.value?.length || 0}/500 characters
									</div>
									{fieldState.error && (
										<FieldError>{fieldState.error.message}</FieldError>
									)}
								</Field>
							)}
						/>
					</form>
				</ScrollArea>
				<div className="absolute bottom-0 left-0 right-0 border-t bg-background p-4">
					<MainButton
						type="submit"
						onClick={CreateLeadForm.handleSubmit(onCreateLead)}
						disabled={isCreatingLead}
						isLoading={isCreatingLead}
						loadingText="Creating..."
						className="w-fit ml-auto block"
					>
						Create Lead
					</MainButton>
				</div>
			</SheetContent>
		</Sheet>
	);
};
