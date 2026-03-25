import {
	DialogContent,
	DialogHeader,
	Dialog,
	DialogTrigger,
	DialogTitle,
} from "@/shared/components/ui/dialog";
import { TItem } from "@/entities/item/model/item.model";
import { useState } from "react";
import Image from "next/image";

type Props = {
	thumbnail: TItem["thumbnail"];
	name: string;
};

export const ItemThumbnailCell = ({ thumbnail, name }: Props) => {
	const [open, setOpen] = useState(false);

	if (!thumbnail || !thumbnail.url) {
		return <span className="text-muted-foreground text-xs">—</span>;
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Image
					src={thumbnail.url}
					alt={name}
					width={160}
					height={160}
					className="w-full rounded-md object-cover"
				/>
			</DialogTrigger>

			<DialogContent className="md:min-w-5xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						Thumbnail
					</DialogTitle>
				</DialogHeader>

				<Image
					src={thumbnail.url}
					alt={name}
					width={800}
					height={400}
					// quality={100}
					className="w-full rounded-md object-contain"
				/>
			</DialogContent>
		</Dialog>
	);
};
