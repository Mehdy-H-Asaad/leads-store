"use client";

import { motion } from "framer-motion";
import { isLightColor } from "../../lib/storefront.utils";
import type { TStoreConfig } from "@/entities/store/model/store.model";
import type { TCategoryRefContract } from "@/shared/contracts/category/category.contract";
import type { TItemStoreFilters } from "@/features/store/components/store-front/store-items-view";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";

type CategoryFilterProps = {
	categories: TCategoryRefContract[];
	filters: TItemStoreFilters;
	onChange: (filters: TItemStoreFilters) => void;
	config: TStoreConfig;
};

export function CategoryFilter({
	categories,
	filters,
	onChange,
	config,
}: CategoryFilterProps) {
	const theme = config.theme;
	const isLight = isLightColor(theme.background);
	const pillBg = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)";

	if (!categories.length) return null;

	const all = [
		{ id: undefined, name: "All" },
		...categories.map(c => ({ id: c.id, name: c.name })),
	];

	return (
		<ScrollArea className="w-full h-full whitespace-nowrap">
			<motion.div
				className="flex gap-2 w-max px-5 py-1"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2 }}
			>
				{all.map(cat => {
					const isActive = filters.category_id === cat.id;
					return (
						<motion.button
							className="hover:scale-105!  transition-all! duration-200!"
							key={cat.id ?? "all"}
							onClick={() => onChange({ category_id: cat.id })}
							whileTap={{ scale: 0.95 }}
							style={{
								backgroundColor: isActive ? theme.text : pillBg,
								color: isActive ? theme.background : theme.text,
								borderRadius: "9999px",
								padding: "7px 16px",
								fontSize: "13px",
								fontWeight: isActive ? 600 : 400,
								border: "none",
								cursor: "pointer",
								whiteSpace: "nowrap",
								transition: "background-color 0.2s, color 0.2s",
							}}
						>
							{cat.name}
						</motion.button>
					);
				})}
			</motion.div>
			<ScrollBar orientation="horizontal" className="translate-y-4" />
		</ScrollArea>
	);
}
