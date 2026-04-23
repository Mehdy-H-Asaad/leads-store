import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/shared/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { TInvoice } from "@/entities/invoice/model/invoice.model";
import { DeleteDialog } from "@/shared/components/common/delete-dialog";
import { Button } from "@/shared/components/ui/button";
import { useDeleteInvoice } from "@/features/invoice/hooks/use-delete-invoice";

export const InvoiceActionsCell = ({ row }: { row: Row<TInvoice> }) => {
	const { onDeleteInvoice, isDeletingInvoice } = useDeleteInvoice();

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
						deleteFunc={() => onDeleteInvoice(row.original.id)}
						trigger="Delete"
						isLoading={isDeletingInvoice}
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
