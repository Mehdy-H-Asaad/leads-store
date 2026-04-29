"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ExternalLink, Copy, Check, Store } from "lucide-react";
import { useState } from "react";
import { useGetMyStore } from "@/entities/store/api/store.query";
import { Skeleton } from "@/shared/components/ui/skeleton";
import Link from "next/link";
export const StoreLinkCard = () => {
	const { store, isGettingStore } = useGetMyStore();
	const [copied, setCopied] = useState(false);

	const storeUrl = store?.storeURL ?? null;

	const handleCopy = async () => {
		if (!storeUrl) return;
		await navigator.clipboard.writeText(storeUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return isGettingStore ? (
		<Skeleton className="w-full h-24 rounded-lg" />
	) : (
		<Card className="rounded-xl border bg-card shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-base">
					<Store className="size-4 text-muted-foreground" />
					Your Store
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 min-w-0">
					<span className="flex-1 truncate text-xs text-muted-foreground font-mono">
						{storeUrl ?? "Loading…"}
					</span>
				</div>

				<div className="flex gap-2">
					<Button
						variant="outline"
						size="sm"
						className="flex-1 gap-1.5"
						onClick={handleCopy}
						disabled={!storeUrl}
					>
						{copied ? (
							<>
								<Check className="size-3.5 text-green-600" />
								<span className="text-green-600">Copied!</span>
							</>
						) : (
							<>
								<Copy className="size-3.5" />
								Copy link
							</>
						)}
					</Button>
					<Button
						variant="default"
						size="sm"
						className="flex-1 gap-1.5"
						asChild
						disabled={!storeUrl}
					>
						<Link href={storeUrl ?? "#"} target="_blank">
							<ExternalLink className="size-3.5" />
							Open store
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
