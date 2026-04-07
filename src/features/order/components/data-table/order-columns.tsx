"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TOrder } from "@/entities/order/model/order.model";
import { formatDate } from "date-fns";
import { OrderActionsCell } from "./actions/order-actions-cell";
import { ColorBadge } from "@/shared/components/common/color-badge";
import {
	ORDER_STATUS_COLOR,
	PAYMENT_STATUS_COLOR,
	DELIVERY_STATUS_COLOR,
} from "../../constants/order.constants";

export const getOrderColumns = (
	onEdit: (order: TOrder) => void
): ColumnDef<TOrder>[] => [
	{
		accessorKey: "customer",
		header: "Customer",
		cell: ({ row }) => (
			<div className="font-medium">{row.original.customer.name}</div>
		),
	},
	{
		accessorKey: "item",
		header: "Item",
		cell: ({ row }) => (
			<div className="text-muted-foreground">{row.original.item.name}</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<ColorBadge color={ORDER_STATUS_COLOR[row.original.status]}>
				{row.original.status.replace(/_/g, " ")}
			</ColorBadge>
		),
	},
	{
		accessorKey: "payment",
		header: "Payment",
		cell: ({ row }) => (
			<ColorBadge color={PAYMENT_STATUS_COLOR[row.original.payment.status]}>
				{row.original.payment.status}
			</ColorBadge>
		),
	},
	{
		accessorKey: "deliveryStatus",
		header: "Delivery",
		cell: ({ row }) => (
			<ColorBadge color={DELIVERY_STATUS_COLOR[row.original.deliveryStatus]}>
				{row.original.deliveryStatus.replace(/_/g, " ")}
			</ColorBadge>
		),
	},
	{
		accessorKey: "quantity",
		header: "Qty",
		cell: ({ row }) => (
			<div className="font-medium">{row.original.quantity}</div>
		),
	},
	{
		accessorKey: "total",
		header: "Total",
		cell: ({ row }) => (
			<div className="font-medium">${row.original.total}</div>
		),
	},
	{
		accessorKey: "profit",
		header: "Profit",
		cell: ({ row }) => (
			<div className="font-medium text-green-600">${row.original.profit}</div>
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
		cell: ({ row }) => <OrderActionsCell row={row} onEdit={onEdit} />,
	},
];
