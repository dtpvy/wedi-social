import { z } from "zod";
import { authedProcedure, router } from "../trpc";
import { prisma } from "../prisma";

export const requestRouter = router({
  create: authedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, content } = input;
      const { id } = ctx.user;
      await prisma.request.create({
        data: {
          userId: id,
          title,
          content,
        },
      });
      return true;
    }),
  delete: authedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      await prisma.request.deleteMany({
        where: {
          id,
          userId: ctx.user.id,
        },
      });
      return true;
    }),
  requestList: authedProcedure
    .input(
      z.object({
        type: z.enum(["all", "pending", "replied"]),
      })
    )
    .query(async ({ input, ctx }) => {
      const { type } = input;
      const { id } = ctx.user;

      const request = await prisma.request.findMany({
        where: { userId: id },
        include: {
          reply: {
            include: {
              admin: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      if (type === "all") return request;
      return request.filter((res) =>
        type === "pending" ? !res.reply.length : res.reply.length
      );
    }),
});
