import { useMemo } from "react";
import { Badge } from "../ui/badge";

export const COLORS = {
	GREEN: "green",
	RED: "red",
	YELLOW: "yellow",
	BLUE: "blue",
	PURPLE: "purple",
	PINK: "pink",
	ORANGE: "orange",
	GRAY: "gray",
} as const;

export const ColorBadge = ({
	children,
	color,
}: {
	children: React.ReactNode;
	color: (typeof COLORS)[keyof typeof COLORS];
}) => {
	const colorClass = useMemo(() => {
		switch (color) {
			case COLORS.GREEN:
				return "bg-green-100 text-green-500";
			case COLORS.RED:
				return "bg-red-100 text-red-500";
			case COLORS.YELLOW:
				return "bg-yellow-100 text-yellow-500";
			case COLORS.BLUE:
				return "bg-blue-100 text-blue-500";
			case COLORS.PURPLE:
				return "bg-purple-100 text-purple-500";
			case COLORS.PINK:
				return "bg-pink-100 text-pink-500";
			case COLORS.ORANGE:
				return "bg-orange-100 text-orange-500";
			case COLORS.GRAY:
			default:
				return "bg-red-100 text-red-500";
		}
	}, [color]);

	return <Badge className={`capitalize ${colorClass}`}>{children}</Badge>;
};
