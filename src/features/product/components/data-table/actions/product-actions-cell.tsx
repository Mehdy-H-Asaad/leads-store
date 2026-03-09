import { MoreHorizontal } from "lucide-react";
import { DropdownMenu } from "@/shared/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/shared/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { TProduct } from "@/entities/product/model/product.model";
import { DeleteDialog } from "@/shared/components/common/delete-dialog";
import { Button } from "@/shared/components/ui/button";

export const ProductActionsCell = ({}: { row: Row<TProduct> }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<div className="flex flex-col gap-2">
					<DeleteDialog
						deleteFunc={() => {}}
						trigger="Delete Product"
						isLoading={false}
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
