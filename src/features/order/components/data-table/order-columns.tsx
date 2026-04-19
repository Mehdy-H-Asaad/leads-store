"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TOrder } from "@/entities/order/model/order.model";
import { formatDate } from "date-fns";
import { OrderActionsCell } from "./actions/order-actions-cell";
import { ColorBadge } from "@/shared/components/common/color-badge";
import {
	ORDER_STATUS_COLOR,
	DELIVERY_STATUS_COLOR,
	PAYMENT_STATUS_COLOR,
} from "../../constants/order.constants";
import { OrderCustomerCell } from "./cells/order-customer-cell";

export const getOrderColumns = (
	onEdit: (order: TOrder) => void
): ColumnDef<TOrder>[] => [
	{
		accessorKey: "referenceNumber",
		header: "Reference Number",
		cell: ({ row }) => (
			<div className="text-muted-foreground">
				{row.original.referenceNumber ?? "—"}
			</div>
		),
	},
	{
		accessorKey: "customer",
		header: "Customer",
		cell: ({ row }) => <OrderCustomerCell customer={row.original.customer} />,
	},
	{
		accessorKey: "item",
		header: "Item",
		cell: ({ row }) => (
			<div className="text-muted-foreground">{row.original.item?.name}</div>
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
		cell: ({ row }) =>
			row.original.payment?.status ? (
				<ColorBadge color={PAYMENT_STATUS_COLOR[row.original.payment.status]}>
					{row.original.payment.status}
				</ColorBadge>
			) : null,
	},
	{
		accessorFn: row => row.payment?.method,
		header: "Payment Method",
		cell: ({ row }) =>
			row.original.payment?.method ? (
				<ColorBadge color={PAYMENT_STATUS_COLOR[row.original.payment.status]}>
					{row.original.payment?.method.replace(/_/g, " ")}
				</ColorBadge>
			) : (
				<span className="text-muted-foreground">—</span>
			),
	},
	{
		accessorFn: row => row.payment?.amountPaid,
		header: "Amount Paid",
		cell: ({ row }) =>
			row.original.payment?.amountPaid ? (
				<div className="font-medium">
					${row.original.payment.amountPaid?.toLocaleString()}
				</div>
			) : (
				<span className="text-muted-foreground">—</span>
			),
	},
	{
		accessorFn: row => row.payment?.paidAt,
		header: "Paid At",
		cell: ({ row }) =>
			row.original.payment?.paidAt ? (
				<div className="font-medium">
					{formatDate(
						new Date(row.original.payment.paidAt),
						"dd MMM yyyy, HH:mm:ss"
					)}
				</div>
			) : (
				<span className="text-muted-foreground">—</span>
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
		accessorKey: "itemPrice",
		header: "Item Price",
		cell: ({ row }) => (
			<div className="font-medium">${row.original.itemPrice}</div>
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
		cell: ({ row }) => <div className="font-medium">${row.original.total}</div>,
	},
	{
		accessorKey: "totalCost",
		header: "Total Cost",
		cell: ({ row }) => (
			<div className="font-medium">${row.original.totalCost}</div>
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
		accessorKey: "address",
		header: "Address",
		cell: ({ row }) => (
			<div className="max-w-[200px] truncate text-muted-foreground">
				{row.original.address ?? "—"}
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
		cell: ({ row }) => <OrderActionsCell row={row} onEdit={onEdit} />,
	},
];
