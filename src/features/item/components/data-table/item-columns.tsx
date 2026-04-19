"use client";
import { ColumnDef } from "@tanstack/react-table";

import { TItem } from "@/entities/item/model/item.model";
import { ITEM_STATUS } from "@/shared/contracts/item/item.contract";
import { formatDate } from "date-fns";
import { ItemActionsCell } from "./actions/item-actions-cell";
import { ItemVisibilityCell } from "./cells/item-visibility-cell";
import { ItemAttributesCell } from "./cells/item-attributes-cell";
import { ItemImagesCell } from "./cells/item-images-cell";
import { ItemThumbnailCell } from "./cells/item-thumbnail-cell";
import { ItemDescriptionCell } from "./cells/item-description-cell";
import { ColorBadge } from "@/shared/components/common/color-badge";
import { Badge } from "@/shared/components/ui/badge";

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
				<ItemThumbnailCell
					thumbnail={row.original.thumbnail}
					name={row.original.name}
				/>
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
				<div className="capitalize font-medium">${row.original.cost ?? 0}</div>
			);
		},
	},
	{
		accessorKey: "categories",
		header: "Category",
		cell: ({ row }) => {
			return (
				<div className="flex gap-2 flex-row items-center">
					{row.original.categories?.map(category => (
						<Badge variant="outline" className="capitalize" key={category.id}>
							{category.name}
						</Badge>
					))}
				</div>
			);
		},
	},
	{
		accessorKey: "isVisible",
		header: "Visibility",
		cell: ({ row }) => <ItemVisibilityCell item={row.original} />,
	},
	{
		accessorKey: "attributes",
		header: "Attributes",
		cell: ({ row }) => (
			<ItemAttributesCell attributes={row.original.attributes} />
		),
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
				<ColorBadge
					color={row.original.type === "product" ? "yellow" : "purple"}
				>
					{row.original.type}
				</ColorBadge>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			return (
				<ColorBadge
					color={
						row.original.status === ITEM_STATUS.IN_STOCK
							? "green"
							: row.original.status === ITEM_STATUS.OUT_OF_STOCK
							? "red"
							: row.original.status === ITEM_STATUS.LOW_STOCK
							? "yellow"
							: "red"
					}
				>
					{row.original.status.split("_").join(" ")}
				</ColorBadge>
			);
		},
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
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return <ItemActionsCell row={row} onEdit={onEdit} />;
		},
	},
];
