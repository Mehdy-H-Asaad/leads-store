import { TStoreTheme } from "@/entities/store/model/store.model";
import { TFeaturedItem } from "../../../../types/store.types";
import { ArrowRightIcon, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FeaturedItemsProps = {
	featuredItems: TFeaturedItem[];
	storeUrl: string;
	theme: TStoreTheme;
	borderRadius: string;
	currency: string;
};

export function FeaturedItems({
	featuredItems,
	storeUrl,
	theme,
	borderRadius,
	currency,
}: FeaturedItemsProps) {
	if (featuredItems.length === 0) return null;

	return (
		<div className="relative z-10 w-full flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<p
					className="text-sm font-semibold uppercase tracking-widest"
					style={{ color: theme.text, opacity: 0.45 }}
				>
					Featured
				</p>
				<Link
					href={`${storeUrl}/items`}
					className="group text-sm font-semibold flex items-center gap-1 transition-all duration-200 hover:opacity-100!"
					style={{ color: theme.text, opacity: 0.45 }}
				>
					See all
					<ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-200" />
				</Link>
			</div>

			<div className="grid grid-cols-2 gap-2.5">
				{featuredItems.slice(0, 4).map(item => (
					<Link
						key={item.id}
						href={`${storeUrl}/items/${item.slug}`}
						className="group flex flex-col overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
						style={{ borderRadius }}
					>
						<div
							className="w-full aspect-square overflow-hidden relative"
							style={{ backgroundColor: `${theme.primary}15` }}
						>
							{item.thumbnail?.url != null ? (
								<Image
									src={item.thumbnail.url}
									alt={item.name}
									width={200}
									height={200}
									className="object-cover w-full h-full"
								/>
							) : (
								<div
									className="w-full h-full flex items-center justify-center"
									style={{ color: theme.primary, opacity: 0.3 }}
								>
									<ImageOff className="w-8 h-8" />
								</div>
							)}
						</div>

						<div
							className="px-2 py-1.5 flex flex-col gap-0.5"
							style={{ backgroundColor: `${theme.primary}10` }}
						>
							<p
								className="text-sm font-semibold truncate"
								style={{ color: theme.text }}
							>
								{item.name}
							</p>
							<p className="text-sm font-bold" style={{ color: theme.primary }}>
								{currency} {item.price.toFixed(2)}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
