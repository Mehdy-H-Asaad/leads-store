"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Tag, Handshake } from "lucide-react";
import Link from "next/link";
import { getCardStyle, isLightColor } from "../../lib/storefront.utils";
import type { TStoreConfig } from "@/entities/store/model/store.model";
import type { TStoreItem } from "@/entities/item/model/item.model";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";

type StoreItemCardProps = {
	item: TStoreItem;
	config: TStoreConfig;
	onInquire: (item: TStoreItem) => void;
	storeUrl: string;
	layout: "GRID" | "LIST";
};

export function StoreItemCard({
	item,
	config,
	onInquire,
	storeUrl,
	layout,
}: StoreItemCardProps) {
	const theme = config.theme;
	const cardStyle = getCardStyle(theme);
	const isLight = isLightColor(theme.background);
	const subtleText = isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";
	const isService = item.type === ITEM_TYPE.SERVICE;

	function StatusBadge({
		status,
		primary,
	}: {
		status: TStoreItem["status"];
		primary: string;
	}) {
		const map: Record<string, { label: string; color: string }> = {
			[ITEM_STATUS.IN_STOCK]: { label: "In Stock", color: "#16a34a" },
			[ITEM_STATUS.LOW_STOCK]: { label: "Low Stock", color: "#d97706" },
			[ITEM_STATUS.OUT_OF_STOCK]: { label: "Out of Stock", color: "#dc2626" },
		};
		const { label, color } = map[status] ?? { label: status, color: primary };
		return (
			<span
				className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white`}
				style={{ color }}
			>
				{label}
			</span>
		);
	}

	if (layout === "LIST") {
		return (
			<Link href={`/${storeUrl}/items/${item.slug}`}>
				<motion.div
					layout
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.96 }}
					whileHover={{ y: -2 }}
					style={{ ...cardStyle, cursor: "pointer" }}
					className="overflow-hidden"
					// onClick={() => onClick(item)}
				>
					<div className="flex gap-3 p-3">
						<div
							className="shrink-0 w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center"
							style={{ backgroundColor: `${theme.primary}15` }}
						>
							{item.thumbnail?.url ? (
								<Image
									src={item.thumbnail.url}
									alt={item.name}
									width={80}
									height={80}
									className="w-full h-full object-cover"
								/>
							) : (
								<ShoppingBag
									size={24}
									style={{ color: theme.primary, opacity: 0.6 }}
								/>
							)}
						</div>
						<div className="flex-1 min-w-0 flex flex-col gap-1">
							<div className="flex items-start justify-between gap-2">
								<h3 className="font-semibold text-sm leading-tight line-clamp-2">
									{item.name}
								</h3>
								<StatusBadge status={item.status} primary={theme.primary} />
							</div>
							{item.description && (
								<p
									className="text-xs line-clamp-2"
									style={{ color: subtleText }}
								>
									{item.description}
								</p>
							)}
							<div className="flex items-center justify-between mt-auto pt-1">
								<span
									className="font-bold text-"
									style={{ color: theme.primary }}
								>
									{isService ? "From " : ""}
									{item.price.toLocaleString()} AED
								</span>
								<motion.button
									whileTap={{ scale: 0.95 }}
									onClick={e => {
										e.stopPropagation();
										onInquire(item);
									}}
									style={{
										backgroundColor: theme.primary,
										color: theme.background,
										border: `2px solid ${theme.primary}`,
										borderRadius: "10px",
										padding: "5px 12px",
										fontSize: "12px",
										fontWeight: 600,
									}}
								>
									Inquire
								</motion.button>
							</div>
						</div>
					</div>
				</motion.div>
			</Link>
		);
	}

	return (
		<Link href={`/${storeUrl}/items/${item.slug}`}>
			<motion.div
				layout
				initial={{ opacity: 0, y: 20, scale: 0.96 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				whileHover={{ y: -4 }}
				style={{ ...cardStyle, cursor: "pointer" }}
				className="overflow-hidden flex flex-col gap-2"
				// onClick={() => onClick(item)}
			>
				<div
					className="relative aspect-square overflow-hidden flex items-center justify-center"
					style={{ backgroundColor: `${theme.primary}12` }}
				>
					{item.thumbnail?.url ? (
						<Image
							src={item.thumbnail.url}
							alt={item.name}
							fill
							className="object-cover"
						/>
					) : (
						<div className="flex flex-col items-center gap-2">
							{isService ? (
								<Handshake
									size={32}
									style={{ color: theme.primary, opacity: 0.5 }}
								/>
							) : (
								<ShoppingBag
									size={32}
									style={{ color: theme.primary, opacity: 0.5 }}
								/>
							)}
						</div>
					)}
					<div className="absolute top-2 right-2">
						<StatusBadge status={item.status} primary={theme.primary} />
					</div>
					{item.categories && item.categories.length > 0 && (
						<div className="absolute bottom-2 left-2">
							<span
								className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full"
								style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "#fff" }}
							>
								<Tag size={9} />
								{item.categories[0].name}
							</span>
						</div>
					)}
				</div>
				<div className="p-3 flex flex-col gap-2 flex-1">
					<h3 className="font-semibold text-sm leading-tight line-clamp-2">
						{item.name}
					</h3>
					{item.description && (
						<p
							className="text-xs line-clamp-2 flex-1"
							style={{ color: subtleText }}
						>
							{item.description}
						</p>
					)}
					<div className="flex items-center justify-between mt-auto">
						<span
							className="font-bold text-sm"
							style={{ color: theme.primary }}
						>
							{isService ? "From " : ""}
							{item.price.toLocaleString()} AED
						</span>
					</div>
					<motion.button
						whileTap={{ scale: 0.95 }}
						onClick={e => {
							e.stopPropagation();
							onInquire(item);
						}}
						style={{
							backgroundColor: theme.primary,
							color: theme.background,
							border: `2px solid ${theme.primary}`,
							borderRadius: "10px",
							padding: "5px 12px",
							fontSize: "13px",
							fontWeight: 600,
							width: "100%",
						}}
					>
						Inquire
					</motion.button>
				</div>
			</motion.div>
		</Link>
	);
}
