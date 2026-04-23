import { Skeleton } from "../ui/skeleton";

const SKELETON_ROWS = 6;
const SKELETON_COLS = 7;

export const PageLoadingSkeleton = () => {
	return (
		<>
			<div className="fixed top-0 left-0 z-50 h-[2px] w-full">
				<div className="h-full animate-loadingBar bg-primary shadow-[0_0_2px_theme(--color-primary)]" />
			</div>

			<div className="flex flex-col gap-8">
				<div className="space-y-2">
					<Skeleton className="h-9 w-40" />
					<Skeleton className="h-4 w-56" />
				</div>

				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<Skeleton className="h-9 w-56" />
						<Skeleton className="h-9 w-24" />
						<Skeleton className="h-9 w-24" />
						<Skeleton className="h-9 w-24" />
					</div>
					<Skeleton className="h-9 w-28" />
				</div>

				<div className="rounded-md border">
					<div className="flex items-center gap-4 border-b px-4 h-11">
						{Array.from({ length: SKELETON_COLS }).map((_, i) => (
							<Skeleton key={`header-${i}`} className="h-3.5 flex-1" />
						))}
					</div>

					{Array.from({ length: SKELETON_ROWS }).map((_, rowIdx) => (
						<div
							key={rowIdx}
							className="flex items-center gap-4 border-b last:border-b-0 px-4 h-14"
						>
							{Array.from({ length: SKELETON_COLS }).map((_, colIdx) => (
								<Skeleton
									key={`cell-${rowIdx}-${colIdx}`}
									className="h-4 flex-1"
								/>
							))}
						</div>
					))}
				</div>

				<div className="flex items-center justify-between">
					<Skeleton className="h-4 w-36" />
					<div className="flex items-center gap-2">
						<Skeleton className="h-9 w-9" />
						<Skeleton className="h-9 w-9" />
						<Skeleton className="h-9 w-9" />
						<Skeleton className="h-9 w-9" />
					</div>
				</div>
			</div>
		</>
	);
};
