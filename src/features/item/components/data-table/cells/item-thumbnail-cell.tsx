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
import { ImageOff } from "lucide-react";

type Props = {
	thumbnail: TItem["thumbnail"];
	name: string;
};

export const ItemThumbnailCell = ({ thumbnail, name }: Props) => {
	const [open, setOpen] = useState(false);

	if (!thumbnail || !thumbnail.url) {
		return (
			<div className="size-25 rounded-md bg-muted flex items-center justify-center border border-dashed border-muted-foreground/30">
				<ImageOff className="size-4 text-muted-foreground/50" />
			</div>
		);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="size-25 rounded-md object-cover">
					<Image
						src={thumbnail.url}
						alt={name}
						width={160}
						height={160}
						className="size-full rounded-md object-cover"
					/>
				</div>
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
