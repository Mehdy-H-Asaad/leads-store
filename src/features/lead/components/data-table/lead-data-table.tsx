"use client";
import { DataTable } from "@/components/common/data-table";
import { LeadColumns } from "./lead-columns";
import { LEAD_STATUS, TLeadDTO } from "../../schema/lead.schema";
import { MainButton } from "@/components/common/main-button";
import { PlusIcon } from "lucide-react";
import { useFilterParams } from "@/hooks/use-filter-params";
import { TLeadFilters } from "../../types/lead.types";
import { LeadFilters } from "../filters/lead-filters";

export const LeadDataTable = () => {
	const { updateFiltersParams, clearFilers, searchParams } =
		useFilterParams<TLeadFilters>();

	const filters: TLeadFilters = {
		name: searchParams.get("name") ?? undefined,
		source: searchParams.get("source") ?? undefined,
		status: searchParams.get("status") as LEAD_STATUS,
	};

	const updateFilters = (filters: TLeadFilters) => {
		updateFiltersParams({ filters: filters, options: { resetPage: true } });
	};

	const data: TLeadDTO[] = [
		{
			id: 1,
			name: "John Doe",
			email: "john@example.com",
			phone: "+1 234 567 890",
			source: "Website",
			status: LEAD_STATUS.NEW,
			productName: "Apple iPhone 15 Pro Max",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			id: 2,
			name: "Jane Smith",
			email: "jane@example.com",
			phone: "+1 987 654 321",
			source: "Referral",
			status: LEAD_STATUS.CONTACTED,
			productName: "Samsung Galaxy S24 Ultra",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			id: 3,
			name: "Bob Wilson",
			email: "bob@example.com",
			source: "Social Media",
			status: LEAD_STATUS.QUALIFIED,
			productName: "Google Pixel 8 Pro",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
	];

	return (
		<DataTable
			columns={LeadColumns}
			data={data}
			searchablePlaceholder="Search leads"
			setSearchableField={() => {}}
			isLoading={false}
			pageCount={1}
			totalCount={data.length}
			manualPagination={false}
			children={
				<>
					<div className="mr-auto w-fit">
						<LeadFilters
							filters={filters}
							onFilterChange={updateFilters}
							onClearAllFilters={clearFilers}
							searchParams={searchParams}
						/>
					</div>
					<MainButton>
						<PlusIcon /> Add Lead
					</MainButton>
				</>
			}
		/>
	);
};
