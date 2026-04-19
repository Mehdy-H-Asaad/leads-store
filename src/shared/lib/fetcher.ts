import { getServerCookies } from "@/shared/lib/get-server-cookies";
import { buildParams } from "./build-params";

export type TPaginatedApiResponse<T> = {
	data: T[];
	limit: number;
	page: number;
	total_pages: number;
	total_rows: number;
};

export type TApiResponse<T> = {
	data: T;
	success: boolean;
	message: string;
};

type TApiErrorShape = {
	message: string;
	code: number;
	detail?: unknown;
};

export class ApiError extends Error {
	message: string;
	detail?: unknown;
	code: number;
	constructor(error: TApiErrorShape) {
		super(error.message);
		this.message = error.message;
		this.code = error.code;
		this.detail = error.detail;
	}
}

export type TRequestOptions = {
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	headers?: Record<string, string>;
	body?: unknown;
	cookie?: string;
	params?: Record<string, string | number | boolean | undefined | null>;
	cache?: RequestCache;
	next?: NextFetchRequestConfig;
	signal?: AbortSignal;
};

type TFetcherOptions = {
	endpointURL: string;
	options?: TRequestOptions;
};

const fetcher = async <T>({
	endpointURL,
	options = {},
}: TFetcherOptions): Promise<T> => {
	const {
		body,
		method = "GET",
		headers,
		params,
		cache,
		next,
		cookie,
		signal,
	} = options;

	let cookieHeader = "";
	if (typeof window === "undefined" && !cookie) {
		cookieHeader = await getServerCookies();
	}

	const url = buildParams({
		url:
			typeof window === "undefined"
				? `${process.env.API_URL}${endpointURL}`
				: `${process.env.NEXT_PUBLIC_API_URL}${endpointURL}`,
		params,
	});
	const response = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers,
			...(cookieHeader
				? {
						Cookie: cookieHeader,
				  }
				: {}),
		},
		body: body ? JSON.stringify(body) : undefined,
		credentials: "include",
		cache,
		next,
		signal,
	});

	if (!response.ok) {
		// if (response.status === 401 && typeof window !== "undefined") {
		// 	window.location.href = "/login";
		// }

		const error = await response.json().catch(() => ({
			message: response.statusText,
			code: response.status,
		}));

		throw new ApiError({
			message: error?.message ?? response.statusText ?? "Something went wrong",
			code: response.status,
			detail: error?.detail,
		});
	}

	if (
		response.status === 204 ||
		response.headers.get("content-length") === "0"
	) {
		return undefined as T;
	}

	return response.json();
};

export const apiFetcher = {
	get: <T>(url: string, options: TRequestOptions = {}) => {
		return fetcher<T>({ endpointURL: url, options });
	},
	post: <T>(url: string, data?: unknown, options: TRequestOptions = {}) => {
		return fetcher<T>({
			endpointURL: url,
			options: { ...options, body: data, method: "POST" },
		});
	},
	put: <T>(url: string, data?: unknown, options: TRequestOptions = {}) => {
		return fetcher<T>({
			endpointURL: url,
			options: { ...options, body: data, method: "PUT" },
		});
	},
	delete: <T>(url: string, options: TRequestOptions = {}) => {
		return fetcher<T>({
			endpointURL: url,
			options: { ...options, method: "DELETE" },
		});
	},
	patch: <T>(url: string, data?: unknown, options: TRequestOptions = {}) => {
		return fetcher<T>({
			endpointURL: url,
			options: { ...options, body: data, method: "PATCH" },
		});
	},
};
