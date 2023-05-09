import useTranslator from '@/stores/translator';
import { trpc } from '@/utils/trpc';

const useTranslation = () => {
  const locale = useTranslator((state) => state.locale);
  const translator = useTranslator((state) => state.translator);
  const { data: languages } = trpc.location.languages.useQuery({});
  const updateLanguage = trpc.user.updateLanguage.useMutation();

  const t = (key: string) => {
    return translator?.[locale][key];
  };

  return {
    locale,
    t,
    languages,
    updateLanguage,
  };
};

export default useTranslation;
