"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Eye, Box, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { TAnalyticsTopItem } from "@/entities/analytics/model/analytics.model";

type TTopItemsProps = {
	items: TAnalyticsTopItem[];
};

export const TopItems = ({ items }: TTopItemsProps) => {
	const maxViews = items[0]?.views ?? 1;
	const top5 = items.slice(0, 5);

	return (
		<Card className="rounded-xl border bg-card shadow-sm">
			<CardHeader className="flex flex-row items-start justify-between pb-4">
				<div>
					<CardTitle>Top Items</CardTitle>
					<CardDescription>Ranked by views this period</CardDescription>
				</div>
				<Button variant="ghost" size="sm" asChild>
					<Link
						href="/items"
						className="flex items-center gap-1 text-xs text-muted-foreground"
					>
						View all
						<ArrowRight className="size-3" />
					</Link>
				</Button>
			</CardHeader>
			<CardContent>
				{top5.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
						<div className="flex size-12 items-center justify-center rounded-full bg-muted">
							<Box className="size-5 text-muted-foreground" />
						</div>
						<p className="text-sm text-muted-foreground">No item views yet.</p>
					</div>
				) : (
					<div className="flex flex-col gap-4">
						{top5.map((item, idx) => {
							const pct = Math.round((item.views / maxViews) * 100);
							return (
								<div key={item.itemId} className="flex flex-col gap-1.5">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2 min-w-0">
											<span className="text-xs font-bold text-muted-foreground w-4 shrink-0">
												{idx + 1}
											</span>
											<span className="text-sm font-medium truncate">
												{item.name}
											</span>
										</div>
										<div className="flex items-center gap-1 shrink-0 ml-3 text-xs text-muted-foreground">
											<Eye className="size-3" />
											<span className="tabular-nums">
												{item.views.toLocaleString()}
											</span>
										</div>
									</div>
									<div className="ml-6 h-1.5 w-full rounded-full bg-muted overflow-hidden">
										<div
											className="h-full rounded-full bg-foreground/80 transition-all duration-500"
											style={{ width: `${pct}%` }}
										/>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</CardContent>
		</Card>
	);
};
