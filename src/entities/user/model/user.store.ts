import { create } from "zustand";
import { TUser } from "./user.model";

type TUserStore = {
	user: TUser | null;
	setUser: (user: TUser | null) => void;
	clearUser: () => void;
	status: "idle" | "loading" | "authenticated" | "unauthenticated";
	setStatus: (
		status: "idle" | "loading" | "authenticated" | "unauthenticated"
	) => void;
};

export const useUserStore = create<TUserStore>(set => ({
	user: null,
	setUser: user => set({ user }),
	clearUser: () => set({ user: null }),
	status: "idle",
	setStatus: status => set({ status }),
}));
