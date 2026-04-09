import { Controller, Control } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import {
	ORDER_STATUS,
	DELIVERY_STATUS,
} from "@/shared/contracts/order/order.contract";
import { TUpdateOrderFormValues } from "@/features/order/schema/order-form.schema";

type TStatusFieldsProps = {
	control: Control<TUpdateOrderFormValues>;
};

export const StatusFields = ({ control }: TStatusFieldsProps) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Controller
				control={control}
				name="status"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Order Status</FieldLabel>
						<Select value={field.value} onValueChange={field.onChange}>
							<SelectTrigger
								className="capitalize"
								aria-invalid={fieldState.invalid}
							>
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								{Object.values(ORDER_STATUS).map(s => (
									<SelectItem className="capitalize" key={s} value={s}>
										{s.replace(/_/g, " ")}
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
				name="deliveryStatus"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Delivery Status</FieldLabel>
						<Select value={field.value} onValueChange={field.onChange}>
							<SelectTrigger
								className="capitalize"
								aria-invalid={fieldState.invalid}
							>
								<SelectValue placeholder="Select delivery status" />
							</SelectTrigger>
							<SelectContent>
								{Object.values(DELIVERY_STATUS).map(s => (
									<SelectItem className="capitalize" key={s} value={s}>
										{s.replace(/_/g, " ")}
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
	);
};
