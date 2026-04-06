"use client";

import { useState } from "react";
import {
	Controller,
	Control,
	FieldArrayWithId,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
} from "react-hook-form";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { PlusIcon, X } from "lucide-react";
import { TItemFormValues } from "../../../schema/item-form.schema";

type TItemAttributesFieldProps = {
	control: Control<TItemFormValues>;
	fields: FieldArrayWithId<TItemFormValues, "attributes", "id">[];
	onAppend: UseFieldArrayAppend<TItemFormValues, "attributes">;
	onRemove: UseFieldArrayRemove;
};

export const ItemAttributesField = ({
	control,
	fields,
	onAppend,
	onRemove,
}: TItemAttributesFieldProps) => {
	const [attributeName, setAttributeName] = useState("");
	const [attributeValue, setAttributeValue] = useState("");

	const handleAdd = () => {
		onAppend({ name: attributeName, value: attributeValue });
		setAttributeName("");
		setAttributeValue("");
	};

	return (
		<Controller
			control={control}
			name="attributes"
			render={({ field }) => (
				<Field>
					<FieldLabel>Item Attributes</FieldLabel>
					<div className="space-y-3">
						<div className="grid grid-cols-[1fr,1fr,auto] gap-2">
							<div className="flex items-center gap-4">
								<div className="flex-1 space-y-2">
									<Label htmlFor="attribute-name">Name</Label>
									<Input
										id="attribute-name"
										value={attributeName}
										onChange={e => setAttributeName(e.target.value)}
										placeholder="Name (e.g., Color)"
									/>
								</div>
								<div className="flex-1 space-y-2">
									<Label htmlFor="attribute-value">Value</Label>
									<Input
										id="attribute-value"
										value={attributeValue}
										onChange={e => setAttributeValue(e.target.value)}
										placeholder="Value (e.g., Blue)"
									/>
								</div>
								<Button
									type="button"
									className="w-fit mt-auto"
									variant="default"
									onClick={handleAdd}
									disabled={!attributeName.trim() || !attributeValue.trim()}
								>
									<PlusIcon className="w-4 h-4" />
									Add
								</Button>
							</div>
						</div>

						{field.value && field.value.length > 0 && (
							<div className="space-y-2">
								{fields.map((attr, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
									>
										<div className="flex items-center gap-3">
											<span className="font-medium text-sm">{attr.name}:</span>
											<span className="text-sm text-muted-foreground">
												{attr.value}
											</span>
										</div>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="h-7 w-7 hover:bg-destructive/20 hover:text-destructive"
											onClick={() => onRemove(index)}
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
	);
};
