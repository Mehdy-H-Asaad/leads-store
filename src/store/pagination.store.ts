import { PaginationState } from "@tanstack/react-table";
import { create } from "zustand";

export type TUsePaginationStore = {
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
};

export const usePaginationStore = create<TUsePaginationStore>((set) => ({
  pagination: { pageIndex: 0, pageSize: 5 },
  setPagination: (pagination) => set({ pagination }),
}));
