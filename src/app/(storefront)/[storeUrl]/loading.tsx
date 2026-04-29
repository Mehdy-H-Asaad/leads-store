import { Skeleton } from "@/shared/components/ui/skeleton";

const loading = () => {
	return (
		<div className="min-h-dvh flex flex-col pt-10 max-w-[580px] mx-auto items-center justify-center gap-6 px-6 text-center">
			<Skeleton className="w-full min-h-dvh " />
		</div>
	);
};

export default loading;
