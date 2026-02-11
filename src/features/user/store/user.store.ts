import { create } from "zustand";
import { TUserDTO } from "../schema/user.schema";

type TUserStore = {
  user: TUserDTO | null;
  setUser: (user: TUserDTO | null) => void;
  clearUser: () => void;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  setStatus: (status: "idle" | "loading" | "authenticated" | "unauthenticated") => void;
};

export const useUserStore = create<TUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  status: "idle",
  setStatus: (status) => set({ status }),
}));
