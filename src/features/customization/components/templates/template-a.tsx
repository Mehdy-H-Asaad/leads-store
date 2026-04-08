import { TCustomizationConfig } from "@/entities/customization/model/customization.model";
import {
	BACKGROUND_TYPE,
	BUTTON_SHAPE,
	BUTTON_VARIANT,
	LAYOUT,
} from "@/shared/contracts/customization/customization.contract";
import { TFileSchema } from "@/shared/schema/file.schema";
import { getPlatformByName } from "../../lib/platforms-config";
import Image from "next/image";

type TemplateAProps = {
	config: TCustomizationConfig;
	logo: TFileSchema;
	profile:
		| {
				title: string;
				bio?: string;
		  }
		| undefined;
	links: { name: string; url: string }[];
	storeUrl?: string;
};

const BUTTON_SHAPE_RADIUS: Record<BUTTON_SHAPE, string> = {
	[BUTTON_SHAPE.ROUNDED]: "12px",
	[BUTTON_SHAPE.PILL]: "9999px",
	[BUTTON_SHAPE.SQUARE]: "4px",
};

export function TemplateA({ config, logo, profile, links, storeUrl }: TemplateAProps) {
	const { theme, layout, buttonVariant, buttonShape } = config;

	const borderRadius = BUTTON_SHAPE_RADIUS[buttonShape];

	const backgroundStyle: React.CSSProperties =
		theme.backgroundType === BACKGROUND_TYPE.IMAGE && theme.backgroundImage
			? {
					backgroundImage: `url(${theme.backgroundImage?.url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
			  }
			: { backgroundColor: theme.background };

	const getLinkStyle = (): React.CSSProperties => {
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

	const isGridLayout = layout === LAYOUT.GRID;

	return (
		<div
			className="relative flex flex-col items-center min-h-full w-full px-4 py-10 gap-5"
			style={{ ...backgroundStyle, color: theme.text }}
		>
			{/* Backdrop overlay for image backgrounds */}
			{theme.backgroundType === BACKGROUND_TYPE.IMAGE &&
				theme.backgroundImage && (
					<div className="absolute inset-0 bg-black/35 pointer-events-none" />
				)}

			{/* Profile section */}
			<div className="relative z-10 flex flex-col items-center gap-3 text-center w-full">
				{logo?.url ? (
					<Image
						src={logo.url}
						width={80}
						height={80}
						alt={profile?.title ?? "Your Name"}
						className="w-20 h-20 rounded-full object-cover"
						style={{ outline: `2px solid ${theme.primary}`, outlineOffset: 2 }}
					/>
				) : (
					<div
						className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
						style={{ backgroundColor: theme.primary, color: theme.background }}
					>
						{(profile?.title ?? "?").charAt(0).toUpperCase()}
					</div>
				)}

				<div className="flex flex-col gap-1">
					<h1
						className="text-base font-bold leading-tight"
						style={{ color: theme.text }}
					>
						{profile?.title ?? "Your Name"}
					</h1>
					{profile?.bio && (
						<p
							className="text-xs leading-relaxed max-w-[200px]"
							style={{ color: theme.text, opacity: 0.65 }}
						>
							{profile?.bio}
						</p>
					)}
				</div>
			</div>

			{/* View Items CTA */}
			<div className="relative z-10 w-full">
				<a
					href={storeUrl ?? "#"}
					target="_blank"
					rel="noopener noreferrer"
					className="group w-full flex items-center justify-between gap-2 py-3 px-4 font-semibold text-sm transition-opacity hover:opacity-90"
					style={{
						backgroundColor: theme.primary,
						color: theme.background,
						borderRadius,
					}}
				>
					<div className="flex items-center gap-2">
						{/* Shopping bag icon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
							<line x1="3" x2="21" y1="6" y2="6" />
							<path d="M16 10a4 4 0 0 1-8 0" />
						</svg>
						<span>View Items</span>
					</div>
					{/* Arrow */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="13"
						height="13"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						style={{ opacity: 0.7 }}
					>
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</a>
			</div>

			{/* Social / custom links */}
			<div
				className={`relative z-10 w-full ${
					isGridLayout ? "grid grid-cols-2 gap-2" : "flex flex-col gap-2"
				}`}
			>
				{links?.length === 0 ? (
					<p
						className="text-center text-xs py-6"
						style={{ color: theme.text, opacity: 0.35 }}
					>
						No links added yet
					</p>
				) : (
					links?.map(link => {
						const platform = getPlatformByName(link.name);

						if (isGridLayout) {
							return (
								<a
									key={link.name}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 border text-[10px] font-semibold transition-opacity hover:opacity-80"
									style={getLinkStyle()}
								>
									{platform ? (
										<svg
											viewBox="0 0 24 24"
											className="w-5 h-5 shrink-0"
											fill="currentColor"
											aria-hidden="true"
										>
											<path d={platform.svgPath} />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
											<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
										</svg>
									)}
									<span className="truncate max-w-full">{link.name}</span>
								</a>
							);
						}

						return (
							<a
								key={link.name}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full flex items-center gap-2.5 py-2.5 px-4 border text-xs font-semibold transition-opacity hover:opacity-80"
								style={getLinkStyle()}
							>
								{platform ? (
									<svg
										viewBox="0 0 24 24"
										className="w-4 h-4 shrink-0"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d={platform.svgPath} />
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
										<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
									</svg>
								)}
								<span className="flex-1 text-center">{link.name}</span>
							</a>
						);
					})
				)}
			</div>
		</div>
	);
}
