"use client";
import { DataTable } from "@/components/common/data-table";
import { ProductColumns } from "./product-columns";
import { PRODUCT_STATUS, TProductDTO } from "../../schema/product.schema";
import { MainButton } from "@/components/common/main-button";
import { PlusIcon } from "lucide-react";
import { useFilterParams } from "@/hooks/use-filter-params";
import { TProductFilters } from "../../types/product.types";
import { ProductFilters } from "../filters/product-filters";
import vercel from "@/app/favicon.ico";
export const ProductDataTable = () => {
	const { updateFiltersParams, clearFilers, searchParams } =
		useFilterParams<TProductFilters>();

	const filters: TProductFilters = {
		visibility: searchParams.get("visibility") === "true",
		name: searchParams.get("name") ?? undefined,
		category: searchParams.get("category") ?? undefined,
		price: searchParams.get("price")
			? parseFloat(searchParams.get("price")!)
			: undefined,
		status: searchParams.get("status") as PRODUCT_STATUS,
	};

	const updateFilters = (filters: TProductFilters) => {
		updateFiltersParams({ filters: filters, options: { resetPage: true } });
	};

	const data: TProductDTO[] = [
		{
			id: 1,
			name: "Apple iPhone 15 Pro Max",
			description: "Apple iPhone 15 Pro Max description",
			price: 1000,
			image: vercel.src,
			category: "Smartphones",
			status: PRODUCT_STATUS.IN_STOCK,
			visibility: true,
			impressions: 100,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			leads: 5,
		},
		{
			id: 2,
			name: "Samsung Galaxy S24 Ultra",
			description: "Samsung Galaxy S24 Ultra description",
			price: 1200,
			image: vercel.src,
			category: "Smartphones",
			status: PRODUCT_STATUS.LOW_STOCK,
			visibility: true,
			impressions: 210,
			leads: 10,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			id: 3,
			name: "Google Pixel 8 Pro",
			description: "Google Pixel 8 Pro description",
			price: 1300,
			image: vercel.src,
			category: "Smartphones",
			status: PRODUCT_STATUS.OUT_OF_STOCK,
			visibility: false,
			impressions: 300,
			leads: 15,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
	];

	return (
		<DataTable
			columns={ProductColumns}
			data={data}
			searchablePlaceholder="Search products"
			setSearchableField={() => {}}
			isLoading={false}
			pageCount={1}
			totalCount={data.length}
			manualPagination={false}
			children={
				<>
					<div className="mr-auto w-fit">
						<ProductFilters
							filters={filters}
							onFilterChange={updateFilters}
							onClearAllFilters={clearFilers}
							searchParams={searchParams}
						/>
					</div>
					<MainButton>
						<PlusIcon /> Add Product
					</MainButton>
				</>
			}
		/>
	);
};
