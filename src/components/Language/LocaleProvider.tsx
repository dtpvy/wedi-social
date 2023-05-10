import useLocaleStore from '@/stores/locale';
import { Loader, LoadingOverlay } from '@mantine/core';
import { ReactNode, useEffect, useRef } from 'react';

type LocaleContext = {
  initLocale: string;
  children: ReactNode;
};

const LocaleProvider = ({ initLocale, children }: LocaleContext) => {
  const initedLocale = useRef(false);
  const setLocale = useLocaleStore((state) => state.setLocale);
  const locale = useLocaleStore((state) => state.locale);
  const translator = useLocaleStore((state) => state.translator);

  useEffect(() => {
    if (initedLocale.current) {
      return;
    }

    setLocale(initLocale);
    initedLocale.current = true;
  }, [initLocale, setLocale]);

  if (!translator || !locale) {
    return (
      <div className="w-screen h-screen relative">
        <LoadingOverlay visible />
      </div>
    );
  }

  return <>{children}</>;
};

export default LocaleProvider;
