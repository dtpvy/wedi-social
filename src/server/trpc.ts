import { Context } from "./context";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { prisma } from "./prisma";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const middleware = t.middleware;

export const mergeRouters = t.mergeRouters;

const isAuthed = middleware(({ next, ctx }) => {
  const user = ctx.session?.user;

  if (!user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user,
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

export const authProcedure = t.procedure.use(isAuthed);
export const adminAuthProcedure = t.procedure.use(isAdminAuthed);
