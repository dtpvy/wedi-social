/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */

import { Context } from "./context";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { prisma } from "./prisma";

const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/v10/data-transformers
   */
  transformer: superjson,
  /**
   * @see https://trpc.io/docs/v10/error-formatting
   */
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
export const router = t.router;

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure;

/**
 * @see https://trpc.io/docs/v10/middlewares
 */
export const middleware = t.middleware;

/**
 * @see https://trpc.io/docs/v10/merging-routers
 */
export const mergeRouters = t.mergeRouters;

const isAuthed = middleware(({ next, ctx }) => {
  const user = ctx.session?.user;

  if (!user?.name) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user: {
        ...user,
        name: user.name,
      },
    },
  });
});

const isAdminAuthed = middleware(async ({ next, ctx }) => {
  const user = ctx.session?.user;
  console.log(user);
  if (!user?.name && !user?.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const admin = await prisma.admin.findFirst({
    where: { email: user.email },
  });

  if (admin?.isDeleted) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }

  return next({
    ctx: {
      user: {
        ...user,
        name: user.name,
      },
    },
  });
});

/**
 * Protected base procedure
 */
export const authedProcedure = t.procedure.use(isAuthed);
export const adminAuthedProcedure = t.procedure.use(isAdminAuthed);