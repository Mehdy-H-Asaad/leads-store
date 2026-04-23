"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useGetOrders } from "@/entities/order/api/order.query";
import { ORDER_STATUS } from "@/shared/contracts/order/order.contract";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { ORDER_STATUS_COLOR } from "@/features/order/constants/order.constants";
import { ColorBadge } from "@/shared/components/common/color-badge";

export const RecentOrdersTable = () => {
	const { orders, isGettingOrders } = useGetOrders({ page: 1, limit: 5 });

	return (
		<Card className="rounded-xl border bg-card shadow-sm">
			<CardHeader className="flex flex-row items-start justify-between">
				<div>
					<CardTitle>Recent Orders</CardTitle>
					<CardDescription>Your most recent orders</CardDescription>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link
						href="/orders"
						className="flex items-center gap-1 text-xs text-muted-foreground"
					>
						View all
						<ArrowRight className="size-3" />
					</Link>
				</Button>
			</CardHeader>
			<CardContent>
				{isGettingOrders ? (
					<div className="flex flex-col gap-3">
						{Array.from({ length: 5 }).map((_, i) => (
							<Skeleton key={i} className="h-14 w-full rounded-lg" />
						))}
					</div>
				) : orders.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
						<div className="flex size-12 items-center justify-center rounded-full bg-muted">
							<ShoppingCart className="size-5 text-muted-foreground" />
						</div>
						<p className="text-sm text-muted-foreground">No orders yet.</p>
					</div>
				) : (
					<div className="flex flex-col">
						{orders.map((order, idx) => (
							<div
								key={order.id}
								className={`flex items-center justify-between px-3 py-3 hover:bg-muted/50 transition-colors rounded-lg ${
									idx !== orders.length - 1 ? "border-b border-border/50" : ""
								}`}
							>
								<div className="flex flex-col gap-0.5 min-w-0 flex-1">
									<span className="text-sm font-medium truncate">
										{order.customer?.name ?? "Unknown customer"}
									</span>
									<span className="text-xs text-muted-foreground truncate">
										{order.item?.name ?? "Unknown item"}
										{order.referenceNumber
											? ` · #${order.referenceNumber}`
											: ""}
									</span>
								</div>

								<div className="flex items-center gap-3 shrink-0 ml-4">
									<ColorBadge
										color={ORDER_STATUS_COLOR[order.status as ORDER_STATUS]}
									>
										{order.status}
									</ColorBadge>
									<span className="text-sm font-semibold tabular-nums">
										${order.total.toLocaleString()}
									</span>
									<span className="text-xs text-muted-foreground w-20 text-right hidden sm:block">
										{new Date(order.createdAt).toLocaleDateString(undefined, {
											month: "short",
											day: "numeric",
										})}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};
