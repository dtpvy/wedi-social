import useLocaleStore from '@/stores/locale';
import useAppStore from '@/stores/store';
import { trpc } from '@/utils/trpc';
import type { Language } from '@prisma/client';

const useTranslation = () => {
  const setLocale = useLocaleStore((state) => state.setLocale);
  const locale = useLocaleStore((state) => state.locale);
  const translator = useLocaleStore((state) => state.translator);

  const { data: languages } = trpc.location.languages.useQuery({});
  const updateLanguage = trpc.user.updateLanguage.useMutation();
  const user = useAppStore.use.user();

  const t = (key: string) => {
    if (!translator) return '';
    return translator[key] || '';
  };

  const update = (language: Language) => {
    if (!user && typeof window === 'undefined') return;
    setLocale(language.code);
    if (user) updateLanguage.mutate({ languageId: language.id });
    else {
      localStorage.setItem('selectedlLanguage', language.code);
    }
  };

  return {
    locale,
    t,
    languages,
    update,
  };
};

export default useTranslation;
