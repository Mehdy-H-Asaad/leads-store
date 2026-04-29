import { Skeleton } from "@/shared/components/ui/skeleton";

export function StoreBuilderSkeleton() {
	return (
		<div className="flex gap-8 h-[calc(100vh-200px)] min-h-[560px]">
			<div className="flex flex-col w-[380px] gap-4 shrink-0 border rounded-xl p-4">
				<Skeleton className="h-12 w-full rounded-none " />
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton key={i} className="h-20 w-full" />
				))}
			</div>
			<div className="flex-1 flex items-start justify-center pt-6">
				<Skeleton className="w-[272px] h-[556px] rounded-[44px]" />
			</div>
		</div>
	);
}
