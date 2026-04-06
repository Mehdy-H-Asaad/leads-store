"use client";

import { useState } from "react";
import Image from "next/image";
import { TItem } from "@/entities/item/model/item.model";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog";
import { ImageIcon } from "lucide-react";

type Props = {
	images: TItem["images"];
};

export const ItemImagesCell = ({ images }: Props) => {
	const [open, setOpen] = useState(false);

	if (!images || images.length === 0) {
		return <span className="text-muted-foreground text-xs">—</span>;
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="relative size-25">
					<Image
						src={images[0]?.url || ""}
						alt={`Image 1`}
						className="object-cover rounded-md size-full"
						width={100}
						height={100}
					/>
					<span className="text-xl font-bold text-white absolute top-0 left-0 z-10 bg-black/20 hover:bg-black/30 transition-all duration-200 rounded-md size-full flex items-center justify-center">
						+{images.length - 1}
					</span>
				</div>
			</DialogTrigger>

			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<ImageIcon className="h-4 w-4" />
						Gallery
					</DialogTitle>
				</DialogHeader>

				<div className="max-h-80 overflow-y-auto rounded-md">
					<div className="grid grid-cols-2 gap-3 p-1 sm:grid-cols-3">
						{images.map((img, i) => (
							<a
								key={i}
								href={img?.url || ""}
								target="_blank"
								rel="noopener noreferrer"
								className="group relative aspect-square overflow-hidden rounded-lg border bg-muted ring-1 ring-transparent transition-all hover:border-black"
							>
								<Image
									src={img?.url || ""}
									alt={`Image ${i + 1}`}
									fill
									className="object-contain transition-transform duration-200"
								/>
							</a>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
