"use client";

import { FieldArrayWithId } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { TItemFormValues } from "../../../schema/item-form.schema";

type TItemGalleryGridProps = {
	galleryPreviews: string[];
	fields: FieldArrayWithId<TItemFormValues, "images", "id">[];
	onRemove: (index: number) => void;
};

export const ItemGalleryGrid = ({
	galleryPreviews,
	fields,
	onRemove,
}: TItemGalleryGridProps) => {
	if (galleryPreviews.length === 0) return null;

	return (
		<div className="grid grid-cols-3 gap-3">
			{fields.map((_, index) => (
				<div
					key={index}
					className="relative aspect-square rounded-lg overflow-hidden border group w-full h-full"
				>
					<Image
						src={galleryPreviews[index]}
						alt={`Gallery ${index + 1}`}
						className="w-full h-full object-cover"
						width={160}
						height={160}
					/>
					<Button
						type="button"
						variant="destructive"
						size="icon"
						className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
						onClick={() => onRemove(index)}
					>
						<X className="h-3 w-3" />
					</Button>
				</div>
			))}
		</div>
	);
};
