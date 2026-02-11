import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type TMainButtonProps = {
	children: React.ReactNode;
	isLoading?: boolean;
	loadingText?: string;
} & React.ComponentProps<"button">;

export const MainButton = ({
	children,
	isLoading,
	loadingText,
	className,
	...props
}: TMainButtonProps) => {
	return (
		<Button
			className={cn(
				"bg-black text-white px-4 py-2 rounded-xl border cursor-pointer hover:bg-black/80",
				className
			)}
			{...props}
		>
			{isLoading ? loadingText : children}
			{isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
		</Button>
	);
};
