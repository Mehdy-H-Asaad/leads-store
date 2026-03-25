"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TCategory } from "@/entities/category/model/category.model";
import { formatDate } from "date-fns";
import { CategoryActionsCell } from "./actions/category-actions-cell";

export const getCategoryColumns = (
	onEdit: (category: TCategory) => void
): ColumnDef<TCategory>[] => [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
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
		cell: ({ row }) => <CategoryActionsCell row={row} onEdit={onEdit} />,
	},
];
