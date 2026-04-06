"use client";

import { useEffect, useState } from "react";
import { useGetMyCustomization } from "@/entities/customization/api/customization.query";
import { useUpdateCustomization } from "../../hooks/use-update-customization";
import { MobilePreview } from "../preview/mobile-preview";
import { Button } from "@/shared/components/ui/button";
import { ThemePanel } from "./panels/theme-panel";
import { ProfilePanel } from "./panels/profile-panel";
import { LinksPanel } from "./panels/links-panel";
import { LayoutPanel } from "./panels/layout-panel";
import { cn } from "@/shared/lib/utils";
import {
	Loader2,
	Save,
	User,
	Link2,
	Palette,
	LayoutTemplate,
} from "lucide-react";
import { customizationFormMapper } from "../../lib/customization-form.mapper";
import { CustomizationBuilderSkeleton } from "./customization-skeletion";

type TBuilderTab = "profile" | "links" | "theme" | "layout";

const TABS: { id: TBuilderTab; label: string; Icon: React.ElementType }[] = [
	{ id: "profile", label: "Profile", Icon: User },
	{ id: "links", label: "Links", Icon: Link2 },
	{ id: "theme", label: "Theme", Icon: Palette },
	{ id: "layout", label: "Layout", Icon: LayoutTemplate },
];

export function CustomizationBuilder() {
	const [activeTab, setActiveTab] = useState<TBuilderTab>("profile");

	const { customization, isGettingCustomization } = useGetMyCustomization();

	const { CustomizationForm, onUpdateCustomization, isUpdatingCustomization } =
		useUpdateCustomization({ customization: customization ?? undefined });

	const watchedValues = CustomizationForm.watch();

	useEffect(() => {
		if (customization && CustomizationForm) {
			CustomizationForm.reset(
				customizationFormMapper.fromModelToFormValues(customization)
			);
		}
	}, [customization, CustomizationForm]);

	if (isGettingCustomization) {
		return <CustomizationBuilderSkeleton />;
	}

	return (
		<form
			onSubmit={CustomizationForm.handleSubmit(onUpdateCustomization)}
			className="flex gap-0 h-[calc(100vh-200px)] min-h-[560px]"
		>
			{/* Left panel */}
			<div className="flex flex-col w-[380px] shrink-0 border rounded-xl overflow-hidden">
				{/* Tab bar */}
				<div className="flex border-b bg-muted/30 shrink-0">
					{TABS.map(({ id, label, Icon }) => (
						<button
							key={id}
							type="button"
							onClick={() => setActiveTab(id)}
							className={cn(
								"flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-medium transition-all",
								activeTab === id
									? "text-primary border-b-2 border-primary bg-background"
									: "text-muted-foreground hover:text-foreground hover:bg-muted/50"
							)}
						>
							<Icon className="size-4" />
							{label}
						</button>
					))}
				</div>

				{/* Panel content */}
				<div className="flex-1 overflow-y-auto p-4">
					{activeTab === "profile" && (
						<ProfilePanel
							QRImage={customization?.qrCode?.url ?? ""}
							control={CustomizationForm.control}
							form={CustomizationForm}
						/>
					)}
					{activeTab === "links" && (
						<LinksPanel control={CustomizationForm.control} />
					)}
					{activeTab === "theme" && <ThemePanel form={CustomizationForm} />}
					{activeTab === "layout" && (
						<LayoutPanel control={CustomizationForm.control} />
					)}
				</div>

				{/* Footer */}
				<div className="shrink-0 border-t p-3 flex flex-col gap-2 bg-background">
					<Button
						type="submit"
						className="w-full gap-2"
						disabled={isUpdatingCustomization}
					>
						{isUpdatingCustomization ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<Save className="size-4" />
						)}
						Save Changes
					</Button>
				</div>
			</div>

			{/* Preview */}
			<div className="flex-1 flex items-start justify-center overflow-y-auto pt-6 px-8">
				<MobilePreview
					templateId={watchedValues.templateId}
					templateProps={{
						config: watchedValues.config,
						logo: watchedValues.logo,
						profile: watchedValues.config?.profile ?? undefined,
						links: watchedValues.links ?? [],
					}}
				/>
			</div>
		</form>
	);
}
