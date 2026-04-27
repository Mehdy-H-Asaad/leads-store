import {
	Card,
	CardContent,
	CardHeader,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

const loading = () => {
	return (
		<div className="flex flex-col gap-8">
			<div className="space-y-2">
				<Skeleton className="h-9 w-40" />
				<Skeleton className="h-4 w-80 max-w-full" />
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
				{Array.from({ length: 6 }).map((_, i) => (
					<Card key={i} className="rounded-xl border bg-card shadow-sm">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="size-4 rounded-full" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-7 w-24" />
							<Skeleton className="mt-2 h-3 w-20" />
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="flex flex-col gap-6 lg:col-span-2">
					<Card className="rounded-xl border bg-card shadow-sm">
						<CardHeader className="flex flex-row items-start justify-between">
							<div className="space-y-2">
								<Skeleton className="h-5 w-32" />
								<Skeleton className="h-4 w-40" />
							</div>
							<Skeleton className="h-8 w-20" />
						</CardHeader>
						<CardContent>
							<div className="flex flex-col gap-3">
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton key={i} className="h-14 w-full rounded-lg" />
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="rounded-xl border bg-card shadow-sm">
						<CardHeader>
							<Skeleton className="h-5 w-36" />
							<Skeleton className="h-4 w-48" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-64 w-full rounded-lg" />
						</CardContent>
					</Card>
				</div>

				<div className="flex flex-col gap-6">
					<Card className="rounded-xl border bg-card shadow-sm">
						<CardHeader>
							<Skeleton className="h-5 w-28" />
						</CardHeader>
						<CardContent className="flex flex-col gap-3">
							<Skeleton className="h-9 w-full rounded-lg" />
							<div className="flex gap-2">
								<Skeleton className="h-8 flex-1" />
								<Skeleton className="h-8 flex-1" />
							</div>
						</CardContent>
					</Card>

					<Card className="rounded-xl border bg-card shadow-sm">
						<CardHeader className="flex flex-row items-start justify-between pb-4">
							<div className="space-y-2">
								<Skeleton className="h-5 w-24" />
								<Skeleton className="h-4 w-44" />
							</div>
							<Skeleton className="h-8 w-20" />
						</CardHeader>
						<CardContent>
							<div className="flex flex-col gap-4">
								{Array.from({ length: 5 }).map((_, i) => (
									<div key={i} className="flex flex-col gap-1.5">
										<div className="flex items-center justify-between gap-3">
											<Skeleton className="h-4 w-32" />
											<Skeleton className="h-3 w-12" />
										</div>
										<Skeleton className="h-1.5 w-full rounded-full" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default loading;
