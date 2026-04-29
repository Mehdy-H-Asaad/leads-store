"use client";

import { motion } from "framer-motion";
import { TemplateA } from "@/features/store/components/templates/template-a/template-a";
import { useGetStore } from "@/entities/store/api/store.query";
import { useGetStoreItems } from "@/entities/item/api/item.query";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Store } from "lucide-react";

export function StoreProfile({ storeUrl }: { storeUrl: string }) {
	const { store, isGettingStore } = useGetStore(storeUrl);

	const { items } = useGetStoreItems({ storeUrl, page: 1, limit: 4 });

	if (isGettingStore)
		return <Skeleton className="w-[580px] h-dvh mx-auto pt-10" />;

	if (!store)
		return (
			<div className="min-h-dvh flex flex-col items-center justify-center gap-6 px-6 text-center bg-neutral-50">
				<div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
					<Store size={36} className="text-white" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-neutral-800">
						Store Not Found
					</h1>
					<p className="mt-2 text-neutral-500 text-sm max-w-xs">
						This store link doesn&apos;t exist or may have been removed.
					</p>
				</div>
			</div>
		);

	return (
		<div className="min-h-dvh w-full pt-10 flex justify-center bg-[#e8e8e8]">
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35, ease: "easeOut" }}
				className="relative w-full max-w-[580px] min-h-dvh shadow-2xl overflow-y-auto rounded-t-3xl"
			>
				<TemplateA
					currency={store.currency}
					config={store.config}
					logo={store.logo}
					profile={store.config.profile}
					links={store.links}
					storeUrl={`/${storeUrl}`}
					qrCode={store.qrCode}
					featuredItems={items ?? []}
				/>
			</motion.div>
		</div>
	);
}
