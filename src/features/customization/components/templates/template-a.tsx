import { TCustomizationConfig } from "@/entities/customization/model/customization.model";
import {
	BACKGROUND_TYPE,
	BUTTON_SHAPE,
	BUTTON_VARIANT,
	FONT,
	LAYOUT,
} from "@/shared/contracts/customization/customization.contract";
import { TFileSchema } from "@/shared/schema/file.schema";
import { TFeaturedItem } from "../../types/customization.types";
import { getPlatformByName } from "../../lib/platforms-config";
import Image from "next/image";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

type TemplateAProps = {
	config: TCustomizationConfig;
	logo: TFileSchema | null;
	logoPreview?: string | null;
	qrCode: TFileSchema | null;
	backgroundPreview?: string | null;
	profile:
		| {
				title: string;
				bio?: string;
		  }
		| undefined;
	links: { name: string; url: string }[];
	storeUrl?: string;
	featuredItems?: TFeaturedItem[];
};

const FONT_FAMILY_MAP: Record<FONT, string> = {
	[FONT.INTER]: "var(--font-inter), Inter, sans-serif",
	[FONT.ROBOTO]: "var(--font-roboto), Roboto, sans-serif",
	[FONT.POPPINS]: "var(--font-poppins), Poppins, sans-serif",
	[FONT.MONTSERRAT]: "var(--font-montserrat), Montserrat, sans-serif",
	// [FONT.SEKUYA]: "var(--font-sekuya), Sekuya, sans-serif",
	[FONT.RUBIK]: "var(--font-rubik), Rubik, sans-serif",
	[FONT.ARCHIVO_BLACK]: "var(--font-archivo-black), Archivo Black, sans-serif",
	[FONT.LATO]: "var(--font-lato), Lato, sans-serif",
};

const BUTTON_SHAPE_RADIUS: Record<BUTTON_SHAPE, string> = {
	[BUTTON_SHAPE.ROUNDED]: "12px",
	[BUTTON_SHAPE.PILL]: "9999px",
	[BUTTON_SHAPE.SQUARE]: "4px",
};

