"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { PRODUCT_STATUS, TProductDTO } from "../../schema/product.schema";
import { formatDate } from "date-fns";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { ProductActionsCell } from "./actions/product-actions-cell";
export const ProductColumns: ColumnDef<TProductDTO>[] = [
	// {
	//   accessorFn: (row) => row.name ?? "N/A",
	//   header: "Agency",
	//   cell: ({ row }) => {
	//     return (
	//       <div className="flex items-center gap-4">
	//         <Image
	//           src={row.original.logo?.fileUrl ?? ""}
	//           alt="Agency Logo"
	//           width={100}
	//           height={100}
	//           className=" rounded-full object-cover"
	//         />
	//         <div>{row.original.name}</div>
	//       </div>
	//     );
	//   },
	// },

	{
		accessorKey: "name",
		header: "Product",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-3">
					<Image
						src={row.original.featuredImg}
						alt={row.original.name}
						width={40}
						height={40}
						className="rounded-md object-cover"
					/>
					<div className="font-medium">{row.original.name}</div>
				</div>
			);
		},
	},

	// {
	// 	accessorKey: "description",
	// 	header: "Description",
	// },
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
		accessorKey: "Impresions",
		header: "Impresions",
		cell: ({ row }) => {
			return (
				<Badge className="bg-blue-100 text-blue-500">
					{row.original.impressions ?? 0}
				</Badge>
			);
		},
	},
	{
		accessorKey: "Leads",
		header: "Leads",
		cell: ({ row }) => {
			return (
				<Badge className="bg-green-100 text-green-500">
					{row.original.leads ?? 0}
				</Badge>
			);
		},
	},
	// {
	// 	accessorKey: "updatedAt",
	// 	header: "Last Modified",
	// 	cell: ({ row }) => {
	// 		return (
	// 			<div>{formatDate(new Date(row.original.updatedAt), "dd/MM/yyyy")}</div>
	// 		);
	// 	},
	// },
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
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			return (
				<Badge
					className={`capitalize ${
						row.original.status === PRODUCT_STATUS.IN_STOCK
							? "bg-green-100 text-green-500"
							: row.original.status === PRODUCT_STATUS.OUT_OF_STOCK
							? "bg-red-100 text-red-500"
							: row.original.status === PRODUCT_STATUS.LOW_STOCK
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
			return <ProductActionsCell row={row} />;
		},
	},
];
