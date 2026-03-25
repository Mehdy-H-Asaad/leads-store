"use client";

import { useState } from "react";
import { TItem } from "@/entities/item/model/item.model";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog";
import { FileTextIcon } from "lucide-react";

type Props = {
	description: TItem["description"];
};

export const ItemDescriptionCell = ({ description }: Props) => {
	const [open, setOpen] = useState(false);

	if (!description || description.trim().length === 0) {
		return <span className="text-muted-foreground text-xs">—</span>;
	}

	const truncated =
		description.length > 40
			? `${description.substring(0, 40)}...`
			: description;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="inline-flex items-center gap-1.5 rounded-md  px-2.5 py-1 text-xs font-medium ring-1 ring-border transition-colors hover:bg-border focus:outline-none focus-visible:ring-2 focus-visible:ring-border">
					<FileTextIcon className="h-3.5 w-3.5" />
					<span className="max-w-32 truncate">{truncated}</span>
				</button>
			</DialogTrigger>

			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						Description
					</DialogTitle>
				</DialogHeader>

				<div className="max-h-96 overflow-y-auto rounded-md border bg-muted/20 p-4">
					<p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
						{description}
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};
