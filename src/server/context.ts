import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/utils/nextAuthOptions";

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;
  const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

  return {
    req,
    res,
    session,
    prisma,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
