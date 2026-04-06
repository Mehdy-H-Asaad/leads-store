import { TCustomizationConfig } from "@/entities/customization/model/customization.model";
import {
	BACKGROUND_TYPE,
	BUTTON_SHAPE,
	BUTTON_VARIANT,
	LAYOUT,
} from "@/shared/contracts/customization/customization.contract";
import { TFileSchema } from "@/shared/schema/file.schema";
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
};

const BUTTON_SHAPE_RADIUS: Record<BUTTON_SHAPE, string> = {
	[BUTTON_SHAPE.ROUNDED]: "12px",
	[BUTTON_SHAPE.PILL]: "9999px",
	[BUTTON_SHAPE.SQUARE]: "4px",
};

export function TemplateA({ config, logo, profile, links }: TemplateAProps) {
	const { theme, layout, buttonVariant, buttonShape } = config;

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
		const borderRadius = BUTTON_SHAPE_RADIUS[buttonShape];

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
		<div
			className="relative flex flex-col items-center min-h-full w-full px-4 py-10 gap-6"
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

			{/* Links section */}
			<div
				className={`relative z-10 w-full ${
					layout === LAYOUT.GRID
						? "grid grid-cols-2 gap-2"
						: "flex flex-col gap-2"
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
						return (
							<a
								key={link.name}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border text-xs font-semibold transition-opacity hover:opacity-80"
								style={getLinkStyle()}
							>
								{link.name}
							</a>
						);
					})
				)}
			</div>
		</div>
	);
}
