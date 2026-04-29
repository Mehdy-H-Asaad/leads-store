"use client";

import { useEffect, useState } from "react";
import { useGetMyStore } from "@/entities/store/api/store.query";
import { useUpdateStore } from "../../hooks/use-update-store";
import { MobilePreview } from "../preview/mobile-preview";
import { Button } from "@/shared/components/ui/button";
import { ThemePanel } from "./panels/theme-panel";
import { ProfilePanel } from "./panels/profile-panel";
import { LinksPanel } from "./panels/links-panel";
import { LayoutPanel } from "./panels/layout-panel";
import { cn } from "@/shared/lib/utils";
import { useFileUpload } from "@/shared/hooks/use-file-upload";
import {
	Loader2,
	Save,
	User,
	Link2,
	Palette,
	LayoutTemplate,
} from "lucide-react";
import { storeFormMapper } from "../../lib/store-form.mapper";
import { StoreBuilderSkeleton } from "./store-skeleton";

type TBuilderTab = "profile" | "links" | "theme" | "layout";

const TABS: { id: TBuilderTab; label: string; Icon: React.ElementType }[] = [
	{ id: "profile", label: "Profile", Icon: User },
	{ id: "links", label: "Links", Icon: Link2 },
	{ id: "theme", label: "Theme", Icon: Palette },
	{ id: "layout", label: "Layout", Icon: LayoutTemplate },
];

export function StoreBuilder() {
	const [activeTab, setActiveTab] = useState<TBuilderTab>("profile");

	const { store, isGettingStore } = useGetMyStore();

	const { storeForm, onUpdateStore, isUpdatingStore } = useUpdateStore({
		store: store ?? undefined,
	});

	const logoUpload = useFileUpload({ maxSizeMB: 5 });
	const backgroundUpload = useFileUpload({ maxSizeMB: 5 });

	const watchedValues = storeForm.watch();

	useEffect(() => {
		if (store && storeForm) {
			storeForm.reset(storeFormMapper.fromModelToFormValues(store));
		}
	}, [store, storeForm]);

	if (isGettingStore) {
		return <StoreBuilderSkeleton />;
	}

	return (
		<form
			onSubmit={storeForm.handleSubmit(onUpdateStore)}
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
							QRImage={store?.qrCode?.url ?? ""}
							control={storeForm.control}
							form={storeForm}
							logoUpload={logoUpload}
						/>
					)}
					{activeTab === "links" && <LinksPanel control={storeForm.control} />}
					{activeTab === "theme" && (
						<ThemePanel form={storeForm} backgroundUpload={backgroundUpload} />
					)}
					{activeTab === "layout" && (
						<LayoutPanel control={storeForm.control} />
					)}
				</div>

				{/* Footer */}
				<div className="shrink-0 border-t p-3 flex flex-col gap-2 bg-background">
					<Button
						type="submit"
						className="w-full gap-2"
						disabled={isUpdatingStore}
					>
						{isUpdatingStore ? (
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
						currency: store?.currency ?? "",
						logo: watchedValues.logo,
						logoPreview: logoUpload.preview,
						backgroundPreview: backgroundUpload.preview,
						profile: watchedValues.config?.profile ?? undefined,
						links: watchedValues.links ?? [],
						qrCode: store?.qrCode ?? null,
					}}
				/>
			</div>
		</form>
	);
}
