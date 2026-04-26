"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TInvoice } from "@/entities/invoice/model/invoice.model";
import { formatDate } from "date-fns";
import { InvoiceActionsCell } from "./actions/invoice-actions-cell";

export const invoiceColumns: ColumnDef<TInvoice>[] = [
	{
		accessorKey: "invoiceNumber",
		header: "Invoice #",
		cell: ({ row }) => (
			<div className="font-medium">{row.original.invoiceNumber}</div>
		),
	},
	{
		accessorKey: "orderNumber",
		header: "Order #",
		cell: ({ row }) => (
			<div className="text-muted-foreground">{row.original.orderNumber}</div>
		),
	},
	{
		accessorKey: "customer",
		header: "Customer",
		cell: ({ row }) => {
			const { name, email, phone } = row.original.customer;
			return (
				<div className="flex flex-col gap-0.5">
					<span className="font-medium">{name}</span>
					<span className="text-xs text-muted-foreground">{email}</span>
					<span className="text-xs text-muted-foreground">{phone}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "item",
		header: "Item",
		cell: ({ row }) => {
			const { name, quantity } = row.original.item;
			return (
				<div className="flex flex-col gap-0.5">
					<span className="font-medium">{name}</span>
					<span className="text-xs text-muted-foreground">Qty: {quantity}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "currency",
		header: "Currency",
		cell: ({ row }) => (
			<div className="font-medium uppercase">{row.original.currency}</div>
		),
	},
	{
		accessorKey: "subtotal",
		header: "Subtotal",
		cell: ({ row }) => (
			<div className="font-medium">
				{row.original.currency} {row.original.subtotal.toLocaleString()}
			</div>
		),
	},
	{
		accessorKey: "discount",
		header: "Discount",
		cell: ({ row }) => (
			<div className="text-muted-foreground">
				{row.original.discount && row.original.discount > 0
					? `${row.original.currency} ${row.original.discount.toLocaleString()}`
					: "—"}
			</div>
		),
	},
	{
		accessorKey: "shippingCosts",
		header: "Shipping",
		cell: ({ row }) => (
			<div className="text-muted-foreground">
				{row.original.shippingCosts > 0
					? `${
							row.original.currency
					  } ${row.original.shippingCosts.toLocaleString()}`
					: "—"}
			</div>
		),
	},
	{
		accessorKey: "total",
		header: "Total",
		cell: ({ row }) => (
			<div className="font-semibold text-green-600">
				{row.original.currency} {row.original.total.toLocaleString()}
			</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: "Created Date",
		cell: ({ row }) => (
			<div>{formatDate(new Date(row.original.createdAt), "dd/MM/yyyy")}</div>
		),
	},
	{
		accessorKey: "updatedAt",
		header: "Last Modified",
		cell: ({ row }) => (
			<div>{formatDate(new Date(row.original.updatedAt), "dd/MM/yyyy")}</div>
		),
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => <InvoiceActionsCell row={row} />,
	},
];
