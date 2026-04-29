export enum TEMPLATE_ID {
	TEMPLATE_A = "TEMPLATE_A",
}

export enum LAYOUT {
	LIST = "LIST",
	GRID = "GRID",
}

export enum BUTTON_VARIANT {
	FILLED = "FILLED",
	OUTLINE = "OUTLINE",
	SOFT = "SOFT",
}

export enum BUTTON_SHAPE {
	ROUNDED = "ROUNDED",
	PILL = "PILL",
	SQUARE = "SQUARE",
}

export enum BACKGROUND_TYPE {
	COLOR = "COLOR",
	IMAGE = "IMAGE",
}

export enum FONT {
	INTER = "INTER",
	ROBOTO = "ROBOTO",
	POPPINS = "POPPINS",
	LATO = "LATO",
	MONTSERRAT = "MONTSERRAT",
	// SEKUYA = "SEKUYA",
	RUBIK = "RUBIK",
	ARCHIVO_BLACK = "ARCHIVO_BLACK",
}

export const FONT_CLASS_MAP: Record<FONT, string> = {
	[FONT.INTER]: "var(--font-inter)",
	[FONT.ROBOTO]: "var(--font-roboto)",
	[FONT.POPPINS]: "var(--font-poppins)",
	[FONT.LATO]: "var(--font-lato)",
	[FONT.MONTSERRAT]: "var(--font-montserrat)",
	[FONT.RUBIK]: "var(--font-rubik)",
	[FONT.ARCHIVO_BLACK]: "var(--font-archivo-black)",
};

export const BUTTON_SHAPE_RADIUS: Record<BUTTON_SHAPE, string> = {
	[BUTTON_SHAPE.ROUNDED]: "12px",
	[BUTTON_SHAPE.PILL]: "9999px",
	[BUTTON_SHAPE.SQUARE]: "4px",
};
export const TEMPLATE_ID_VALUES = [TEMPLATE_ID.TEMPLATE_A] as const;
export const LAYOUT_VALUES = Object.values(LAYOUT) as [LAYOUT, ...LAYOUT[]];
export const BUTTON_VARIANT_VALUES = Object.values(BUTTON_VARIANT) as [
	BUTTON_VARIANT,
	...BUTTON_VARIANT[]
];
export const BUTTON_SHAPE_VALUES = Object.values(BUTTON_SHAPE) as [
	BUTTON_SHAPE,
	...BUTTON_SHAPE[]
];
export const BACKGROUND_TYPE_VALUES = Object.values(BACKGROUND_TYPE) as [
	BACKGROUND_TYPE,
	...BACKGROUND_TYPE[]
];
export const FONT_VALUES = Object.values(FONT) as [FONT, ...FONT[]];
