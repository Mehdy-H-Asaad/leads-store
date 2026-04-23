import { Skeleton } from "@/shared/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

const StatCardSkeleton = () => (
	<Card className="rounded-xl border bg-card shadow-sm">
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<Skeleton className="h-4 w-24" />
			<Skeleton className="size-4 rounded" />
		</CardHeader>
		<CardContent>
			<Skeleton className="h-7 w-20 mb-1" />
			<Skeleton className="h-3 w-16" />
		</CardContent>
	</Card>
);

const RecentOrdersSkeleton = () => (
	<Card className="rounded-xl border bg-card shadow-sm">
		<CardHeader className="flex flex-row items-start justify-between pb-4">
			<div className="flex flex-col gap-1.5">
				<Skeleton className="h-5 w-32" />
				<Skeleton className="h-3.5 w-44" />
			</div>
			<Skeleton className="h-8 w-20" />
		</CardHeader>
		<CardContent className="flex flex-col gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<div
					key={i}
					className="flex items-center justify-between px-3 py-3 rounded-lg"
				>
					<div className="flex flex-col gap-1.5">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-3 w-48" />
					</div>
					<div className="flex items-center gap-3">
						<Skeleton className="h-5 w-20 rounded-full" />
						<Skeleton className="h-4 w-14" />
						<Skeleton className="h-3 w-12 hidden sm:block" />
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const StoreLinkSkeleton = () => (
	<Card className="rounded-xl border bg-card shadow-sm">
		<CardHeader className="pb-3">
			<Skeleton className="h-5 w-24" />
			<Skeleton className="h-3.5 w-32" />
		</CardHeader>
		<CardContent className="flex flex-col gap-3">
			<Skeleton className="h-9 w-full rounded-lg" />
			<div className="flex gap-2">
				<Skeleton className="h-9 flex-1 rounded-md" />
				<Skeleton className="h-9 flex-1 rounded-md" />
			</div>
		</CardContent>
	</Card>
);

const QuickActionsSkeleton = () => (
	<Card className="rounded-xl border bg-card shadow-sm">
		<CardHeader className="pb-3">
			<Skeleton className="h-4 w-28" />
		</CardHeader>
		<CardContent className="flex flex-col gap-2">
			{Array.from({ length: 5 }).map((_, i) => (
				<Skeleton key={i} className="h-9 w-full rounded-md" />
			))}
		</CardContent>
	</Card>
);

const SparklineSkeleton = () => (
	<Card className="rounded-xl border bg-card shadow-sm">
		<CardHeader className="pb-2">
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-1.5">
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-3.5 w-20" />
				</div>
				<div className="flex flex-col items-end gap-1.5">
					<Skeleton className="h-8 w-24" />
					<Skeleton className="h-3 w-32" />
				</div>
			</div>
		</CardHeader>
		<CardContent>
			<Skeleton className="h-[120px] w-full rounded-lg" />
		</CardContent>
	</Card>
);

const TopItemsSkeleton = () => (
	<Card className="rounded-xl border bg-card shadow-sm">
		<CardHeader className="flex flex-row items-start justify-between pb-4">
			<div className="flex flex-col gap-1.5">
				<Skeleton className="h-5 w-24" />
				<Skeleton className="h-3.5 w-40" />
			</div>
			<Skeleton className="h-8 w-20" />
		</CardHeader>
		<CardContent className="flex flex-col gap-4">
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className="flex flex-col gap-1.5">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Skeleton className="h-3 w-4" />
							<Skeleton className="h-4 w-36" />
						</div>
						<Skeleton className="h-3 w-12" />
					</div>
					<Skeleton className="ml-6 h-1.5 w-full rounded-full" />
				</div>
			))}
		</CardContent>
	</Card>
);

export const OverviewSkeleton = () => {
	return (
		<div className="flex flex-col gap-6">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
				{Array.from({ length: 6 }).map((_, i) => (
					<StatCardSkeleton key={i} />
				))}
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<RecentOrdersSkeleton />
				</div>
				<div className="flex flex-col gap-6">
					<StoreLinkSkeleton />
					<QuickActionsSkeleton />
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<SparklineSkeleton />
				</div>
				<div>
					<TopItemsSkeleton />
				</div>
			</div>
		</div>
	);
};
