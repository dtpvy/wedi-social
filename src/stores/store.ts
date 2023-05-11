import { UserInfo } from '@/types/user';
import { create } from 'zustand';
import createSelectors from './createSelectors';
import type { Trip } from '@prisma/client';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type State = {
  profile: {
    user: UserInfo | null;
    isOwner: boolean;
  };
  user: UserInfo | null;
  trip: {
    profile: Trip | null;
    joined: boolean;
  };
};

type Action = {
  setProfile: (profile: UserInfo) => void;
  setUser: (user: UserInfo) => void;
  setTrip: (trip: Trip, joined: boolean) => void;
};

const useAppStore = createSelectors(
  create<State & Action>((set, get) => ({
    profile: {
      user: null,
      isOwner: false,
    },
    user: null,
    trip: {
      profile: null,
      joined: false,
    },
    setProfile: (profile) => {
      set({ profile: { user: profile, isOwner: profile.id === get().user?.id } });
    },
    setUser: (user) => {
      set({ user });
    },
    setTrip: (trip, joined) => {
      set({ trip: { profile: trip, joined } });
    },
  }))
);

export default useAppStore;
