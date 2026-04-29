import { TStoreConfig } from "@/entities/store/model/store.model";
import { TFileSchema } from "@/shared/schema/file.schema";

export type TFeaturedItem = {
	id: string;
	name: string;
	price: number;
	slug: string;
	thumbnail: { url: string | null } | null;
};

export type TTemplateProps = {
	config: TStoreConfig;
	qrCode: TFileSchema | null;
	logo: TFileSchema | null;
	currency: string;
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
