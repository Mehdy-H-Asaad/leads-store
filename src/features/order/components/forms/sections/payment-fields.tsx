import { Controller, Control } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import {
	PAYMENT_STATUS,
	PAYMENT_METHOD,
} from "@/shared/contracts/order/order.contract";
import { TUpdateOrderFormValues } from "@/features/order/schema/order-form.schema";

type TPaymentFieldsProps = {
	control: Control<TUpdateOrderFormValues>;
};

export const PaymentFields = ({ control }: TPaymentFieldsProps) => {
	return (
		<div className="space-y-4 border rounded-lg p-4">
			<p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
				Payment
			</p>

			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={control}
					name="payment.status"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Payment Status</FieldLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger
									className="capitalize"
									aria-invalid={fieldState.invalid}
								>
									<SelectValue placeholder="Select payment status" />
								</SelectTrigger>
								<SelectContent>
									{Object.values(PAYMENT_STATUS).map(s => (
										<SelectItem className="capitalize" key={s} value={s}>
											{s}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fieldState.error && (
								<FieldError>{fieldState.error.message}</FieldError>
							)}
						</Field>
					)}
				/>
				<Controller
					control={control}
					name="payment.method"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Payment Method</FieldLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger
									className="capitalize"
									aria-invalid={fieldState.invalid}
								>
									<SelectValue placeholder="Select method" />
								</SelectTrigger>
								<SelectContent>
									{Object.values(PAYMENT_METHOD).map(m => (
										<SelectItem className="capitalize" key={m} value={m}>
											{m.replace(/_/g, " ")}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fieldState.error && (
								<FieldError>{fieldState.error.message}</FieldError>
							)}
						</Field>
					)}
				/>
			</div>

			<Controller
				control={control}
				name="payment.amount_paid"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Amount Paid</FieldLabel>
						<Input
							type="number"
							min={0}
							step="0.01"
							{...field}
							onChange={e => field.onChange(Number(e.target.value))}
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
				name="payment.reference"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Reference</FieldLabel>
						<Input
							{...field}
							value={field.value ?? ""}
							placeholder="Transaction reference..."
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
				name="payment.notes"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Payment Notes</FieldLabel>
						<Textarea
							{...field}
							value={field.value ?? ""}
							placeholder="Any payment notes..."
							rows={2}
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.error && (
							<FieldError>{fieldState.error.message}</FieldError>
						)}
					</Field>
				)}
			/>
		</div>
	);
};
