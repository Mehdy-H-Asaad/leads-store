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
				<button className="inline-flex items-center gap-1.5 rounded-md bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200 transition-colors hover:bg-sky-200 hover:text-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
					<ImageIcon className="h-3.5 w-3.5" />
					<span className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 text-[10px] font-bold text-white">
						{images.length}
					</span>
					{images.length === 1 ? "Image" : "Images"}
				</button>
			</DialogTrigger>

			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<ImageIcon className="h-4 w-4 text-sky-500" />
						Gallery
						<span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-400 text-[11px] font-bold text-white">
							{images.length}
						</span>
					</DialogTitle>
				</DialogHeader>

				<div className="max-h-80 overflow-y-auto rounded-md">
					<div className="grid grid-cols-2 gap-3 p-1 sm:grid-cols-3">
						{images.map((img, i) => (
							<a
								key={i}
								href={img.fileUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="group relative aspect-square overflow-hidden rounded-lg border bg-muted ring-1 ring-transparent transition-all hover:ring-2 hover:ring-sky-400"
							>
								<Image
									src={img.fileUrl}
									alt={`Image ${i + 1}`}
									fill
									className="object-cover transition-transform duration-200 group-hover:scale-105"
									sizes="(max-width: 640px) 50vw, 33vw"
								/>
								<div className="absolute inset-0 flex items-end bg-linear-to-t from-black/40 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
									<span className="truncate text-[10px] font-medium text-white">
										{img.fileKey}
									</span>
								</div>
							</a>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
