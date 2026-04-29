import { TStoreTheme } from "@/entities/store/model/store.model";
import { TFileSchema } from "@/shared/schema/file.schema";
import { getPlatformByName } from "../../../../lib/platforms-config";
import Image from "next/image";
import Link from "next/link";

type ProfileSectionProps = {
	logo: TFileSchema | null;
	logoPreview?: string | null;
	profile: { title: string; bio?: string } | undefined;
	socialLinks: { name: string; url: string }[];
	theme: TStoreTheme;
};

export function ProfileSection({
	logo,
	logoPreview,
	profile,
	socialLinks,
	theme,
}: ProfileSectionProps) {
	return (
		<div className="relative z-10 flex flex-col items-center gap-3 text-center w-full">
			<div className="relative">
				{logo?.url || logoPreview ? (
					<Image
						src={logo?.url ?? logoPreview!}
						width={120}
						height={120}
						alt={profile?.title ?? "Your Name"}
						className="w-[120px] h-[120px] rounded-full object-cover"
						style={{
							boxShadow: `0 0 0 3px ${theme.primary}, 0 0 0 5px ${theme.background}`,
						}}
					/>
				) : (
					<div
						className="w-[120px] h-[120px] rounded-full flex items-center justify-center text-3xl font-bold shrink-0"
						style={{
							backgroundColor: theme.primary,
							color: theme.background,
						}}
					>
						{(profile?.title ?? "?").charAt(0).toUpperCase()}
					</div>
				)}
				<span
					className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full border-2"
					style={{
						backgroundColor: "#22c55e",
						borderColor: theme.background,
					}}
				/>
			</div>

			<div className="flex flex-col gap-1.5">
				<h1
					className="text-base sm:text-2xl font-bold leading-tight tracking-tight"
					style={{ color: theme.text }}
				>
					{profile?.title ?? "Your Name"}
				</h1>
				{profile?.bio && (
					<p
						className="text-xs sm:text-sm leading-relaxed max-w-[210px] mx-auto"
						style={{ color: theme.text, opacity: 0.6 }}
					>
						{profile.bio}
					</p>
				)}
			</div>

			{socialLinks.length > 0 && (
				<div className="flex items-center gap-2.5 flex-wrap justify-center mt-0.5">
					{socialLinks.map(link => {
						const platform = getPlatformByName(link.name)!;
						return (
							<Link
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
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}
