"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/shared/components/ui/badge";
import { LEAD_STATUS } from "@/shared/contracts/lead/lead.contract";
import { formatDate } from "date-fns";
import { LeadActionsCell } from "./actions/lead-actions-cell";
import { TLead } from "@/entities/lead/model/lead.model";

export const LeadColumns: ColumnDef<TLead>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			return <div className="font-medium">{row.original.name}</div>;
		},
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => {
			return <div className="text-muted-foreground">{row.original.email}</div>;
		},
	},
	{
		accessorKey: "phone",
		header: "Phone",
		cell: ({ row }) => {
			return (
				<div className="text-muted-foreground">{row.original.phone ?? "—"}</div>
			);
		},
	},
	{
		accessorKey: "source",
		header: "Source",
		cell: ({ row }) => {
			return (
				<Badge variant="outline" className="font-normal">
					{row.original.source}
				</Badge>
			);
		},
	},
	{
		accessorKey: "productName",
		header: "Product",
		cell: ({ row }) => {
			return (
				<div className="text-muted-foreground">
					{row.original.product && row.original.product.name
						? row.original.product.name
						: "—"}
				</div>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => {
			return <div>{formatDate(row.original.createdAt, "dd/MM/yyyy")}</div>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			return (
				<Badge
					className={`capitalize ${
						row.original.status === LEAD_STATUS.NEW
							? "bg-blue-100 text-blue-500"
							: row.original.status === LEAD_STATUS.CONTACTED
							? "bg-amber-100 text-amber-500"
							: row.original.status === LEAD_STATUS.CONVERTED
							? "bg-purple-100 text-purple-500"
							: row.original.status === LEAD_STATUS.LOST
							? "bg-red-100 text-red-500"
							: "bg-muted text-muted-foreground"
					}`}
				>
					{row.original.status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return <LeadActionsCell row={row} />;
		},
	},
];
