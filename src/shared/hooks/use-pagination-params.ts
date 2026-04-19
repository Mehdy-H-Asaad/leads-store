import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { PaginationState, Updater } from "@tanstack/react-table";
import { DEFAULT_PAGE_SIZE } from "../types/types";

export const INITIAL_PAGINATION = {
	pageIndex: 0,
	pageSize: DEFAULT_PAGE_SIZE,
} as const;

export const getPaginationKey = (pageIndex: number, pageSize: number) =>
	[{ pageIndex, pageSize }] as const;

export const usePaginationParams = ({
	defaultLimit = DEFAULT_PAGE_SIZE,
}: {
	defaultLimit?: number;
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const limit = searchParams.get("limit");
	const page = searchParams.get("page");

	const pagination: PaginationState = {
		pageIndex: Math.max(1, parseInt(page || String(1), 10)) - 1,
		pageSize: Math.max(
			1,
			Math.min(parseInt(limit || defaultLimit.toString()), 100)
		),
	};

	const setPagination = (updater: Updater<PaginationState>) => {
		const newPagination =
			typeof updater === "function" ? updater(pagination) : updater;

		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(newPagination.pageIndex + 1));
		params.set("limit", String(newPagination.pageSize));
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return { pagination, setPagination };
};