export function TemplateA({
	config,
	logo,
	logoPreview,
	backgroundPreview,
	profile,
	links,
	storeUrl,
	qrCode,
	featuredItems,
}: TemplateAProps) {
	const { theme, layout, buttonVariant, buttonShape } = config;

	const borderRadius = BUTTON_SHAPE_RADIUS[buttonShape];
	const hasImageBg =
		theme.backgroundType === BACKGROUND_TYPE.IMAGE &&
		(theme.backgroundImage?.url || backgroundPreview);

	const backgroundStyle: React.CSSProperties = hasImageBg
		? {
				backgroundImage: `url(${
					theme.backgroundImage?.url ?? backgroundPreview
				})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
		  }
		: { backgroundColor: theme.background };

	const getLinkStyle = (): React.CSSProperties => {
		if (buttonVariant === BUTTON_VARIANT.FILLED) {
			return {
				// backgroundColor: theme.primary,
				backgroundColor: "#dd6156",
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

	// Split links: known platforms → icon row, custom → button list
	const socialLinks = links?.filter(l => getPlatformByName(l.name)) ?? [];
	const customLinks = links?.filter(l => !getPlatformByName(l.name)) ?? [];

	return (
		<div
			className="relative flex flex-col items-center min-h-full w-full px-5 py-10 gap-6"
			style={{
				...backgroundStyle,
				color: theme.text,
				fontFamily: FONT_FAMILY_MAP[theme.font],
			}}
		>
			{/* Backdrop overlay for image backgrounds */}
			{hasImageBg && (
				<div className="absolute inset-0 bg-black/40 pointer-events-none" />
			)}

			{/* ── Profile section ── */}
			<div className="relative z-10 flex flex-col items-center gap-3 text-center w-full">
				{/* Avatar */}
				<div className="relative">
					{logo?.url || logoPreview ? (
						<Image
							src={logo?.url ?? logoPreview!}
							width={88}
							height={88}
							alt={profile?.title ?? "Your Name"}
							className="w-[88px] h-[88px] rounded-full object-cover"
							style={{
								boxShadow: `0 0 0 3px ${theme.primary}, 0 0 0 5px ${theme.background}`,
							}}
						/>
					) : (
						<div
							className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-3xl font-bold shrink-0"
							style={{
								backgroundColor: theme.primary,
								color: theme.background,
								boxShadow: `0 0 0 3px ${theme.primary}44, 0 4px 20px ${theme.primary}44`,
							}}
						>
							{(profile?.title ?? "?").charAt(0).toUpperCase()}
						</div>
					)}
					{/* Online dot */}
					<span
						className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2"
						style={{
							backgroundColor: "#22c55e",
							borderColor: theme.background,
						}}
					/>
				</div>

				{/* Name + bio */}
				<div className="flex flex-col gap-1.5">
					<h1
						className="text-[17px] font-bold leading-tight tracking-tight"
						style={{ color: theme.text }}
					>
						{profile?.title ?? "Your Name"}
					</h1>
					{profile?.bio && (
						<p
							className="text-[11px] leading-relaxed max-w-[210px] mx-auto"
							style={{ color: theme.text, opacity: 0.6 }}
						>
							{profile.bio}
						</p>
					)}
				</div>

				{/* ── Social icon bubbles (Linktree-style) ── */}
				{socialLinks.length > 0 && (
					<div className="flex items-center gap-2.5 flex-wrap justify-center mt-0.5">
						{socialLinks.map(link => {
							const platform = getPlatformByName(link.name)!;
							return (
								<a
									key={link.name}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									title={platform.name}
									className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
									style={{
										backgroundColor: `${theme.primary}20`,
										color: theme.primary,
										boxShadow: `0 0 0 1px ${theme.primary}30`,
									}}
								>
									<svg
										viewBox="0 0 24 24"
										className="w-4 h-4"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d={platform.svgPath} />
									</svg>
								</a>
							);
						})}
					</div>
				)}
			</div>

			{/* ── View Items CTA ── */}
			{storeUrl && (
				<div className="relative z-10 w-full">
					<Link
						href={storeUrl}
						className="border border-primary rounded-full shadow-md text-primary group relative w-full flex items-center justify-center gap-3 py-3 px-5 font-bold text-[13px] tracking-wide overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
						// style={{
						// 	backgroundColor: theme.primary,
						// 	color: theme.background,
						// 	borderRadius,
						// 	boxShadow: `0 6px 20px ${theme.primary}55, 0 1px 0 ${theme.primary}88 inset`,
						// }}
					>
						{/* Shine sweep on hover */}
						<span
							className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							style={{
								background: `linear-gradient(105deg, transparent 40%, ${theme.background}18 50%, transparent 60%)`,
							}}
						/>

						<span>Explore store</span>

						{/* Arrow bubble */}
						<span
							className="flex items-center justify-center w-5 h-5 rounded-full shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
							style={{ backgroundColor: `${theme.background}25` }}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</span>
					</Link>
				</div>
			)}
			{/* ── Custom / non-platform links ── */}
			{customLinks.length > 0 && (
				<div
					className={`relative z-10 w-full ${
						isGridLayout ? "grid grid-cols-2 gap-2.5" : "flex flex-col gap-2.5"
					}`}
				>
					{customLinks.map((link, index) => {
						if (isGridLayout) {
							return (
								<a
									key={link.name + index}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 border text-[10px] font-semibold transition-opacity hover:opacity-80"
									style={getLinkStyle()}
								>
									<ExternalLinkIcon className="w-4 h-4" />
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
								className="w-full flex items-center gap-3 py-3 px-5 border text-xs font-semibold transition-opacity hover:opacity-80"
								style={getLinkStyle()}
							>
								<span className="flex-1 text-center">{link.name}</span>
							</a>
						);
					})}
				</div>
			)}
			{/* ── Featured items preview ── */}
			{featuredItems && featuredItems.length > 0 && storeUrl && (
				<div className="relative z-10 w-full flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<p
							className="text-[11px] font-semibold uppercase tracking-widest"
							style={{ color: theme.text, opacity: 0.45 }}
						>
							Featured
						</p>
						<Link
							href={storeUrl}
							className="text-[10px] font-semibold flex items-center gap-1 transition-opacity hover:opacity-70"
							style={{ color: theme.primary }}
						>
							See all
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-2.5">
						{featuredItems.slice(0, 4).map(item => (
							<Link
								key={item.id}
								href={`${storeUrl.replace("/items", "")}/items/${item.slug}`}
								className="group flex flex-col overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
								style={{ borderRadius }}
							>
								{/* Thumbnail */}
								<div
									className="w-full aspect-square overflow-hidden relative"
									style={{ backgroundColor: `${theme.primary}15` }}
								>
									{item.thumbnail?.url != null ? (
										<Image
											src={item.thumbnail.url}
											alt={item.name}
											// fill
											width={200}
											height={200}
											className="object-cover w-full h-full"
											// sizes="120px"
										/>
									) : (
										<div
											className="w-full h-full flex items-center justify-center"
											style={{ color: theme.primary, opacity: 0.3 }}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<rect width="18" height="18" x="3" y="3" rx="2" />
												<circle cx="9" cy="9" r="2" />
												<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
											</svg>
										</div>
									)}
								</div>
								{/* Info */}
								<div
									className="px-2 py-1.5 flex flex-col gap-0.5"
									style={{
										backgroundColor: `${theme.primary}10`,
									}}
								>
									<p
										className="text-[10px] font-semibold leading-tight truncate"
										style={{ color: theme.text }}
									>
										{item.name}
									</p>
									<p
										className="text-[11px] font-bold"
										style={{ color: theme.primary }}
									>
										${item.price.toFixed(2)}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}

			{/* Empty state when no links at all */}
			{links?.length === 0 && (
				<p
					className="relative z-10 text-center text-xs py-6"
					style={{ color: theme.text, opacity: 0.35 }}
				>
					No links added yet
				</p>
			)}

			{/* ── Reelvee branded footer ── */}
			<div className="relative z-10 w-full mt-auto pt-6 flex flex-col items-center gap-5">
				{/* QR code (optional) */}
				{qrCode?.url && (
					<div className="flex flex-col items-center gap-2">
						<div
							className="p-2.5 rounded-2xl"
							style={{ backgroundColor: `${theme.text}10` }}
						>
							<Image
								src={qrCode.url}
								alt="Store QR Code"
								width={80}
								height={80}
								className="w-20 h-20 rounded-xl object-contain"
							/>
						</div>
						<p
							className="text-[9px] font-medium uppercase tracking-widest"
							style={{ color: theme.text, opacity: 0.35 }}
						>
							Scan to visit store
						</p>
					</div>
				)}

				{/* Divider */}
				<div
					className="w-full h-px"
					style={{ backgroundColor: `${theme.text}12` }}
				/>

				{/* "Powered by reelvee" CTA */}
				<a
					href="https://reelvee.com"
					target="_blank"
					rel="noopener noreferrer"
					className="group flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
				>
					<p
						className="text-[9px] uppercase tracking-[0.18em] font-medium"
						style={{ color: theme.text, opacity: 0.4 }}
					>
						Powered by
					</p>
					<div className="flex items-center gap-1.5">
						<span
							className="text-sm font-bold tracking-tight"
							style={{ color: theme.text }}
						>
							reelvee
						</span>
					</div>
					<p
						className="text-[9px] font-medium"
						style={{ color: theme.primary, opacity: 0.8 }}
					>
						Create your free store →
					</p>
				</a>

				{/* Legal links */}
				<div
					className="flex items-center gap-3 pb-4"
					style={{ color: theme.text, opacity: 0.3 }}
				>
					{[
						{ label: "Privacy", href: "/privacy-policy" },
						{ label: "Terms", href: "/terms-of-service" },
					].map(({ label, href }) => (
						<Link
							key={label}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[9px] font-medium hover:opacity-70 transition-opacity"
						>
							{label}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
