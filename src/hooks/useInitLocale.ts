import useAuthStore from '@/stores/auth';

import { useEffect, useState } from 'react';

const useInitLocale = () => {
  const [locale, setLocale] = useState('vi');

  const user = useAuthStore.use.user();
  const status = useAuthStore.use.status();
  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    const localeLocal =
      (typeof window !== 'undefined' && localStorage.getItem('selectedlLanguage')) || 'vi';

    const userLocale = user ? user.language?.code : '';
    const lang = userLocale || localeLocal;
    if (localeLocal !== userLocale && userLocale) {
      typeof window !== 'undefined' && localStorage.setItem('selectedlLanguage', userLocale);
    }

    setLocale(lang);
  }, [status, user]);

  return { locale };
};

export default useInitLocale;
