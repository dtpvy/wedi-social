import { z } from "zod";
import { authedProcedure, router } from "../trpc";
import { prisma } from "../prisma";

export const commentRouter = router({
  create: authedProcedure
    .input(
      z.object({
        content: z.string().optional(),
        imgUrls: z.string().array(),
        postId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      await prisma.comment.create({
        data: {
          ...input,
          userId: id,
        },
      });
      return true;
    }),
  update: authedProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string().optional(),
        imgUrls: z.string().array(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...comment } = input;
      await prisma.comment.update({
        where: { id },
        data: comment,
      });
      return true;
    }),
  delete: authedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      await prisma.comment.delete({ where: { id } });
      return true;
    }),
});
