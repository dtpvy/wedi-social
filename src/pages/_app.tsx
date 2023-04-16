import { Layout } from "@/components/Layout";
import { Message } from "@/components/Message";
import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { IKContext } from "imagekitio-react";
import { Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import type { AppType } from "next/app";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <SessionProvider session={pageProps.session}>
      <IKContext
        publicKey="public_xTbc2crb6gXYxB5gtKroms4tWCU="
        urlEndpoint="https://ik.imagekit.io/0o9nfg6a3"
        transformationPosition="path"
        authenticationEndpoint="http://www.yourserver.com/auth"
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
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(MyApp);
