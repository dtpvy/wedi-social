import { UserInfo } from '@/types/user';
import { create } from 'zustand';
import createSelectors from './createSelectors';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type State = {
  user: UserInfo | null;
  status: AuthStatus;
};

type Action = {
  setUser: (auth: { user: UserInfo | null; status: AuthStatus }) => void;
};

const useUserStore = createSelectors(
  create<State & Action>((set) => ({
    user: null,
    status: 'loading',
    setUser: ({ user, status }) => {
      set({ user, status });
    },
  }))
);

export default useUserStore;
