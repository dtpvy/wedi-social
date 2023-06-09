import type { User } from '@prisma/client';
import { create } from 'zustand';
import createSelectors from './createSelectors';

type State = {
  user: User | null;
  opened: boolean;
};

type Action = {
  setOpen: (open: boolean) => void;
  setUser: (user: User) => void;
};

const useMessageStore = createSelectors(
  create<State & Action>((set) => ({
    user: null,
    opened: false,
    setUser: (user) => {
      set({ user });
    },
    setOpen: (open) => {
      set({ opened: open });
    },
  }))
);

export default useMessageStore;
