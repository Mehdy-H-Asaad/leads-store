import { ITEM_KEYS } from "@/entities/item/api/item.keys";
import { itemService } from "@/entities/item/api/item.service";
import { ItemForm } from "@/features/item/components/forms/item-form";
import { getQueryClient } from "@/shared/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const EditItemPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;

	const queryClient = getQueryClient();
	await queryClient.fetchQuery({
		queryKey: ITEM_KEYS.DETAIL(id),
		queryFn: () => itemService.getItem(id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ItemForm id={id} />
		</HydrationBoundary>
	);
};

export default EditItemPage;
