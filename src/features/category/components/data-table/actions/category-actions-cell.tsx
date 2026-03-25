import { MoreHorizontal, Edit } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/shared/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { TCategory } from "@/entities/category/model/category.model";
import { DeleteDialog } from "@/shared/components/common/delete-dialog";
import { Button } from "@/shared/components/ui/button";
import { useDeleteCategory } from "../../../hooks/use-delete-category";

export const CategoryActionsCell = ({
	row,
	onEdit,
}: {
	row: Row<TCategory>;
	onEdit: (category: TCategory) => void;
}) => {
	const { deleteCategory, isDeletingCategory } = useDeleteCategory();

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
					<Button
						variant="outline"
						size="sm"
						onClick={() => onEdit(row.original)}
						className="cursor-pointer"
					>
						<Edit className="h-4 w-4" />
						Edit
					</Button>
					<DeleteDialog
						deleteFunc={() => deleteCategory(row.original.id)}
						trigger="Delete"
						isLoading={isDeletingCategory}
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
