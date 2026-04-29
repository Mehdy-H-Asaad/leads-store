import { TStoreConfig } from "@/entities/store/model/store.model";
import {
	BACKGROUND_TYPE,
	BUTTON_SHAPE_RADIUS,
	FONT_CLASS_MAP,
} from "@/shared/contracts/store/store.contract";
import { TFileSchema } from "@/shared/schema/file.schema";
import { TFeaturedItem } from "../../../types/store.types";
import { getPlatformByName } from "../../../lib/platforms-config";
import { CSSProperties } from "react";
import { ProfileSection } from "./components/profile-section";
import { ExploreStoreButton } from "./components/explore-store-button";
import { CustomLinks } from "./components/custom-links";
import { FeaturedItems } from "./components/featured-items";
import { BrandedFooter } from "./components/branded-footer";

type TemplateAProps = {
	config: TStoreConfig;
	logo: TFileSchema | null;
	logoPreview?: string | null;
	currency: string;
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

export function TemplateA({
	config,
	logo,
	logoPreview,
	backgroundPreview,
	profile,
	links,
	storeUrl,
	currency,
	qrCode,
	featuredItems,
}: TemplateAProps) {
	const { theme, buttonVariant, buttonShape } = config;

	const borderRadius = BUTTON_SHAPE_RADIUS[buttonShape];
	const hasImageBg =
		theme.backgroundType === BACKGROUND_TYPE.IMAGE &&
		(theme.backgroundImage?.url || backgroundPreview);

	const backgroundStyle: CSSProperties = hasImageBg
		? {
				backgroundImage: `url(${
					theme.backgroundImage?.url ?? backgroundPreview
				})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
		  }
		: { backgroundColor: theme.background };

	const socialLinks = links?.filter(l => getPlatformByName(l.name)) ?? [];
	const customLinks = links?.filter(l => !getPlatformByName(l.name)) ?? [];

	return (
		<div
			className="relative flex flex-col items-center min-h-full w-full px-5 py-10 gap-6"
			style={{
				...backgroundStyle,
				fontFamily: FONT_CLASS_MAP[theme.font],
			}}
		>
			{hasImageBg && (
				<div className="absolute inset-0 bg-black/40 pointer-events-none" />
			)}

			<ProfileSection
				logo={logo}
				logoPreview={logoPreview}
				profile={profile}
				socialLinks={socialLinks}
				theme={theme}
			/>

			<ExploreStoreButton
				storeUrl={storeUrl}
				theme={theme}
				borderRadius={borderRadius}
			/>

			<CustomLinks
				customLinks={customLinks}
				storeUrl={storeUrl}
				buttonVariant={buttonVariant}
				theme={theme}
				borderRadius={borderRadius}
			/>

			{featuredItems && featuredItems.length > 0 && storeUrl && (
				<FeaturedItems
					featuredItems={featuredItems}
					storeUrl={storeUrl}
					currency={currency}
					theme={theme}
					borderRadius={borderRadius}
				/>
			)}

			{links?.length === 0 && (
				<p
					className="relative z-10 text-center text-xs py-6"
					style={{ color: theme.text, opacity: 0.35 }}
				>
					No links added yet
				</p>
			)}

			<BrandedFooter qrCode={qrCode} theme={theme} />
		</div>
	);
}
