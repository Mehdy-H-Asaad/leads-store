import { TCustomizationConfig } from "@/entities/customization/model/customization.model";
import { TFileSchema } from "@/shared/schema/file.schema";

export type TTemplateProps = {
	config: TCustomizationConfig;
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
};
