"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
	ArrowLeft,
	ChevronLeft,
	ChevronRight,
	ShoppingBag,
	Tag,
	Sparkles,
	Package,
	Info,
} from "lucide-react";
import {
	getButtonStyle,
	getCardStyle,
	getContainerStyle,
	isLightColor,
} from "../../lib/storefront.utils";
import { InquiryForm } from "./inquiry-form";
import { ITEM_STATUS, ITEM_TYPE } from "@/shared/contracts/item/item.contract";
import { BACKGROUND_TYPE } from "@/shared/contracts/store/store.contract";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useGetStore } from "@/entities/store/api/store.query";
import { useGetStoreItemBySlug } from "@/entities/item/api/item.query";
import { useRouter } from "next/navigation";

type StoreItemDetailProps = {
	storeUrl: string;
	slug: string;
};

export function StoreItemDetail({ storeUrl, slug }: StoreItemDetailProps) {
	const router = useRouter();
	const { store, isGettingStore } = useGetStore(storeUrl);
	const { item, isGettingItem } = useGetStoreItemBySlug({ storeUrl, slug });
	const [activeImg, setActiveImg] = useState(0);

	const [inquiryOpen, setInquiryOpen] = useState(false);
	const theme = store?.config?.theme;

	if (isGettingItem || isGettingStore)
		return <Skeleton className="w-96 h-dvh mx-auto" />;

	if (!theme || !item)
		return (
			<div className="min-h-dvh flex flex-col items-center justify-center gap-6 px-6 text-center bg-neutral-50">
				<div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
					<Package size={36} className="text-white" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-neutral-800">
						Item Not Found
					</h1>
					<p className="mt-2 text-neutral-500 text-sm max-w-xs">
						This item doesn&apos;t exist or may have been removed.
					</p>
				</div>
			</div>
		);

	const containerStyle = getContainerStyle(theme);

	const innerBgStyle: React.CSSProperties =
		theme.backgroundType === BACKGROUND_TYPE.IMAGE && theme.backgroundImage?.url
			? {
					backgroundImage: `url(${theme.backgroundImage.url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
			  }
			: { backgroundColor: theme.background };

	const { config } = store;
	const cardStyle = getCardStyle(theme);
	const btnStyle = getButtonStyle(config);
	const isLight = isLightColor(theme.background);
	const subtleText = isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";
	const isService = item.type === ITEM_TYPE.SERVICE;

	const allImages = [
		...(item.thumbnail ? [item.thumbnail] : []),
		...item.images,
	].filter(img => img?.url);

	const statusMap: Record<string, { label: string; color: string }> = {
		[ITEM_STATUS.IN_STOCK]: { label: "In Stock", color: "#16a34a" },
		[ITEM_STATUS.LOW_STOCK]: { label: "Low Stock", color: "#d97706" },
		[ITEM_STATUS.OUT_OF_STOCK]: { label: "Out of Stock", color: "#dc2626" },
	};
	const { label: statusLabel, color: statusColor } = statusMap[item.status] ?? {
		label: item.status,
		color: theme.primary,
	};

	return (
		<div className="min-h-dvh w-full flex justify-center bg-[#e8e8e8]">
			<div
				className="relative w-full max-w-[430px] min-h-dvh shadow-2xl overflow-y-auto"
				style={{ ...innerBgStyle, ...containerStyle }}
			>
				{theme.backgroundType === BACKGROUND_TYPE.IMAGE &&
					theme.backgroundImage?.url && (
						<div
							className="absolute inset-0"
							style={{ backgroundColor: "rgba(0,0,0,0.38)" }}
						/>
					)}
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -40 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="w-full max-w-md mx-auto px-5 py-6 flex flex-col gap-5"
				>
					<button
						onClick={() => router.back()}
						className="flex items-center gap-1.5 text-sm font-medium self-start"
						style={{ color: theme.primary }}
					>
						<ArrowLeft size={16} />
						Back
					</button>

					{allImages.length > 0 ? (
						<div
							className="relative rounded-2xl overflow-hidden aspect-square"
							style={cardStyle}
						>
							<AnimatePresence mode="wait">
								<motion.div
									key={activeImg}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									className="absolute inset-0"
								>
									<Image
										src={allImages[activeImg].url!}
										alt={item.name}
										fill
										className="object-cover"
									/>
								</motion.div>
							</AnimatePresence>

							{allImages.length > 1 && (
								<>
									<button
										onClick={() => setActiveImg(p => Math.max(0, p - 1))}
										disabled={activeImg === 0}
										className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full disabled:opacity-30"
										style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
									>
										<ChevronLeft size={18} color="#fff" />
									</button>
									<button
										onClick={() =>
											setActiveImg(p => Math.min(allImages.length - 1, p + 1))
										}
										disabled={activeImg === allImages.length - 1}
										className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full disabled:opacity-30"
										style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
									>
										<ChevronRight size={18} color="#fff" />
									</button>

									<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
										{allImages.map((_, i) => (
											<button
												key={i}
												onClick={() => setActiveImg(i)}
												className="rounded-full transition-all"
												style={{
													width: i === activeImg ? "20px" : "6px",
													height: "6px",
													backgroundColor:
														i === activeImg ? "#fff" : "rgba(255,255,255,0.5)",
												}}
											/>
										))}
									</div>
								</>
							)}
						</div>
					) : (
						<div
							className="aspect-square rounded-2xl flex items-center justify-center"
							style={{ ...cardStyle, backgroundColor: `${theme.primary}12` }}
						>
							{isService ? (
								<Sparkles
									size={64}
									style={{ color: theme.primary, opacity: 0.4 }}
								/>
							) : (
								<ShoppingBag
									size={64}
									style={{ color: theme.primary, opacity: 0.4 }}
								/>
							)}
						</div>
					)}

					<div className="flex flex-col gap-4">
						<div className="flex items-start justify-between gap-3">
							<h1 className="text-xl font-bold leading-tight">{item.name}</h1>
							<span
								className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full mt-0.5"
								style={{
									backgroundColor: `${statusColor}20`,
									color: statusColor,
								}}
							>
								{statusLabel}
							</span>
						</div>

						<div className="flex items-center gap-3">
							<span
								className="text-2xl font-bold"
								style={{ color: theme.primary }}
							>
								{isService ? "From " : ""}
								{item.price.toLocaleString()} AED
							</span>
							<span
								className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
								style={{
									backgroundColor: `${theme.primary}15`,
									color: theme.primary,
								}}
							>
								{isService ? <Sparkles size={11} /> : <Package size={11} />}
								{isService ? "Service" : "Product"}
							</span>
						</div>

						{item.description && (
							<p
								className="text-sm leading-relaxed"
								style={{ color: subtleText }}
							>
								{item.description}
							</p>
						)}

						{item.categories && item.categories.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{item.categories.map(cat => (
									<span
										key={cat.id}
										className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
										style={{
											backgroundColor: `${theme.primary}15`,
											color: theme.primary,
										}}
									>
										<Tag size={10} />
										{cat.name}
									</span>
								))}
							</div>
						)}

						{item.tags && item.tags.length > 0 && (
							<div className="flex flex-wrap gap-1.5">
								{item.tags.map(tag => (
									<span
										key={tag}
										className="text-xs px-2 py-0.5 rounded"
										style={{
											backgroundColor: isLight
												? "rgba(0,0,0,0.06)"
												: "rgba(255,255,255,0.1)",
											color: subtleText,
										}}
									>
										#{tag}
									</span>
								))}
							</div>
						)}

						{item.attributes && item.attributes.length > 0 && (
							<div
								style={{ ...cardStyle, padding: "12px" }}
								className="rounded-xl"
							>
								<p
									className="text-xs font-semibold mb-2 flex items-center gap-1"
									style={{ color: subtleText }}
								>
									<Info size={12} />
									Details
								</p>
								<div className="grid grid-cols-2 gap-2">
									{item.attributes.map(attr => (
										<div key={attr.name}>
											<p className="text-xs" style={{ color: subtleText }}>
												{attr.name}
											</p>
											<p className="text-sm font-medium">{attr.value}</p>
										</div>
									))}
								</div>
							</div>
						)}

						<motion.button
							whileHover={{ scale: 1.01 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => setInquiryOpen(true)}
							disabled={item.status === ITEM_STATUS.OUT_OF_STOCK}
							style={{
								...btnStyle,
								padding: "15px",
								fontSize: "16px",
								fontWeight: 700,
								width: "100%",
								cursor:
									item.status === ITEM_STATUS.OUT_OF_STOCK
										? "not-allowed"
										: "pointer",
								opacity: item.status === ITEM_STATUS.OUT_OF_STOCK ? 0.5 : 1,
								boxShadow: `0 4px 20px ${theme.primary}44`,
							}}
						>
							{item.status === ITEM_STATUS.OUT_OF_STOCK
								? "Out of Stock"
								: "Send Inquiry"}
						</motion.button>
					</div>
				</motion.div>

				<InquiryForm
					isOpen={inquiryOpen}
					onClose={() => setInquiryOpen(false)}
					item={item}
					storeUrl={storeUrl}
					config={config}
				/>
			</div>
		</div>
	);
}
