import LocaleProvider from '@/components/Language/LocaleProvider';
import useAuth from '@/hooks/useAuth';
import useInitLocale from '@/hooks/useInitLocale';
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import { AdminLayout } from '.';

const AuthLayout = ({ children }: ComponentWithChildren) => {
  const router = useRouter();
  const { locale } = useInitLocale();
  const { status, data } = useAuth();

  const isAdminPage = router.asPath.split('/')[1] === 'admin';

  if (status === 'loading') {
    return (
      <div className="w-screen h-screen relative">
        <LoadingOverlay visible />
      </div>
    );
  }

  const hasUser = status === 'authenticated' && data.user && !data.user.isAdmin;

  console.log({ hasUser });

  if (
    hasUser &&
    (router.asPath === '/' ||
      router.asPath.startsWith('/signin') ||
      router.asPath.startsWith('/signup'))
  ) {
    router.push('/feed');
    return <></>;
  }

  if (isAdminPage && data?.user.isAdmin) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <LocaleProvider initLocale={locale}>{children}</LocaleProvider>;
};

export default AuthLayout;
