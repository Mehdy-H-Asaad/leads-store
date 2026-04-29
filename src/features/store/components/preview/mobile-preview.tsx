"use client";

import { TEMPLATE_ID } from "@/shared/contracts/store/store.contract";
import { TEMPLATES } from "../templates";
import { TTemplateProps } from "../../types/store.types";

type MobilePreviewProps = {
	templateId: string;
	templateProps: TTemplateProps;
};

export function MobilePreview({
	templateId,
	templateProps,
}: MobilePreviewProps) {
	const Template = TEMPLATES[templateId] ?? TEMPLATES[TEMPLATE_ID.TEMPLATE_A];

	return (
		<div className="flex flex-col items-center gap-3 select-none">
			{/* <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
				Preview
			</p> */}

			<div className="relative overflow-hidden">
				<div
					className="w-[272px] h-[530px] rounded-[44px] border-[7px] shadow-2xl overflow-hidden relative"
					style={{ borderColor: "hsl(var(--border))" }}
				>
					{/* Status bar */}
					<div
						className="absolute top-0 left-0 right-0 h-8 z-10 flex items-center justify-between px-6"
						style={{ backgroundColor: "transparent" }}
					>
						<span className="text-[9px] font-semibold opacity-60">9:41</span>
						<div className="flex items-center gap-1 opacity-60">
							<svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
								<rect x="0" y="4" width="2" height="4" rx="0.5" />
								<rect x="3" y="2.5" width="2" height="5.5" rx="0.5" />
								<rect x="6" y="1" width="2" height="7" rx="0.5" />
								<rect x="9" y="0" width="2" height="8" rx="0.5" />
							</svg>
							<svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor">
								<rect
									x="0.5"
									y="0.5"
									width="11"
									height="7"
									rx="2"
									stroke="currentColor"
									strokeWidth="1"
									fill="none"
									opacity="0.4"
								/>
								<rect x="1.5" y="1.5" width="7" height="5" rx="1.5" />
								<rect x="11.5" y="2.5" width="2" height="3" rx="1" />
							</svg>
						</div>
					</div>

					{/* Dynamic island */}
					<div
						className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full z-20"
						style={{ backgroundColor: "#000" }}
					/>

					{/* Screen content */}
					<div className="w-full h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-6">
						<Template {...templateProps} />
					</div>
				</div>

				{/* Home indicator */}
				<div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-foreground/25" />
			</div>
		</div>
	);
}
