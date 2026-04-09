import { Controller, Control } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { TUpdateOrderFormValues } from "@/features/order/schema/order-form.schema";

type TAdditionalFieldsProps = {
	control: Control<TUpdateOrderFormValues>;
};

export const AdditionalFields = ({ control }: TAdditionalFieldsProps) => {
	return (
		<>
			<Controller
				control={control}
				name="address"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Delivery Address</FieldLabel>
						<Input
							{...field}
							value={field.value ?? ""}
							placeholder="123 Main St, City, Country"
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>

			<Controller
				control={control}
				name="customerMessage"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Customer Message</FieldLabel>
						<Textarea
							{...field}
							value={field.value ?? ""}
							placeholder="Message from the customer..."
							rows={3}
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>

			<Controller
				control={control}
				name="notes"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Internal Notes</FieldLabel>
						<Textarea
							{...field}
							value={field.value ?? ""}
							placeholder="Internal notes..."
							rows={3}
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>
		</>
	);
};
