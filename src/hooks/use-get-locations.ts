import { TLocationDTO } from "@/types/location.types";
import { useApiQuery } from "./use-api-query";

export const useGetLocations = ({ search }: { search?: string }) => {
  const { data, isLoading, error } = useApiQuery<TLocationDTO[]>({
    queryKey: ["locations", search],
    requestURL: `/locations/cities?search=${search}`,
  });

  return { locations: data?.data ?? [], isGettingLocations: isLoading, error };
};
