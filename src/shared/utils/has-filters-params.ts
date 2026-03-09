export const hasFiltersParams = (
  filters: Record<string, unknown> | undefined
) =>
  filters &&
  Object.values(filters).some((v) => v !== undefined && v !== null && v !== "");
