import { User } from "@prisma/client";
import { create } from "zustand";
import createSelectors from "./createSelectors";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type State = {
  user: User | null;
  status: AuthStatus;
};

type Action = {
  setUser: (auth: { user: User | null; status: AuthStatus }) => void;
};

const useUserStore = createSelectors(
  create<State & Action>((set) => ({
    user: null,
    status: "loading",
    setUser: async ({ user, status }) => {
      set({ user, status });
    },
  }))
);

export default useUserStore;
