import { ReactNode } from 'react';

import LocaleProvider from '@/components/Language/LocaleProvider';
import useAuth from '@/hooks/useAuth';
import useInitLocale from '@/hooks/useInitLocale';
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import { AdminLayout } from '.';

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const { locale } = useInitLocale();
  const { status } = useAuth();

  const isAdminPage = router.asPath.split('/')[1] === 'admin';

  if (status === 'loading') {
    return (
      <div className="w-screen h-screen relative">
        <LoadingOverlay visible />
      </div>
    );
  }

  if (
    router.asPath === '/' ||
    router.asPath.startsWith('/signin') ||
    router.asPath.startsWith('/signup')
  ) {
    router.push('/feed');
    return <></>;
  }

  if (isAdminPage) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <LocaleProvider initLocale={locale}>{children}</LocaleProvider>;
};

export default AuthLayout;
