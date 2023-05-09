import useTranslator from '@/stores/translator';
import useUserStore from '@/stores/user';
import { APP_URL } from '@/utils/env';
import axios from 'axios';

import { useEffect, useState } from 'react';

const translateUrl = `${APP_URL}/api/translate`;

const useLocale = () => {
  const user = useUserStore((state) => state.user);
  const setTranslator = useTranslator.use.setTranslator();
  const setLocale = useTranslator.use.setLocale();
  const [l, setL] = useState('vi');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setL(localStorage.getItem('selectedlLanguage') || 'vi');
  }, []);

  useEffect(() => {
    axios.get(translateUrl).then((res) => {
      setTranslator(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const code = user?.language?.code || l;
    setLocale(code as 'vi' | 'en');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [l, user?.language?.code]);

  const update = (locale: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('selectedlLanguage', locale);
  };
  return { update };
};

export default useLocale;
