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

type Props = {
	attributes: TItem["attributes"];
};

export const ItemAttributesCell = ({ attributes }: Props) => {
	const [open, setOpen] = useState(false);

	if (!attributes || attributes.length === 0) {
		return <span className="text-muted-foreground text-xs">—</span>;
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200 transition-colors hover:bg-blue-200 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
					<span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-400 text-[10px] font-bold text-white">
						{attributes.length}
					</span>
					{attributes.length === 1 ? "Attribute" : "Attributes"}
				</button>
			</DialogTrigger>

			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<span className="flex h-5 w-5 items-center justify-center rounded-full  text-[11px] font-bold text-white bg-black">
							{attributes.length}
						</span>
						Attributes
					</DialogTitle>
				</DialogHeader>

				<div className="max-h-72 overflow-y-auto rounded-md border">
					<table className="w-full text-sm">
						<thead className="sticky top-0 z-10 bg-muted/80 backdrop-blur-sm">
							<tr>
								<th className="px-4 py-2.5 text-left font-semibold text-muted-foreground">
									Key
								</th>
								<th className="px-4 py-2.5 text-left font-semibold text-muted-foreground">
									Value
								</th>
							</tr>
						</thead>
						<tbody className="divide-y">
							{attributes.map((attr, i) => (
								<tr key={i} className="transition-colors hover:bg-muted/40">
									<td className="px-4 py-2.5 font-medium text-foreground">
										{attr.name}
									</td>
									<td className="px-4 py-2.5 text-muted-foreground">
										{attr.value}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</DialogContent>
		</Dialog>
	);
};
