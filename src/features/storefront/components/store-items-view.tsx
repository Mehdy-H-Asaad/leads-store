"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	ArrowLeft,
	LayoutGrid,
	LayoutList,
	SearchX,
	Store,
	X,
	FileX2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CategoryFilter } from "./category-filter";
import { StoreItemCard } from "./store-item-card";
import { StoreItemDetail } from "./store-item-detail";
// import { InquiryModal } from "./inquiry-modal";
import {
	getContainerStyle,
	getCardStyle,
	isLightColor,
} from "../lib/storefront.utils";
import type { TStoreItem } from "@/entities/item/model/item.model";
import type { TCategoryRefContract } from "@/shared/contracts/category/category.contract";
import {
	BACKGROUND_TYPE,
	LAYOUT,
} from "@/shared/contracts/customization/customization.contract";
import { useGetStoreCustomization } from "@/entities/customization/api/customization.query";
import { useGetStoreItems } from "@/entities/item/api/item.query";
import { Skeleton } from "@/shared/components/ui/skeleton";

type StoreItemsViewProps = {
	storeUrl: string;
};

export function StoreItemsView({ storeUrl }: StoreItemsViewProps) {
	const [selectedCategory, setSelectedCategory] = useState<
		string | undefined
	>();
	const [inquiryItem, setInquiryItem] = useState<TStoreItem | null>(null);

	const { customization: store } = useGetStoreCustomization(storeUrl);

	const [layout, setLayout] = useState<LAYOUT>(
		(store?.config.layout as LAYOUT) ?? LAYOUT.GRID
	);

	const { items, isGettingItems } = useGetStoreItems({
		storeUrl,
		filters: { category_id: selectedCategory },
	});

	const config = store?.config;
	const theme = config?.theme;
	const containerStyle = theme ? getContainerStyle(theme) : {};
	const cardStyle = theme ? getCardStyle(theme) : {};
	const isLight = theme ? isLightColor(theme.background) : true;

	const innerBgStyle: React.CSSProperties = theme
		? theme.backgroundType === BACKGROUND_TYPE.IMAGE &&
		  theme.backgroundImage?.url
			? {
					backgroundImage: `url(${theme.backgroundImage.url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundAttachment: "local",
			  }
			: { backgroundColor: theme.background }
		: {};

	const categories = useMemo<TCategoryRefContract[]>(() => {
		const seen = new Set<string>();
		const result: TCategoryRefContract[] = [];
		for (const item of items) {
			for (const cat of item.categories ?? []) {
				if (!seen.has(cat.id)) {
					seen.add(cat.id);
					result.push(cat);
				}
			}
		}
		return result;
	}, [items]);

	if (!store || !config || !theme) return null;

	return (
		<div className="min-h-dvh w-full flex justify-center bg-[#e8e8e8]">
			<div
				className="relative w-full max-w-[430px] min-h-dvh flex flex-col shadow-2xl"
				style={{ ...innerBgStyle, ...containerStyle }}
			>
				{theme.backgroundType === BACKGROUND_TYPE.IMAGE &&
					theme.backgroundImage?.url && (
						<div
							className="absolute inset-0 pointer-events-none"
							style={{ backgroundColor: "rgba(0,0,0,0.38)" }}
						/>
					)}

				<div
					className="sticky top-0 z-10 w-full"
					style={{
						backgroundColor:
							theme.backgroundType === BACKGROUND_TYPE.COLOR
								? theme.background
								: "rgba(0,0,0,0.55)",
						backdropFilter:
							theme.backgroundType === BACKGROUND_TYPE.IMAGE
								? "blur(20px)"
								: undefined,
						borderBottom: `1px solid ${
							isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)"
						}`,
					}}
				>
					<div className="flex items-center gap-3 px-5 py-3">
						<Link href={`/${storeUrl}`} className="p-1 shrink-0">
							<ArrowLeft size={20} style={{ color: theme.text }} />
						</Link>

						<div className="flex items-center gap-2 flex-1 min-w-0">
							{store.logo?.url ? (
								<Image
									src={store.logo.url}
									alt={config.profile.title}
									width={28}
									height={28}
									className="rounded-full object-cover shrink-0"
								/>
							) : (
								<div
									className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
									style={{ backgroundColor: `${theme.primary}22` }}
								>
									<Store size={14} style={{ color: theme.primary }} />
								</div>
							)}
							<h1 className="font-semibold text-sm truncate">
								{config.profile.title}
							</h1>
						</div>

						<div
							className="flex items-center gap-0.5 rounded-lg p-0.5 shrink-0"
							style={cardStyle}
						>
							<button
								onClick={() => setLayout(LAYOUT.GRID)}
								className="p-1.5 rounded-md transition-colors"
								style={{
									backgroundColor:
										layout === LAYOUT.GRID ? theme.text : "transparent",
									color: layout === LAYOUT.GRID ? theme.background : theme.text,
								}}
							>
								<LayoutGrid size={15} />
							</button>
							<button
								onClick={() => setLayout(LAYOUT.LIST)}
								className="p-1.5 rounded-md transition-colors"
								style={{
									backgroundColor:
										layout === LAYOUT.LIST ? theme.text : "transparent",
									color: layout === LAYOUT.LIST ? theme.background : theme.text,
								}}
							>
								<LayoutList size={15} />
							</button>
						</div>
					</div>

					{(categories.length > 0 || !isGettingItems) && (
						<div className="pb-3">
							<CategoryFilter
								categories={categories}
								selected={selectedCategory}
								onChange={setSelectedCategory}
								config={config}
							/>
						</div>
					)}
				</div>

				<div className="relative z-0 flex-1 px-4 py-5">
					{isGettingItems ? (
						layout === LAYOUT.GRID ? (
							<div className="grid grid-cols-2 gap-3">
								{Array.from({ length: 6 }).map((_, i) => (
									<Skeleton key={i} className="w-full h-40" />
								))}
							</div>
						) : (
							<div className="flex flex-col gap-3">
								{Array.from({ length: 6 }).map((_, i) => (
									<Skeleton key={i} className="w-full h-40" />
								))}
							</div>
						)
					) : !items ? (
						<div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
							<FileX2 size={40} style={{ color: theme.text }} />
							<p style={{ color: theme.text }}>Failed to load items.</p>
						</div>
					) : items.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="flex flex-col items-center justify-center py-20 gap-3 text-center"
						>
							<SearchX size={40} style={{ color: theme.text }} />
							<p className="font-medium" style={{ color: theme.text }}>
								No items found
							</p>
							{selectedCategory && (
								<button
									onClick={() => setSelectedCategory(undefined)}
									className="text-sm underline"
									style={{ color: theme.primary }}
								>
									Clear filter
								</button>
							)}
						</motion.div>
					) : (
						<AnimatePresence mode="popLayout">
							<motion.div
								key={layout}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className={
									layout === LAYOUT.GRID
										? "grid grid-cols-2 gap-3"
										: "flex flex-col gap-3"
								}
							>
								{items.map(item => (
									<StoreItemCard
										storeUrl={storeUrl}
										key={item.id}
										item={item}
										config={config}
										layout={layout}
										// onClick={setSelectedItem}
										onInquire={setInquiryItem}
									/>
								))}
							</motion.div>
						</AnimatePresence>
					)}
				</div>
				{/* 
				{inquiryItem && (
					<InquiryModal
						isOpen={!!inquiryItem}
						onClose={() => setInquiryItem(null)}
						item={inquiryItem}
						storeUrl={storeUrl}
						config={config}
					/>
				)} */}
			</div>
		</div>
	);
}
