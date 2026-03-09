import { getServerCookies } from "@/shared/lib/get-server-cookies";
import { buildParams } from "./build-params";

export type TPaginatedApiResponse<T> = {
	data: T[];
	success: boolean;
	message: string;
	meta: {
		total: number;
		page: number;
		pages: number;
		limit: number;
	};
};

export type TApiResponse<T> = {
	data: T;
	success: boolean;
	message: string;
};

type TApiErrorShape = {
	message: string;
	code: number;
	details?: unknown;
};

export class ApiError extends Error {
	message: string;
	details?: unknown;
	code: number;
	constructor(error: TApiErrorShape) {
		super(error.message);
		this.message = error.message;
		this.code = error.code;
		this.details = error.details;
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
		url: `${process.env.NEXT_PUBLIC_API_URL}${endpointURL}`,
		params,
	});
	const response = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers,
			...(cookieHeader ? { Cookie: cookieHeader } : {}),
		},
		body: body ? JSON.stringify(body) : undefined,
		credentials: "include",
		cache,
		next,
		signal,
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({
			message: response.statusText,
			code: response.status,
		}));

		throw new ApiError({
			message: error?.message ?? response.statusText ?? "Something went wrong",
			code: response.status,
		});
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
