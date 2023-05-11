import { create } from 'zustand';
import createSelectors from './createSelectors';

export type Type = 'trip' | 'post' | 'location';

export type SearchState = {
  search: string;
  type: 'trip' | 'post' | 'location';
  field: 'createdAt' | 'name';
  sort: 'asc' | 'desc';
  privacy: 'all' | 'friend' | 'public';
  startDate: Date | null;
  endDate: Date | null;
};

type Action = {
  setFilter: (state: Partial<SearchState>) => void;
  reset: () => void;
};

const initState: SearchState = {
  search: '',
  type: 'post',
  field: 'createdAt',
  sort: 'asc',
  privacy: 'all',
  startDate: null,
  endDate: null,
};

const useSearchStore = createSelectors(
  create<SearchState & Action>((set) => ({
    ...initState,
    setFilter: (filter) => {
      set({ ...filter });
    },
    reset: () => {
      set(initState);
    },
  }))
);

export default useSearchStore;
