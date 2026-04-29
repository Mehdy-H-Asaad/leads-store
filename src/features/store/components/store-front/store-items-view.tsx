"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	ArrowLeft,
	LayoutGrid,
	LayoutList,
	SearchX,
	Store,
	FileX2,
	Search,
	X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CategoryFilter } from "./category-filter";
import { StoreItemCard } from "./store-item-card";
import { InquiryForm } from "./inquiry-form";
import {
	getContainerStyle,
	getCardStyle,
	isLightColor,
} from "../../lib/storefront.utils";
import type { TStoreItem } from "@/entities/item/model/item.model";
import type { TCategoryRefContract } from "@/shared/contracts/category/category.contract";
import {
	BACKGROUND_TYPE,
	LAYOUT,
} from "@/shared/contracts/store/store.contract";
import { useGetStore } from "@/entities/store/api/store.query";
import { useGetStoreItems } from "@/entities/item/api/item.query";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useGetCategories } from "@/entities/category/api/category.query";
import { useFilterParams } from "@/shared/hooks/use-filter-params";
import { useDebounce } from "@/shared/hooks/use-debounce";

type StoreItemsViewProps = {
	storeUrl: string;
};

export type TItemStoreFilters = {
	name?: string;
	category_id?: string;
};

export function StoreItemsView({ storeUrl }: StoreItemsViewProps) {
	const { clearFilers, searchParams, updateFiltersParams, isPending } =
		useFilterParams<TItemStoreFilters>();

	const pagination = {
		page: searchParams.get("page")
			? Number(searchParams.get("page"))
			: undefined,
		limit: searchParams.get("limit")
			? Number(searchParams.get("limit"))
			: undefined,
	};

	const filters: TItemStoreFilters = {
		name: searchParams.get("name") ?? undefined,
		category_id: searchParams.get("category_id") ?? undefined,
	};

	const [searchValue, setSearchValue] = useState(filters.name ?? "");

	const debouncedSearch = useDebounce({
		callback: (name: string) =>
			updateFiltersParams({
				filters: { ...filters, name: name || undefined },
				options: { resetPage: false },
			}),
		delay: 500,
	});

	const [inquiryItem, setInquiryItem] = useState<TStoreItem | null>(null);

	const { store } = useGetStore(storeUrl);

	const [layout, setLayout] = useState<LAYOUT>(
		(store?.config.layout as LAYOUT) ?? LAYOUT.GRID
	);

	const { items, isGettingItems } = useGetStoreItems({
		storeUrl,
		page: pagination.page,
		limit: pagination.limit,
		filters,
	});

	const { categories, isGettingCategories } = useGetCategories({
		page: 1,
		limit: 50,
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

	if (!store || !config || !theme) return null;

	return (
		<div className="min-h-dvh w-full pt-10 flex justify-center bg-[#e8e8e8]">
			<div
				className="relative w-full max-w-[580px] min-h-dvh flex flex-col shadow-2xl rounded-t-3xl overflow-hidden"
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

					{/* Search input */}
					<div className="px-5 pb-3">
						<div
							className="flex items-center gap-2 rounded-xl px-3 py-2"
							style={{
								backgroundColor: isLight
									? "rgba(0,0,0,0.06)"
									: "rgba(255,255,255,0.08)",
								border: `1px solid ${
									isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)"
								}`,
							}}
						>
							<Search
								size={15}
								style={{
									color: isLight
										? "rgba(0,0,0,0.35)"
										: "rgba(255,255,255,0.35)",
									flexShrink: 0,
								}}
							/>
							<input
								type="text"
								value={searchValue}
								onChange={e => {
									setSearchValue(e.target.value);
									debouncedSearch(e.target.value);
								}}
								placeholder="Search items…"
								style={{
									background: "transparent",
									border: "none",
									outline: "none",
									fontSize: "14px",
									flex: 1,
									color: theme.text,
								}}
							/>
							{searchValue && (
								<button
									onClick={() => {
										setSearchValue("");
										debouncedSearch("");
									}}
								>
									<X
										size={14}
										style={{
											color: isLight
												? "rgba(0,0,0,0.35)"
												: "rgba(255,255,255,0.35)",
										}}
									/>
								</button>
							)}
						</div>
					</div>

					{(categories.length > 0 || !isGettingCategories) && (
						<div className="pb-3">
							<CategoryFilter
								categories={categories ?? []}
								config={config}
								filters={filters}
								onChange={filters =>
									updateFiltersParams({ filters, options: { resetPage: true } })
								}
							/>
						</div>
					)}
				</div>

				<div
					className="relative z-0 flex-1 px-4 py-5 transition-opacity duration-200"
					style={{
						opacity: isPending ? 0.4 : 1,
						pointerEvents: isPending ? "none" : undefined,
					}}
				>
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
							{(filters.name || filters.category_id) && (
								<button
									onClick={() => {
										setSearchValue("");
										updateFiltersParams({
											filters: { name: undefined, category_id: undefined },
											options: { resetPage: false },
										});
									}}
									className="text-sm underline"
									style={{ color: theme.primary }}
								>
									Clear filters
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
										? "grid grid-cols-1 gap-3"
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
				{inquiryItem && (
					<InquiryForm
						isOpen={!!inquiryItem}
						onClose={() => setInquiryItem(null)}
						item={inquiryItem}
						storeUrl={storeUrl}
						config={config}
					/>
				)}
			</div>
		</div>
	);
}
