"use client";

import { useApiQuery } from "@/hooks/use-api-query";
import { TUserDTO } from "../schema/user.schema";
import { useUserStore } from "../store/user.store";
import { useEffect } from "react";
import { AUTH_KEYS } from "@/features/auth/constants/auth.keys";

export const useGetMe = ({ enabled }: { enabled: boolean }) => {
  const { setUser, clearUser, setStatus } = useUserStore();

  const { data, isLoading, isError, error } = useApiQuery<TUserDTO>({
    queryKey: [AUTH_KEYS.USER],
    requestURL: "/auth/me",
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 min
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled,
  });

  // Sync React Query data to Zustand store
  useEffect(() => {
    if (isLoading) {
      setStatus("loading");
    } else if (data) {
      setUser(data.data);
      setStatus("authenticated");
    } else if (isError) {
      clearUser();
      setStatus("unauthenticated");
    }
  }, [data, isLoading, isError, setUser, clearUser, setStatus]);

  return {
    user: data?.data,
    isGettingCurrentUser: isLoading,
    isError,
    error,
  };
};
