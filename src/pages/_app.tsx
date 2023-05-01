import { Layout } from '@/components/Layout';
import { Message } from '@/components/Message';
import useLocale from '@/hooks/useLocale';
import '@/styles/globals.css';
import { trpc } from '@/utils/trpc';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { IKContext } from 'imagekitio-react';
import { Session } from 'next-auth';
import { SessionProvider, getSession } from 'next-auth/react';
import type { AppType } from 'next/app';

import '@goongmaps/goong-js/dist/goong-js.css';
import { APP_URL } from '@/utils/env';
import { QueryClient, QueryClientProvider } from 'react-query';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps }) => {
  useLocale();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60, refetchOnWindowFocus: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <IKContext
          publicKey="public_xTbc2crb6gXYxB5gtKroms4tWCU="
          urlEndpoint="https://ik.imagekit.io/0o9nfg6a3"
          transformationPosition="path"
          authenticationEndpoint={`${APP_URL}/api/image`}
        >
          <MantineProvider withNormalizeCSS withGlobalStyles>
            <ModalsProvider>
              <Notifications />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ModalsProvider>
            <Message />
          </MantineProvider>
        </IKContext>
      </SessionProvider>
    </QueryClientProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(MyApp);
