"use client";

import { Controller, Control } from "react-hook-form";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import { Switch } from "@/shared/components/ui/switch";
import { TItemFormValues } from "../../../schema/item-form.schema";

type TItemVisibilityFieldProps = {
	control: Control<TItemFormValues>;
};

export const ItemVisibilityField = ({ control }: TItemVisibilityFieldProps) => {
	return (
		<Controller
			control={control}
			name="isVisible"
			render={({ field }) => (
				<Field>
					<div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
						<div>
							<FieldLabel>Item Visibility</FieldLabel>
							<p className="text-sm text-muted-foreground">
								Make this item visible to customers
							</p>
						</div>
						<Switch checked={field.value} onCheckedChange={field.onChange} />
					</div>
				</Field>
			)}
		/>
	);
};
