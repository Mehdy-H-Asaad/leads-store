"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TCustomer } from "@/entities/customer/model/customer.model";
import { formatDate } from "date-fns";
import { CustomerActionsCell } from "./actions/customer-actions-cell";

export const getCustomerColumns = (
	onEdit: (customer: TCustomer) => void
): ColumnDef<TCustomer>[] => [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => (
			<div className="text-muted-foreground">{row.original.email ?? "—"}</div>
		),
	},
	{
		accessorKey: "countryCode",
		header: "Country Code",
		cell: ({ row }) => (
			<div className="text-muted-foreground">
				{row.original.countryCode ?? "—"}
			</div>
		),
	},
	{
		accessorKey: "phone",
		header: "Phone",
		cell: ({ row }) => {
			return <div>{row.original.phone}</div>;
		},
	},
	{
		accessorKey: "address",
		header: "Address",
		cell: ({ row }) => (
			<div className="max-w-[200px] truncate text-muted-foreground">
				{row.original.address ?? "—"}
			</div>
		),
	},
	{
		accessorKey: "notes",
		header: "Notes",
		cell: ({ row }) => (
			<div className="max-w-[200px] truncate text-muted-foreground">
				{row.original.notes ?? "—"}
			</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => (
			<div>{formatDate(new Date(row.original.createdAt), "dd/MM/yyyy")}</div>
		),
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => <CustomerActionsCell row={row} onEdit={onEdit} />,
	},
];
