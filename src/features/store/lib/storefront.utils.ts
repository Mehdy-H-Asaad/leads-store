import {
	FONT,
	BUTTON_VARIANT,
	BUTTON_SHAPE,
	BACKGROUND_TYPE,
	FONT_CLASS_MAP,
} from "@/shared/contracts/store/store.contract";
import type {
	TStoreConfig,
	TStoreTheme,
} from "@/entities/store/model/store.model";
import type { CSSProperties } from "react";

export function getBackgroundStyle(theme: TStoreTheme): CSSProperties {
	if (
		theme.backgroundType === BACKGROUND_TYPE.IMAGE &&
		theme.backgroundImage?.url
	) {
		return {
			backgroundImage: `url(${theme.backgroundImage.url})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
		};
	}
	return { backgroundColor: theme.background };
}

export function getButtonStyle(
	config: TStoreConfig,
	overrideBg?: string
): CSSProperties {
	const primary = overrideBg ?? config.theme.primary;
	const base: CSSProperties = {};

	switch (config.buttonShape) {
		case BUTTON_SHAPE.PILL:
			base.borderRadius = "9999px";
			break;
		case BUTTON_SHAPE.SQUARE:
			base.borderRadius = "0";
			break;
		case BUTTON_SHAPE.ROUNDED:
		default:
			base.borderRadius = "10px";
	}

	switch (config.buttonVariant) {
		case BUTTON_VARIANT.OUTLINE:
			return {
				...base,
				border: `2px solid ${primary}`,
				color: primary,
				backgroundColor: "transparent",
			};
		case BUTTON_VARIANT.SOFT:
			return {
				...base,
				backgroundColor: `${primary}22`,
				color: primary,
				border: "none",
			};
		case BUTTON_VARIANT.FILLED:
		default:
			return {
				...base,
				backgroundColor: primary,
				color: "#ffffff",
				border: "none",
			};
	}
}

export function getContainerStyle(theme: TStoreTheme): CSSProperties {
	return {
		color: theme.text,
		fontFamily:
			FONT_CLASS_MAP[theme.font as FONT] ?? FONT_CLASS_MAP[FONT.POPPINS],
	};
}

// export function hexToRgba(hex: string, alpha: number): string {
// 	const r = parseInt(hex.slice(1, 3), 16);
// 	const g = parseInt(hex.slice(3, 5), 16);
// 	const b = parseInt(hex.slice(5, 7), 16);
// 	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// }

export function isLightColor(hex: string): boolean {
	if (!hex || !hex.startsWith("#")) return true;
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return luminance > 0.5;
}

export function getCardStyle(theme: TStoreTheme): CSSProperties {
	const isLight = isLightColor(theme.background);
	return {
		backgroundColor: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.08)",
		borderRadius: "12px",
		border: isLight
			? "1px solid rgba(0,0,0,0.08)"
			: "1px solid rgba(255,255,255,0.12)",
	};
}
