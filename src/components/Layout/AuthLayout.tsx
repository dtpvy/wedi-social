import { ReactNode } from 'react';

import LocaleProvider from '@/components/Language/LocaleProvider';
import useInitLocale from '@/hooks/useInitLocale';
import useAuth from '@/hooks/useAuth';
import { LoadingOverlay } from '@mantine/core';

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const { locale } = useInitLocale();
  const { status } = useAuth();

  if (status === 'loading') {
    return (
      <div className="w-screen h-screen relative">
        <LoadingOverlay visible />
      </div>
    );
  }

  return <LocaleProvider initLocale={locale}>{children}</LocaleProvider>;
};

export default AuthLayout;
