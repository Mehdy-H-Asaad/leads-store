import { TStoreTheme } from "@/entities/store/model/store.model";
import { TFileSchema } from "@/shared/schema/file.schema";
import Image from "next/image";
import Link from "next/link";

type BrandedFooterProps = {
	qrCode: TFileSchema | null;
	theme: TStoreTheme;
};

const LEGAL_LINKS = [
	{ label: "Privacy", href: "/privacy-policy" },
	{ label: "Terms", href: "/terms-of-service" },
];

export function BrandedFooter({ qrCode, theme }: BrandedFooterProps) {
	return (
		<div className="relative z-10 w-full mt-auto pt-6 flex flex-col items-center gap-5">
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

			<div
				className="w-full h-px"
				style={{ backgroundColor: `${theme.text}12` }}
			/>

			<Link
				href="https://reelvee.com"
				target="_blank"
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
			</Link>

			<div
				className="flex items-center gap-3 pb-4"
				style={{ color: theme.text, opacity: 0.3 }}
			>
				{LEGAL_LINKS.map(({ label, href }) => (
					<Link
						key={label}
						href={href}
						className="text-[9px] font-medium hover:opacity-70 transition-opacity"
					>
						{label}
					</Link>
				))}
			</div>
		</div>
	);
}
