"use client";

import { motion } from "framer-motion";
import { isLightColor } from "../lib/storefront.utils";
import type { TCustomizationConfig } from "@/entities/customization/model/customization.model";
import type { TCategoryRefContract } from "@/shared/contracts/category/category.contract";

type CategoryFilterProps = {
	categories: TCategoryRefContract[];
	selected: string | undefined;
	onChange: (id: string | undefined) => void;
	config: TCustomizationConfig;
};

export function CategoryFilter({
	categories,
	selected,
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
		<div className="w-full overflow-x-auto pb-1 scrollbar-none">
			<motion.div
				className="flex gap-2 w-max px-5"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2 }}
			>
				{all.map(cat => {
					const isActive = selected === cat.id;
					return (
						<motion.button
							key={cat.id ?? "all"}
							onClick={() => onChange(cat.id)}
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
		</div>
	);
}
