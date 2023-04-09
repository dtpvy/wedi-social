import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import type { AppType } from "next/app";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <ModalsProvider>
          <Notifications />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(MyApp);
