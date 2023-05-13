import { Message } from '@/components/Message';
import { trpc } from '@/utils/trpc';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { IKContext } from 'imagekitio-react';
import { Session } from 'next-auth';
import { SessionProvider, getSession } from 'next-auth/react';
import type { AppProps, AppType } from 'next/app';

import { APP_URL } from '@/utils/env';
import { QueryClient, QueryClientProvider } from 'react-query';

import AuthLayout from '@/components/Layout/AuthLayout';
import { NextPage } from 'next';
import { ReactNode, type ReactElement } from 'react';

import '@/styles/globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}: AppPropsWithLayout) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60, refetchOnWindowFocus: false },
    },
  });

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <IKContext
          publicKey="public_xTbc2crb6gXYxB5gtKroms4tWCU="
          urlEndpoint="https://ik.imagekit.io/0o9nfg6a3"
          transformationPosition="path"
          authenticationEndpoint={`${APP_URL}/api/image`}
        >
          <MantineProvider withNormalizeCSS withGlobalStyles>
            <ModalsProvider>
              <Notifications />
              <AuthLayout>{getLayout(<Component {...pageProps} />)}</AuthLayout>
            </ModalsProvider>
            <Message />
          </MantineProvider>
        </IKContext>
      </QueryClientProvider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(MyApp);
