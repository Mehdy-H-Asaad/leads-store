export type TServerResponse<T> = {
  data: T;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
};