import { MoreHorizontal, Edit } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/shared/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { TOrder } from "@/entities/order/model/order.model";
import { DeleteDialog } from "@/shared/components/common/delete-dialog";
import { Button } from "@/shared/components/ui/button";
import { useDeleteOrder } from "@/features/order/hooks/use-delete-order";

export const OrderActionsCell = ({
	row,
	onEdit,
}: {
	row: Row<TOrder>;
	onEdit: (order: TOrder) => void;
}) => {
	const { onDeleteOrder, isDeletingOrder } = useDeleteOrder();

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
						deleteFunc={() => onDeleteOrder(row.original.id)}
						trigger="Delete"
						isLoading={isDeletingOrder}
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
