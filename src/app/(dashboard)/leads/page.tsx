import { PageHeader } from "@/shared/components/common/page-header";
import { LeadDataTable } from "@/features/lead/components/data-table/lead-data-table";

const page = () => {
	return (
		<div className="flex flex-col gap-8">
			<PageHeader title="Leads" description="Manage your leads and inquiries" />
			<LeadDataTable />
		</div>
	);
};

export default page;
