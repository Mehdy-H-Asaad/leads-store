"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, Store } from "lucide-react";
import {
	getButtonStyle,
	getContainerStyle,
	getCardStyle,
	isLightColor,
} from "../lib/storefront.utils";
import type { TCustomization } from "@/entities/customization/model/customization.model";
import { BACKGROUND_TYPE } from "@/shared/contracts/customization/customization.contract";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.1 },
	},
} as const;

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring" as const, stiffness: 300, damping: 25 },
	},
} as const;

type StoreProfileProps = {
	store: TCustomization;
	storeUrl: string;
};

export function StoreProfile({ store, storeUrl }: StoreProfileProps) {
	const { config, logo, links } = store;
	const theme = config.theme;
	const profile = config.profile;
	const btnStyle = getButtonStyle(config);
	const containerStyle = getContainerStyle(theme);
	const cardStyle = getCardStyle(theme);
	const isLight = isLightColor(theme.background);
	const subtleText = isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";

	const innerBgStyle: React.CSSProperties =
		theme.backgroundType === BACKGROUND_TYPE.IMAGE && theme.backgroundImage?.url
			? {
					backgroundImage: `url(${theme.backgroundImage.url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
			  }
			: { backgroundColor: theme.background };

	return (
		<div className="min-h-dvh w-full flex justify-center bg-[#e8e8e8] pt-10">
			<div
				className="relative w-full max-w-[430px] min-h-dvh flex flex-col items-center shadow-2xl rounded-t-2xl"
				style={{ ...innerBgStyle, ...containerStyle }}
			>
				{theme.backgroundType === BACKGROUND_TYPE.IMAGE &&
					theme.backgroundImage?.url && (
						<div
							className="absolute inset-0 -z-10"
							style={{ backgroundColor: "rgba(0,0,0,0.38)" }}
						/>
					)}

				<div className="relative z-10 w-full px-5 py-12 flex flex-col items-center gap-6">
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
						className="relative"
					>
						{logo?.url ? (
							<div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/20">
								<Image
									src={logo.url}
									alt={profile.title}
									width={96}
									height={96}
									className="w-full h-full object-cover"
								/>
							</div>
						) : (
							<div
								className="w-24 h-24 rounded-full flex items-center justify-center"
								style={{ backgroundColor: theme.primary + "22" }}
							>
								<Store size={36} style={{ color: theme.primary }} />
							</div>
						)}
						<motion.div
							className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white"
							style={{ backgroundColor: theme.primary }}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.4, type: "spring" }}
						/>
					</motion.div>

					<motion.div
						className="text-center space-y-2"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.15, duration: 0.4 }}
					>
						<h1 className="text-2xl font-bold tracking-tight">
							{profile.title}
						</h1>
						{profile.bio && (
							<p
								className="text-sm leading-relaxed max-w-[280px]"
								style={{ color: subtleText }}
							>
								{profile.bio}
							</p>
						)}
					</motion.div>

					<motion.div
						className="w-full flex flex-col gap-3"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{links.map(link => (
							<motion.a
								key={link.url}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								variants={itemVariants}
								whileHover={{ scale: 1.02, y: -1 }}
								whileTap={{ scale: 0.98 }}
								style={{
									...btnStyle,
									...cardStyle,
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									padding: "14px 18px",
									textDecoration: "none",
									fontWeight: 500,
									fontSize: "15px",
									transition: "transform 0.2s, box-shadow 0.2s",
								}}
							>
								<span>{link.name}</span>
								<ExternalLink size={15} style={{ opacity: 0.6 }} />
							</motion.a>
						))}

						<motion.div variants={itemVariants}>
							<Link href={`/${storeUrl}/items`} className="block w-full">
								<motion.div
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									style={{
										...btnStyle,
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										padding: "16px 18px",
										fontWeight: 700,
										fontSize: "16px",
										boxShadow: `0 4px 20px ${theme.primary}44`,
										cursor: "pointer",
									}}
								>
									<span>View Items & Services</span>
									<ArrowRight size={18} />
								</motion.div>
							</Link>
						</motion.div>
					</motion.div>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
						className="text-xs mt-4"
						style={{ color: subtleText }}
					>
						Powered by Store Link
					</motion.p>
				</div>
			</div>
		</div>
	);
}
