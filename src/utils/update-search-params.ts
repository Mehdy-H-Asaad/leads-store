import { useRouter, useSearchParams } from "next/navigation";

type TUpdateSearchParamsOptions = {
  key: string;
  value: string | null;
  router: ReturnType<typeof useRouter>;
  pathname: string;
  searchParams: ReturnType<typeof useSearchParams>;
};
export const updateSearchParams = ({
  key,
  value,
  router,
  pathname,
  searchParams,
}: TUpdateSearchParamsOptions) => {
  const params = new URLSearchParams(searchParams.toString());

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  router.replace(`${pathname}?${params.toString()}`);
};
