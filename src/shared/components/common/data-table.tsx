"use client";
import { Button } from "@/shared/components/ui/button";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	SortingState,
	getSortedRowModel,
	VisibilityState,
	ColumnFiltersState,
	getFilteredRowModel,
	useReactTable,
	PaginationState,
} from "@tanstack/react-table";
import { Input } from "@/shared/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/components/ui/table";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { usePaginationParams } from "@/shared/hooks/use-pagination-params";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Search, ChevronLeft, ChevronRight, FileX } from "lucide-react";
import { DEFAULT_PAGE_SIZE } from "@/shared/types/types";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination?: PaginationState;
	isLoading?: boolean;
	pageCount?: number;
	totalCount?: number;
	searchablePlaceholder: string;
	children?: React.ReactNode;
	manualPagination?: boolean;
	setSearchableField: (filter: string) => void;
	searchValue: string;
	filters?: React.ReactNode;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pageCount,
	isLoading,
	totalCount,
	searchablePlaceholder,
	children,
	manualPagination = true,
	setSearchableField,
	searchValue,
	filters,
}: DataTableProps<TData, TValue>) {
	const [inputValue, setInputValue] = useState(searchValue ?? "");
	const [sorting, setSorting] = useState<SortingState>([]);

	useEffect(() => {
		if (!searchValue) {
			setInputValue("");
		}
	}, [searchValue]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const { pagination, setPagination } = usePaginationParams({
		defaultLimit: DEFAULT_PAGE_SIZE,
	});

	// DEBOUNCED SEARCH FUNCTION
	const debouncedSearch = useDebounce({
		callback: setSearchableField,
		delay: 300,
	});

	const table = useReactTable({
		data,
		columns,
		...(manualPagination && {
			pageCount,
			manualPagination: true,
			onPaginationChange: updater => {
				setPagination(
					typeof updater === "function" ? updater(pagination) : updater
				);
			},
		}),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			...(manualPagination && { pagination }),
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		onRowSelectionChange: setRowSelection,
	});

	return (
		<div className="w-full space-y-6">
			{/* Header Section */}
			<div className="flex items-center justify-between gap-6 flex-wrap">
				<div className="relative flex-1 max-w-xs min-w-[200px]">
					<Search className="absolute z-10 left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors duration-200" />
					<Input
						placeholder={searchablePlaceholder}
						value={inputValue}
						onChange={e => {
							setInputValue(e.target.value);
							debouncedSearch(e.target.value);
						}}
						className="pl-10 h-10 bg-background border-border/60 shadow-sm focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all duration-200 hover:border-border"
					/>
				</div>
				{children}
			</div>

			{/* Filters Section */}
			{filters && <div className="w-full">{filters}</div>}

			{/* Table Section */}
			{isLoading ? (
				<div className="rounded-2xl border border-border/40 bg-card shadow-sm overflow-hidden">
					<div className="p-6 space-y-3">
						<Skeleton className="h-14 w-full rounded-xl" />
						<Skeleton className="h-20 w-full rounded-xl" />
						<Skeleton className="h-20 w-full rounded-xl" />
						<Skeleton className="h-20 w-full rounded-xl" />
						<Skeleton className="h-20 w-full rounded-xl" />
					</div>
				</div>
			) : (
				<div className="rounded-2xl border border-border/40 bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
					<div className="overflow-x-auto">
						<Table className="overflow-hidden">
							<TableHeader className="bg-secondary sticky top-0 z-10 backdrop-blur-sm">
								{table.getHeaderGroups().map(headerGroup => (
									<TableRow
										className="border-b border-border/40 hover:bg-transparent"
										key={headerGroup.id}
									>
										{headerGroup.headers.map(header => (
											<TableHead
												className="rtl:text-right font-semibold text-foreground/80 py-3 px-5 uppercase text-xs tracking-wider"
												key={header.id}
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody className="">
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row, index) => (
										<TableRow
											className="border-b  border-border/20 hover:bg-muted/40 transition-all duration-200 group cursor-pointer"
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
											style={{
												animationDelay: `${index * 0.03}s`,
												animation: "fadeIn 0.4s ease-out forwards",
												opacity: 0,
											}}
										>
											{row.getVisibleCells().map(cell => (
												<TableCell
													className="py-5 px-6 text-sm group-hover:text-foreground transition-colors duration-200"
													key={cell.id}
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow className="hover:bg-transparent">
										<TableCell
											colSpan={columns.length}
											className="h-80 text-center"
										>
											<div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
												<div className="rounded-full bg-muted/50 p-4">
													<FileX className="h-8 w-8 opacity-50" />
												</div>
												<div className="space-y-1">
													<p className="text-base font-semibold text-foreground/80">
														No results found
													</p>
													<p className="text-sm text-muted-foreground/80">
														Try adjusting your search criteria or filters
													</p>
												</div>
											</div>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			)}

			{/* Pagination Section */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
				<div className="text-sm text-muted-foreground/80">
					Showing{" "}
					<span className="font-semibold text-foreground">
						{table.getRowModel().rows.length}
					</span>{" "}
					of{" "}
					<span className="font-semibold text-foreground">
						{/* {table.getFilteredRowModel().rows.length} */}
						{totalCount ?? 0}
					</span>{" "}
					results
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="h-9 px-4 gap-2 bg-background border-border/60 hover:bg-accent hover:border-primary/60 hover:text-foreground transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="hidden sm:inline">Previous</span>
					</Button>

					<div className="flex items-center gap-2 px-2">
						<div className="flex h-9 min-w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 px-3 text-sm font-semibold text-primary shadow-sm">
							{pagination.pageIndex + 1}
						</div>
						<span className="text-sm text-muted-foreground/70 px-1">of</span>
						<div className="flex h-9 min-w-10 items-center justify-center rounded-lg border border-border/40 bg-muted/30 px-3 text-sm font-medium text-foreground/70">
							{pageCount || 1}
						</div>
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="h-9 px-4 gap-2 bg-background border-border/60 hover:bg-accent hover:border-primary/60 hover:text-foreground transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
					>
						<span className="hidden sm:inline">Next</span>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
