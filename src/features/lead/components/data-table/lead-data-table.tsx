"use client";
import { useState } from "react";
import { DataTable } from "@/shared/components/common/data-table";
import { LeadColumns } from "./lead-columns";
import {
	LEAD_PRIORITY,
	LEAD_SOURCE,
	LEAD_STATUS,
} from "@/shared/contracts/lead/lead.contract";
import { TLead } from "@/entities/lead/model/lead.model";
import { MainButton } from "@/shared/components/common/main-button";
import { PlusIcon } from "lucide-react";
import { useFilterParams } from "@/shared/hooks/use-filter-params";
import { TLeadFilters } from "../../types/lead.types";
import { LeadFilters } from "../filters/lead-filters";
import { LeadForm } from "../forms/lead-form";
import { PRODUCT_STATUS } from "@/shared/contracts/product/product.contract";

export const LeadDataTable = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
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

	const data: TLead[] = [
		{
			_id: "1",
			name: "John Doe",
			email: "john@example.com",
			phone: "+1 234 567 890",
			source: LEAD_SOURCE.WEBSITE,
			status: LEAD_STATUS.NEW,
			product: {
				_id: "1",
				name: "Apple iPhone 15 Pro Max",
				description: "Apple iPhone 15 Pro Max description",
				price: 1000,
				cost: 800,
				featuredImg: "https://via.placeholder.com/150",
				impressions: 1000,
				productGallery: [],
				attributes: [],
				tags: [],
				visibility: true,
				slug: "apple-iphone-15-pro-max",
				category: "Smartphones",
				status: PRODUCT_STATUS.IN_STOCK,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			budgetFrom: 1000,
			budgetTo: 2000,
			note: "This is a note",
			priority: LEAD_PRIORITY.HIGH,
			country: "United States",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	return (
		<>
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
						<MainButton onClick={() => setIsFormOpen(true)}>
							<PlusIcon /> Add Lead
						</MainButton>
					</>
				}
			/>

			<LeadForm open={isFormOpen} onOpenChange={setIsFormOpen} />
		</>
	);
};
