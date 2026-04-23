import { usePathname, useSearchParams, useRouter } from "next/navigation";

type TUpdateFilters<TFilters> = {
	filters: TFilters;
	options: { resetPage?: boolean };
};

export const useFilterParams = <TFilters extends Record<string, unknown>>() => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const updateFiltersParams = ({
		filters,
		options = { resetPage: true },
	}: TUpdateFilters<TFilters>) => {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(filters).forEach(([key, value]) => {
			if (
				value === undefined ||
				value === null ||
				value === "" ||
				value === "all"
			) {
				params.delete(key);
			} else {
				params.set(key, String(value));
			}
		});

		if (options.resetPage) {
			params.set("page", "1");
		}

		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const clearFilers = () => {
		router.push(pathname, { scroll: false });
	};

	return { clearFilers, updateFiltersParams, searchParams };
};
