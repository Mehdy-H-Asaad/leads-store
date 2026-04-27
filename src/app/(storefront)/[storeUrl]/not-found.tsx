import { Store } from "lucide-react";

export default function StoreNotFound() {
	return (
		<div className="min-h-dvh flex flex-col items-center justify-center gap-6 px-6 text-center bg-neutral-50">
			<div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
				<Store size={36} className="text-white" />
			</div>
			<div>
				<h1 className="text-2xl font-bold text-neutral-800">Store Not Found</h1>
				<p className="mt-2 text-neutral-500 text-sm max-w-xs">
					This store link doesn&apos;t exist or may have been removed.
				</p>
			</div>
		</div>
	);
}
