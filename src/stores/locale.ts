import { fetchLocale } from '@/api/locale';
import dayjs from '@/utils/dayjs';
import { create } from 'zustand';

type LocaleStore = {
  locale: string;
  translator: Record<string, string> | null;
  setLocale: (locale: string) => Promise<void>;
};

const useLocaleStore = create<LocaleStore>((set) => ({
  locale: '',
  config: {},
  translator: null,
  setLocale: async (locale) => {
    const data = await fetchLocale(locale);
    if (dayjs.locale() !== locale) dayjs.locale(locale);

    if (data) {
      set(() => ({ locale, translator: data }));
    }
  },
}));

export default useLocaleStore;
