import "@/styles/globals.css";
import { Layout } from "@/components/Layout";
import type { Session } from "next-auth";
import { getSession, SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { trpc } from "@/utils/trpc";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

App.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(App);
