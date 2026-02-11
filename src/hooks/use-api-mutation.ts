import { toast } from "sonner";
import {
  MutationKey,
  QueryKey,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { apiFetcher, ApiError } from "@/utils/fetcher";
import { TServerResponse } from "@/types/types";

type THTTPRequestMethod = "post" | "put" | "delete" | "patch";

// type TApiError = {
//   success: false;
//   error: {
//     message: string;
//     statusCode: number;
//     timestamp: string;
//     path: string;
//     method: string;
//     details: {
//       message: string;
//       field: string;
//     }[];
//   };
// };

type TNormalizedError = {
  message: string;
};

type TUseApiMutation<TData, TVariables, TContext = unknown> = {
  mutationKey?: MutationKey;

  endpointURL: string;

  invalidatedKeys: QueryKey[];
  invalidateExact: boolean;

  showSuccessToast?: boolean;
  successMsg: string;
  method: THTTPRequestMethod;
  isDashboardHeader?: boolean;
} & Omit<
  UseMutationOptions<
    TServerResponse<TData>,
    TNormalizedError,
    TVariables,
    TContext
  >,
  "mutationFn" | "mutationKey"
>;

export const useApiMutation = <TData, TVariables, TContext = unknown>({
  mutationKey,
  endpointURL,
  successMsg,
  method,
  showSuccessToast = true,
  isDashboardHeader = true,
  invalidatedKeys,
  invalidateExact,
  ...mutationOptions
}: TUseApiMutation<TData, TVariables, TContext>) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TServerResponse<TData>,
    TNormalizedError,
    TVariables,
    TContext
  >({
    mutationKey,
    mutationFn: async (values: TVariables) => {
      try {
        if (method === "delete") {
          return await apiFetcher[method]<TData>(endpointURL);
        } else {
          return await apiFetcher[method]<TData>(endpointURL, values);
        }
      } catch (error) {
        if (error instanceof ApiError) {
          throw { message: error.message } as TNormalizedError;
        }
        throw { message: "An unexpected error occurred" } as TNormalizedError;
      }
    },
    ...mutationOptions,
    onSuccess: (data, variables, context, mutation) => {
      for (const key of invalidatedKeys) {
        queryClient.invalidateQueries({
          queryKey: key,
          exact: invalidateExact,
        });
      }
      if (showSuccessToast) toast.success(successMsg);
      mutationOptions?.onSuccess?.(data, variables, context, mutation);
    },
    onError: (error, variables, context, mutation) => {
      toast.error(error.message);
      mutationOptions?.onError?.(error, variables, context, mutation);
    },
  });

  return { ...mutation };
};
