type TBuildParamsOptions = {
  url: string;
  params?: Record<string, string | number | boolean | undefined | null>;
};

export const buildParams = ({ url, params }: TBuildParamsOptions) => {
  if (!params) return url;

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== null
    )
  );

  if (Object.keys(filteredParams).length === 0) return url;

  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>
  ).toString();

  return `${url}?${queryString}`;
};
