import { TCustomizationConfig } from "@/entities/customization/model/customization.model";
import { TFileSchema } from "@/shared/schema/file.schema";

export type TFeaturedItem = {
	id: string;
	name: string;
	price: number;
	slug: string;
	thumbnail: { url: string | null } | null;
};

export type TTemplateProps = {
	config: TCustomizationConfig;
	qrCode: TFileSchema | null;
	logo: TFileSchema | null;
	logoPreview?: string | null;
	backgroundPreview?: string | null;
	profile:
		| {
				title: string;
				bio?: string;
		  }
		| undefined;
	links: { name: string; url: string }[];
	featuredItems?: TFeaturedItem[];
};
