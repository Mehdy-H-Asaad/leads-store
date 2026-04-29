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
				<Skeleton className="h-9 w-36" />
				<Skeleton className="h-4 w-52" />
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

			<div className="grid gap-8 lg:grid-cols-3">
				<Card className="rounded-xl border bg-card shadow-sm lg:col-span-2">
					<CardHeader>
						<Skeleton className="h-5 w-44" />
						<Skeleton className="h-4 w-56" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-72 w-full rounded-lg" />
					</CardContent>
				</Card>

				<Card className="rounded-xl border bg-card shadow-sm">
					<CardHeader>
						<Skeleton className="h-5 w-32" />
						<Skeleton className="h-4 w-44" />
					</CardHeader>
					<CardContent>
						<Skeleton className="mx-auto size-56 rounded-full" />
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-8 lg:grid-cols-2">
				{Array.from({ length: 2 }).map((_, i) => (
					<Card key={i} className="rounded-xl border bg-card shadow-sm">
						<CardHeader>
							<Skeleton className="h-5 w-36" />
							<Skeleton className="h-4 w-48" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-72 w-full rounded-lg" />
						</CardContent>
					</Card>
				))}
			</div>

			<Card className="rounded-xl border bg-card shadow-sm">
				<CardHeader>
					<Skeleton className="h-5 w-40" />
					<Skeleton className="h-4 w-56" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-80 w-full rounded-lg" />
				</CardContent>
			</Card>
		</div>
	);
};

export default loading;
