import { PageHeader } from "@/shared/components/common/page-header";
import { ProductDataTable } from "@/features/product/components/data-table/product-data-table";

const page = () => {
	return (
		<div className="flex flex-col gap-8">
			<PageHeader title="Products" description="Manage your product catalog" />
			<ProductDataTable />
		</div>
	);
};

export default page;
