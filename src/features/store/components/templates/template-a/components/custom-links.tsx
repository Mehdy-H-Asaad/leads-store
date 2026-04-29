import { TStoreTheme } from "@/entities/store/model/store.model";
import { BUTTON_VARIANT } from "@/shared/contracts/store/store.contract";
import { CSSProperties } from "react";
import Link from "next/link";

type CustomLinksProps = {
	customLinks: { name: string; url: string }[];
	storeUrl?: string;
	buttonVariant: BUTTON_VARIANT;
	theme: TStoreTheme;
	borderRadius: string;
};

export function CustomLinks({
	customLinks,
	storeUrl,
	buttonVariant,
	theme,
	borderRadius,
}: CustomLinksProps) {
	if (customLinks.length === 0) return null;

	const getLinkStyle = (): CSSProperties => {
		if (buttonVariant === BUTTON_VARIANT.FILLED) {
			return {
				backgroundColor: theme.primary,
				color: theme.background,
				borderColor: "transparent",
				borderRadius,
			};
		}
		if (buttonVariant === BUTTON_VARIANT.SOFT) {
			return {
				backgroundColor: `${theme.primary}22`,
				color: theme.primary,
				borderColor: "transparent",
				borderRadius,
			};
		}
		return {
			backgroundColor: "transparent",
			color: theme.primary,
			borderColor: theme.primary,
			borderRadius,
		};
	};

	return (
		<div className="relative z-10 w-full flex flex-col gap-2.5">
			{customLinks.map(link => (
				<Link
					key={link.name}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className={`w-full flex items-center gap-3 py-3 px-5 border ${
						storeUrl ? "text-xs sm:text-base" : "text-xs"
					} font-semibold transition-opacity hover:opacity-80`}
					style={getLinkStyle()}
				>
					<span className="flex-1 text-center">{link.name}</span>
				</Link>
			))}
		</div>
	);
}
