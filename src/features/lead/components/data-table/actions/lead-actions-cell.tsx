import { MoreHorizontal } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { TLeadDTO } from "../../../schema/lead.schema";
import { DeleteDialog } from "@/components/common/delete-dialog";
import { Button } from "@/components/ui/button";

export const LeadActionsCell = ({ row }: { row: Row<TLeadDTO> }) => {
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
						trigger="Delete Lead"
						isLoading={false}
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
