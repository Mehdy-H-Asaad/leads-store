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
	// LATO = "LATO",
	// MONTSERRAT = "MONTSERRAT",
}

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
