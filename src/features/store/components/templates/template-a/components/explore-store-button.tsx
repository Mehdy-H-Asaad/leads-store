import { TStoreTheme } from "@/entities/store/model/store.model";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

type ExploreStoreButtonProps = {
	storeUrl?: string;
	theme: TStoreTheme;
	borderRadius: string;
};

export function ExploreStoreButton({
	storeUrl,
	theme,
	borderRadius,
}: ExploreStoreButtonProps) {
	const sharedStyle = {
		backgroundColor: theme.background,
		color: theme.text,
		borderColor: theme.text,
		borderRadius,
		boxShadow: `5px 5px 0 ${theme.text}`,
	};

	const sharedClassName =
		"group w-full flex items-center justify-center gap-3 py-3 px-5 font-bold text-sm border transition-all duration-200 hover:shadow-none! active:shadow-none";

	return (
		<div className="relative z-10 w-full">
			{storeUrl ? (
				<Link
					href={`${storeUrl}/items`}
					className={sharedClassName}
					style={sharedStyle}
				>
					<span>Explore store</span>
					<ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-200" />
				</Link>
			) : (
				<div
					className={`cursor-pointer ${sharedClassName}`}
					style={sharedStyle}
				>
					<span>Explore store</span>
					<ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-200" />
				</div>
			)}
		</div>
	);
}
