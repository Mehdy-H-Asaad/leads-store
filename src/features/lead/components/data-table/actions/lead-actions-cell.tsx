import { MoreHorizontal } from "lucide-react";
import { DropdownMenu } from "@/shared/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/shared/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { DeleteDialog } from "@/shared/components/common/delete-dialog";
import { Button } from "@/shared/components/ui/button";
import { TLead } from "@/entities/lead/model/lead.model";

export const LeadActionsCell = ({}: { row: Row<TLead> }) => {
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
