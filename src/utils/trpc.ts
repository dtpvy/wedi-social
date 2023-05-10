import type { AppRouter } from '@/server/routers/_app';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { createWSClient, wsLink } from '@trpc/client/links/wsLink';
import { createTRPCNext } from '@trpc/next';
import type { inferProcedureOutput } from '@trpc/server';
import { NextPageContext } from 'next';
import superjson from 'superjson';

function getEndingLink(ctx: NextPageContext | undefined) {
  const APP_URL = process.env.APP_URL || 'http://localhost:3000';

  const WS_URL = process.env.WS_URL || 'ws://localhost:3001';

  if (typeof window === 'undefined') {
    return httpBatchLink({
      url: `${APP_URL}/api/trpc`,
      headers() {
        if (!ctx?.req?.headers) {
          return {};
        }
        const { connection: _connection, ...headers } = ctx.req.headers;
        return headers;
      },
    });
  }
  const client = createWSClient({
    url: WS_URL,
  });
  return wsLink<AppRouter>({
    client,
  });
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        getEndingLink(ctx),
      ],
      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
          queries: { staleTime: 60, refetchOnWindowFocus: false },
        },
      },
    };
  },
  ssr: true,
});

type inferQueryOutput<TRouteKey extends keyof AppRouter['_def']['queries']> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>;
