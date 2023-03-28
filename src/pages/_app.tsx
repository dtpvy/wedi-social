import { Layout } from "@/components/Layout";
import { AppRouter } from "@/server/routers/_app";
import "@/styles/globals.css";
import { withTRPC } from "@trpc/next";
import { Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import type { AppProps, AppType } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

// export default withTRPC<AppRouter>({
//   config({ ctx }) {
//     const url = process.env.APP_URL
//       ? `https://${process.env.APP_URL}/api/trpc`
//       : "http://localhost:3000/api/trpc";

//     return {
//       url,
//       meta:
//     };
//   },
//   ssr: true,
// })(App);
