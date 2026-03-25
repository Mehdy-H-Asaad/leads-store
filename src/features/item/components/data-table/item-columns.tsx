"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/shared/components/ui/badge";
import { TItem } from "@/entities/item/model/item.model";
import { ITEM_STATUS } from "@/shared/contracts/item/item.contract";
import { formatDate } from "date-fns";
import { Switch } from "@/shared/components/ui/switch";
import { ItemActionsCell } from "./actions/item-actions-cell";
import { ItemAttributesCell } from "./cells/item-attributes-cell";
import { ItemImagesCell } from "./cells/item-images-cell";
import { ItemThumbnailCell } from "./cells/item-thumbnail-cell";
import { ItemDescriptionCell } from "./cells/item-description-cell";

export const getItemColumns = (
	onEdit: (item: TItem) => void
): ColumnDef<TItem>[] => [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			return <div className="font-medium">{row.original.name}</div>;
		},
	},

	{
		accessorKey: "thumbnail",
		header: "Thumbnail",
		cell: ({ row }) => {
			return (
				<>
					{row.original.thumbnail && row.original.thumbnail.url && (
						<ItemThumbnailCell
							thumbnail={row.original.thumbnail}
							name={row.original.name}
						/>
					)}
				</>
			);
		},
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			return (
				<div className="capitalize font-medium">${row.original.price}</div>
			);
		},
	},
	{
		accessorKey: "cost",
		header: "Cost",
		cell: ({ row }) => {
			return (
				<div className="capitalize font-medium">${row.original.price}</div>
			);
		},
	},
	{
		accessorKey: "category",
		header: "Category",
		cell: ({ row }) => {
			return <div className="capitalize">{row.original.category}</div>;
		},
	},
	{
		accessorKey: "visibility",
		header: "Visibility",
		cell: ({ row }) => {
			return (
				<Switch checked={row.original.visibility} onCheckedChange={() => {}} />
			);
		},
	},
	{
		accessorKey: "attributes",
		header: "Attributes",
		cell: ({ row }) => (
			<ItemAttributesCell attributes={row.original.attributes} />
		),
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => (
			<ItemDescriptionCell description={row.original.description} />
		),
	},

	{
		accessorKey: "images",
		header: "Images",
		cell: ({ row }) => <ItemImagesCell images={row.original.images} />,
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => {
			return (
				<div>{formatDate(new Date(row.original.createdAt), "dd/MM/yyyy")}</div>
			);
		},
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			return (
				<Badge
					className={`capitalize ${
						row.original.type === "product"
							? "bg-yellow-50 text-yellow-500"
							: "bg-violet-50 text-violet-500"
					}`}
				>
					{row.original.type}
				</Badge>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			return (
				<Badge
					className={`capitalize ${
						row.original.status === ITEM_STATUS.IN_STOCK
							? "bg-green-100 text-green-500"
							: row.original.status === ITEM_STATUS.OUT_OF_STOCK
							? "bg-red-100 text-red-500"
							: row.original.status === ITEM_STATUS.LOW_STOCK
							? "bg-yellow-100 text-yellow-500"
							: "bg-red-100 text-red-500"
					}`}
				>
					{row.original.status.split("_").join(" ")}
				</Badge>
			);
		},
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return <ItemActionsCell row={row} onEdit={onEdit} />;
		},
	},
];
