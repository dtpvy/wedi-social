import useTranslator from '@/stores/translator';

const useTranslation = () => {
  const locale = useTranslator((state) => state.locale);
  const translator = useTranslator((state) => state.translator);

  const t = (key: string) => {
    return translator?.[locale][key];
  };

  return { locale, t };
};

export default useTranslation;
